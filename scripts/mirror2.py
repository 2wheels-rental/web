#!/usr/bin/env python3
import os, re, json, time, csv, urllib.request, ssl

OUT = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/source-wordpress"
HOST = "2wheelsrental.com"
BASE = "https://2wheelsrental.com"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE

IMG_EXT = (".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif")
VID_EXT = (".mp4", ".webm", ".mov", ".m4v", ".ogv")
VIDEO_HOSTS = ("youtube.com", "youtu.be", "vimeo.com", "player.vimeo", "wistia", "dailymotion")

def fetch(url, binary=False, tries=2):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Encoding": "identity"})
            with urllib.request.urlopen(req, timeout=40, context=ctx) as r:
                d = r.read(); return d if binary else d.decode("utf-8", "replace")
        except Exception as e:
            if i == tries - 1: return e
            time.sleep(0.5)

def url_to_path(url):
    p = url.split("://", 1)[-1]
    return p.split("/", 1)[1] if "/" in p else ""

# ---- 1. HTML (reutiliza lo ya bajado, completa lo que falte) ----
with open(os.path.join(OUT, "urls.txt")) as f:
    urls = [l.strip() for l in f if l.strip()]
html_cache = {}; ok = fail = dl = 0
for u in urls:
    rel = url_to_path(u)
    rel = (rel + "index.html") if (rel == "" or rel.endswith("/")) else (rel + ".html")
    dst = os.path.join(OUT, "html", rel)
    if os.path.exists(dst) and os.path.getsize(dst) > 2000:
        html_cache[u] = open(dst, encoding="utf-8", errors="replace").read(); ok += 1; continue
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    res = fetch(u)
    if isinstance(res, Exception) or len(res) < 2000:
        fail += 1; print("  HTML FAIL", u)
    else:
        open(dst, "w", encoding="utf-8").write(res); html_cache[u] = res; ok += 1; dl += 1
        time.sleep(0.12)
print(f"[HTML] total={ok} (nuevos={dl}) fail={fail}")

# ---- 2. META MAP ----
def meta(h, name=None, prop=None):
    key = ("name", name) if name else ("property", prop)
    m = re.search(r'<meta[^>]+%s=["\']%s["\'][^>]*content=["\']([^"\']*)' % (key[0], re.escape(key[1])), h, re.I) or \
        re.search(r'<meta[^>]+content=["\']([^"\']*)["\'][^>]*%s=["\']%s["\']' % (key[0], re.escape(key[1])), h, re.I)
    return m.group(1).strip() if m else ""

meta_map = {}
for u, h in html_cache.items():
    t = re.search(r"<title>(.*?)</title>", h, re.I | re.S)
    can = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*href=["\']([^"\']+)', h, re.I)
    alts = re.findall(r'<link[^>]+rel=["\']alternate["\'][^>]+hreflang=["\']([^"\']+)["\'][^>]+href=["\']([^"\']+)', h, re.I)
    meta_map[u] = {"title": (t.group(1).strip() if t else ""), "description": meta(h, name="description"),
        "robots": meta(h, name="robots"), "canonical": (can.group(1) if can else ""),
        "og:title": meta(h, prop="og:title"), "og:description": meta(h, prop="og:description"),
        "og:image": meta(h, prop="og:image"), "og:type": meta(h, prop="og:type"),
        "og:locale": meta(h, prop="og:locale"), "twitter:card": meta(h, name="twitter:card"),
        "hreflang": {l: href for l, href in alts}}
os.makedirs(os.path.join(OUT, "meta"), exist_ok=True)
json.dump(meta_map, open(os.path.join(OUT, "meta", "meta_map.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
with open(os.path.join(OUT, "meta", "meta_map.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f); w.writerow(["url", "title", "description", "robots", "canonical", "og:image", "hreflang"])
    for u, m in meta_map.items():
        w.writerow([u, m["title"], m["description"], m["robots"], m["canonical"], m["og:image"], "|".join(m["hreflang"])])
print(f"[META] {len(meta_map)} paginas")

# ---- 3. MEDIOS REFERENCIADOS (solo lo usado en las paginas) ----
allhtml = "\n".join(html_cache.values())
# URLs absolutas a uploads
refs = set(re.findall(r'https://%s/wp-content/uploads/[^\s"\'\)\\<>]+' % re.escape(HOST), allhtml))
# URLs protocolo-relativas y relativas a uploads
for m in re.findall(r'(?:"|\'|\()(//%s/wp-content/uploads/[^\s"\'\)\\<>]+)' % re.escape(HOST), allhtml):
    refs.add("https:" + m)
for m in re.findall(r'(?:"|\'|\()(/wp-content/uploads/[^\s"\'\)\\<>]+)', allhtml):
    refs.add(BASE + m)

def clean(u):
    return u.split("?")[0].split("#")[0].replace("&#038;", "&")

images, videos, otros = set(), set(), set()
for u in map(clean, refs):
    lu = u.lower()
    if lu.endswith(IMG_EXT): images.add(u)
    elif lu.endswith(VID_EXT): videos.add(u)
    else: otros.add(u)

# videos externos (embeds) -> no se descargan, se anotan
ext_video = set()
for m in re.findall(r'https?://[^\s"\'<>]+', allhtml):
    if any(vh in m for vh in VIDEO_HOSTS): ext_video.add(clean(m))

print(f"[MEDIOS] imagenes usadas={len(images)}  videos propios={len(videos)}  otros_uploads={len(otros)}  video_embeds_externos={len(ext_video)}")

def download_set(urls_set, subdir):
    o = ff = 0
    for u in sorted(urls_set):
        rel = url_to_path(u)
        dst = os.path.join(OUT, subdir, rel)
        if os.path.exists(dst): o += 1; continue
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        res = fetch(u, binary=True)
        if isinstance(res, Exception) or not res:
            ff += 1
            if ff <= 8: print("   FAIL", u)
        else:
            open(dst, "wb").write(res); o += 1
        time.sleep(0.04)
    return o, ff

io, iff = download_set(images, "images")
vo, vff = download_set(videos, "media") if videos else (0, 0)
oo, off = download_set(otros, "images") if otros else (0, 0)
with open(os.path.join(OUT, "meta", "_video_embeds_externos.txt"), "w") as f:
    f.write("\n".join(sorted(ext_video)))
print(f"[IMG] ok={io} fail={iff} | [VIDEO] ok={vo} fail={vff} | [OTROS] ok={oo} fail={off}")

# ---- 4. CSS/JS del sitio ----
assets = set()
for h in html_cache.values():
    assets |= set(re.findall(r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)', h, re.I))
    assets |= set(re.findall(r'<script[^>]+src=["\']([^"\']+\.js[^"\']*)', h, re.I))
def norm(u):
    if u.startswith("//"): return "https:" + u
    if u.startswith("/"): return BASE + u
    return u
ao = af = 0; externals = set()
for raw in sorted(assets):
    u = clean(norm(raw))
    if HOST not in u: externals.add(u); continue
    rel = url_to_path(u); dst = os.path.join(OUT, "assets", rel)
    if os.path.exists(dst): ao += 1; continue
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    res = fetch(u, binary=True)
    if isinstance(res, Exception) or not res: af += 1
    else: open(dst, "wb").write(res); ao += 1
    time.sleep(0.03)
open(os.path.join(OUT, "assets", "_externals.txt"), "w").write("\n".join(sorted(externals)))
print(f"[ASSETS] ok={ao} fail={af} | externos={len(externals)}")
print("DONE")
