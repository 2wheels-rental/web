#!/usr/bin/env python3
import os, re, json, html, glob

SRC = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/source-wordpress"
OUT = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/lib/tours.json"
meta = json.load(open(os.path.join(SRC, "meta/meta_map.json")))
SPEC_LABELS = {"duration", "distance", "format", "level", "elevation", "bike type"}

def clean(t):
    return html.unescape(re.sub(r"<[^>]+>", "", t)).strip()

def tokens(h):
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
        base = re.sub(r"-\d+x\d+(\.\w+)$", r"\1", m)  # quitar sufijo -800x600
        low = base.lower()
        if any(x in low for x in ("logo", "cropped", "weride", "icon", "-18x12")):
            continue
        if base not in imgs:
            imgs.append(base)
    return imgs

tours = []
for f in sorted(glob.glob(os.path.join(SRC, "html/tour/*/index.html"))):
    slug = f.split("/tour/")[1].split("/")[0]
    if slug == "bike-shuttle":
        pass  # es un servicio, pero lo incluimos igual
    h = open(f, encoding="utf-8", errors="replace").read()
    url = f"https://2wheelsrental.com/tour/{slug}/"
    m = meta.get(url, {})
    toks = tokens(h)

    # link de reserva WeTravel (externo, por tour)
    mwt = re.search(r"https://[a-z0-9.]*wetravel\.com/trips/[^\"' )]+", h)
    booking = mwt.group(0) if mwt else ""

    # titulo = primer h1
    title = next((t for tag, t in toks if tag == "h1"), slug.replace("-", " ").title())

    # specs: h3(label) seguido de p(value)
    specs = {}
    for i, (tag, t) in enumerate(toks):
        if tag == "h3" and t.strip().lower() in SPEC_LABELS and i + 1 < len(toks):
            ntag, nval = toks[i + 1]
            if ntag == "p":
                specs[t.strip()] = nval

    # intro: parrafos largos antes del primer h2
    intro = []
    for tag, t in toks:
        if tag == "h2":
            break
        if tag == "p" and len(t) > 60 and t.lower() not in ("2 days",):
            intro.append(t)

    # highlights: li despues de h2 "Highlights" hasta el siguiente h2
    highlights = []
    grab = False
    for tag, t in toks:
        if tag == "h2":
            grab = t.strip().lower() == "highlights"
            continue
        if grab and tag == "li" and 3 < len(t) < 160:
            highlights.append(t)

    tours.append({
        "slug": slug,
        "title": title,
        "subtitle": clean(m.get("description", "")),
        "specs": specs,
        "intro": intro[:4],
        "highlights": highlights[:8],
        "hero": m.get("og:image", ""),
        "gallery": gallery(h)[:12],
        "booking": booking,
        "slug_it": m.get("hreflang", {}).get("it-IT", "").split("/tour/")[-1].rstrip("/"),
        "slug_de": m.get("hreflang", {}).get("de-DE", "").split("/tour/")[-1].rstrip("/"),
    })

json.dump(tours, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(f"OK: {len(tours)} tours -> lib/tours.json\n")
for t in tours:
    print(f"- {t['slug']:28} | {t['subtitle'][:45]:45} | specs:{len(t['specs'])} hl:{len(t['highlights'])} img:{len(t['gallery'])}")
