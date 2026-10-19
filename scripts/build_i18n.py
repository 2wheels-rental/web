#!/usr/bin/env python3
import os, re, json, html, glob

SRC = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/source-wordpress"
LIB = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/lib"
meta = json.load(open(os.path.join(SRC, "meta/meta_map.json")))
HOST = "https://2wheelsrental.com"

def clean(t):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", t))).strip()

def toks(h):
    h = re.sub(r"<(script|style|noscript|svg)[^>]*>.*?</\1>", "", h, flags=re.S | re.I)
    out = []
    for m in re.finditer(r"<(h[1-4]|p|li)[^>]*>(.*?)</\1>", h, re.S | re.I):
        t = clean(m.group(2))
        if t:
            out.append((m.group(1).lower(), t))
    return out

def gallery(h):
    imgs = []
    for m in re.findall(r"wp-content/uploads/\d{4}/\d{2}/[^\"' )]+\.(?:webp|jpg|jpeg|png)", h):
        base = re.sub(r"-\d+x\d+(\.\w+)$", r"\1", m)
        low = base.lower()
        if any(x in low for x in ("logo", "cropped", "icon", "-18x12", "captura", "weride")):
            continue
        if base not in imgs:
            imgs.append(base)
    return imgs

def url_path(u):
    return u.replace(HOST, "").rstrip("/") or "/"

# ---------- META helper por URL ----------
def m_for(url):
    return meta.get(url) or meta.get(url.rstrip("/") + "/") or {}

# ---------- TOURS por locale ----------
def parse_tour(path_html, url):
    h = open(path_html, encoding="utf-8", errors="replace").read()
    mm = m_for(url)
    tkall = toks(h)
    # anclar después del primer h1 (saltar nav/header)
    h1i = next((i for i, (tag, _t) in enumerate(tkall) if tag == "h1"), 0)
    title = tkall[h1i][1] if tkall and tkall[h1i][0] == "h1" else ""
    tk = tkall[h1i + 1:]
    # specs: primeras 6 parejas (h3 corto -> p) antes del primer h2
    specs = {}
    for i, (tag, t) in enumerate(tk):
        if tag == "h2":
            break
        if tag == "h3" and len(t) < 22 and i + 1 < len(tk) and tk[i + 1][0] == "p" and len(tk[i + 1][1]) < 40:
            specs[t] = tk[i + 1][1]
        if len(specs) >= 6:
            break
    intro = []
    for tag, t in tk:
        if tag == "h2":
            break
        if tag == "p" and len(t) > 60:
            intro.append(t)
    highlights, grab = [], False
    HL = ("highlights", "punti salienti", "highlights", "das erwartet dich", "höhepunkte", "punti forti")
    for tag, t in tk:
        if tag == "h2":
            grab = t.strip().lower() in HL
            continue
        if grab and tag == "li" and 3 < len(t) < 160:
            highlights.append(t)
    mwt = re.search(r"https://[a-z0-9.]*wetravel\.com/trips/[^\"' )]+", h)
    return {
        "slug": url_path(url).split("/tour/")[-1],
        "title": title,
        "subtitle": clean(mm.get("description", "")),
        "specs": specs,
        "intro": intro[:4],
        "highlights": highlights[:8],
        "hero": mm.get("og:image", ""),
        "gallery": gallery(h)[:12],
        "booking": mwt.group(0) if mwt else "",
    }

