#!/usr/bin/env python3
import os, re, json, html

SRC = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/source-wordpress"
OUT = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/lib/pages.json"
meta = json.load(open(os.path.join(SRC, "meta/meta_map.json")))

PAGES = {
    "bikes-e-bikes": "bikes-e-bikes",
    "motorbikes-scooters": "motorbikes-scooters",
    "about-us": "about-us",
    "for-companies": "for-companies",
    "2wheels-season-pass": "2wheels-season-pass",
    "hotel-programs": "hotel-programs",
    "payment-cancellation-refund-policy": "payment-cancellation-refund-policy",
    "cookie-policy-eu": "cookie-policy-eu",
}

DENY = {
    "home", "about us", "rent", "bikes & e-bikes", "motorbikes & scooters",
    "season pass", "tours", "for companies", "other services", "weride academy",
    "bike shuttle", "hotel programs", "contact", "english", "italian", "german",
    "rentbikes & e-bikes", "other servicesweride academy", "menu", "rentals",
    "bikes & e-bikes", "motorcycles", "campervan", "cookie policy",
    "payment, cancellation & refund policy", "follow us on instagram@2wheels.rental",
    "via antonio adamini 20, lugano, switzerland", "ticino@2wheelsrental.com",
    "+41 76 361 96 61", "design & development by", "skip to content",
}

def clean(t):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", t))).strip()

# Ruido del banner Cookiebot (solo para páginas que NO son de políticas)
JUNK_BASE = (
    "skip to content", "{vendor", "{title", "manage service", "manage option",
    "manage {", "manage consent", "manage vendor", "read more about these purposes",
    "all rights reserved", "lorem ipsum", "whatsapp us",
)
JUNK_COOKIE = (
    "we use cookies", "accept all cookies", "view preferences",
    "list of partners", "legitimate interest",
)

def blocks(h, policy=False):
    h = re.sub(r"<(script|style|noscript|svg|header|footer|nav)[^>]*>.*?</\1>", "", h, flags=re.S | re.I)
    junk = JUNK_BASE if policy else (JUNK_BASE + JUNK_COOKIE)
    out = []
    prev = None
    for m in re.finditer(r"<(h[1-4]|p|li)[^>]*>(.*?)</\1>", h, re.S | re.I):
        tag = m.group(1).lower()
        t = clean(m.group(2))
        low = t.lower()
        if not t or low in DENY or len(t) < 2 or len(t) > 320:
            continue
        if any(j in low for j in junk):
            continue
        if low.startswith(("©", "home ", "home\t")):
            continue
        if (tag, t) == prev:
            continue
        prev = (tag, t)
        out.append({"tag": tag, "text": t})
    return out

def images(h):
    imgs = []
    for m in re.findall(r"wp-content/uploads/\d{4}/\d{2}/[^\"' )]+\.(?:webp|jpg|jpeg|png)", h):
        base = re.sub(r"-\d+x\d+(\.\w+)$", r"\1", m)
        low = base.lower()
        if any(x in low for x in ("logo", "cropped", "icon", "-18x12", "captura")):
            continue
        if base not in imgs:
            imgs.append(base)
    return imgs

result = {}
for slug, path in PAGES.items():
    f = os.path.join(SRC, "html", path, "index.html")
    if not os.path.exists(f):
        print("FALTA", f); continue
    h = open(f, encoding="utf-8", errors="replace").read()
    url = f"https://2wheelsrental.com/{path}/"
    m = meta.get(url, {})
    is_policy = "policy" in slug or "cookie" in slug
    bl = blocks(h, policy=is_policy)
    h1 = next((b["text"] for b in bl if b["tag"] == "h1"), clean(m.get("title", "")).split(" - ")[0])
    body = [b for b in bl if not (b["tag"] == "h1" and b["text"] == h1)]
    result[slug] = {
        "slug": slug,
        "title": clean(m.get("title", "")),
        "metatitle": clean(m.get("title", "")),
        "description": clean(m.get("description", "")),
        "h1": h1,
        "blocks": body[:60],
        "images": images(h)[:10],
        "canonical": m.get("canonical", ""),
        "slug_it": m.get("hreflang", {}).get("it-IT", ""),
        "slug_de": m.get("hreflang", {}).get("de-DE", ""),
    }

json.dump(result, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(f"OK: {len(result)} paginas -> lib/pages.json\n")
for s, p in result.items():
    heads = [b["text"] for b in p["blocks"] if b["tag"] in ("h2", "h3")][:6]
    print(f"### {s}  (h1='{p['h1']}', blocks={len(p['blocks'])}, imgs={len(p['images'])})")
    print("   subt:", p["description"][:70])
    print("   heads:", " | ".join(heads))