en_tours = json.load(open(os.path.join(LIB, "tours.json")))
for loc, pref in (("it", "/it"), ("de", "/de")):
    out = []
    for t in en_tours:
        en_url = f"{HOST}/tour/{t['slug']}/"
        hl = m_for(en_url).get("hreflang", {})
        locurl = hl.get({"it": "it-IT", "de": "de-DE"}[loc], "")
        if not locurl:
            continue
        slug = url_path(locurl).split("/tour/")[-1]
        p = os.path.join(SRC, "html", pref.strip("/"), "tour", slug, "index.html")
        if not os.path.exists(p):
            print("  falta tour", loc, p); continue
        d = parse_tour(p, locurl)
        d["en_slug"] = t["slug"]
        out.append(d)
    json.dump(out, open(os.path.join(LIB, f"tours.{loc}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"tours.{loc}.json: {len(out)} tours")

# ---------- PAGES por locale ----------
PAGE_KEYS = ["about-us", "bikes-e-bikes", "motorbikes-scooters", "2wheels-season-pass",
             "for-companies", "hotel-programs", "payment-cancellation-refund-policy", "cookie-policy-eu"]
JUNK = ("skip to content", "{vendor", "{title", "manage service", "manage option", "manage {",
        "read more about these purposes", "all rights reserved", "lorem ipsum", "whatsapp us",
        "we use cookies", "cookie", "consent", "accetto", "informativa sui cookie", "zustimm")

def parse_page(path_html, url, policy=False):
    h = open(path_html, encoding="utf-8", errors="replace").read()
    mm = m_for(url)
    h2 = re.sub(r"<(script|style|noscript|svg|header|footer|nav)[^>]*>.*?</\1>", "", h, flags=re.S | re.I)
    junk = JUNK if not policy else ("skip to content", "{vendor", "{title", "manage ", "lorem ipsum")
    blocks, prev = [], None
    for m in re.finditer(r"<(h[1-4]|p|li)[^>]*>(.*?)</\1>", h2, re.S | re.I):
        tag = m.group(1).lower(); t = clean(m.group(2)); low = t.lower()
        if not t or len(t) < 2 or len(t) > 320 or any(j in low for j in junk):
            continue
        if (tag, t) == prev:
            continue
        prev = (tag, t); blocks.append({"tag": tag, "text": t})
    h1 = next((b["text"] for b in blocks if b["tag"] == "h1"), clean(mm.get("title", "")).split(" - ")[0].split(" | ")[0])
    body = [b for b in blocks if not (b["tag"] == "h1" and b["text"] == h1)]
    return {
        "title": clean(mm.get("title", "")),
        "description": clean(mm.get("description", "")),
        "h1": h1,
        "blocks": body[:60],
        "images": gallery(h)[:10],
    }

en_pages = json.load(open(os.path.join(LIB, "pages.json")))
for loc in ("it", "de"):
    out = {}
    for key in PAGE_KEYS:
        en_url = f"{HOST}/{key}/"
        hl = m_for(en_url).get("hreflang", {})
        locurl = hl.get({"it": "it-IT", "de": "de-DE"}[loc], "")
        if not locurl:
            continue
        rel = url_path(locurl).lstrip("/")
        p = os.path.join(SRC, "html", rel, "index.html")
        if not os.path.exists(p):
            print("  falta page", loc, p); continue
        out[key] = parse_page(p, locurl, policy=("policy" in key or "cookie" in key))
    json.dump(out, open(os.path.join(LIB, f"pages.{loc}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"pages.{loc}.json: {len(out)} paginas")

# ---------- ROUTES TABLE ----------
# pageKey -> {en, it, de} path relativo (con / inicial; home = "/")
routes = {}
key_to_enpath = {
    "home": "/", "about-us": "/about-us", "bikes-e-bikes": "/bikes-e-bikes",
    "motorbikes-scooters": "/motorbikes-scooters", "2wheels-season-pass": "/2wheels-season-pass",
    "for-companies": "/for-companies", "hotel-programs": "/hotel-programs", "tours": "/tours",
    "contact": "/contact", "payment-cancellation-refund-policy": "/payment-cancellation-refund-policy",
    "cookie-policy-eu": "/cookie-policy-eu",
}
for key, enpath in key_to_enpath.items():
    en_url = HOST + ("/" if enpath == "/" else enpath + "/")
    hl = m_for(en_url).get("hreflang", {})
    it = url_path(hl.get("it-IT", "")) if hl.get("it-IT") else None
    de = url_path(hl.get("de-DE", "")) if hl.get("de-DE") else None
    routes[key] = {"en": enpath, "it": it, "de": de}
json.dump(routes, open(os.path.join(LIB, "i18n-routes.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(f"i18n-routes.json: {len(routes)} keys")
for k, v in routes.items():
    print(f"  {k:34} it={v['it']}  de={v['de']}")
