#!/usr/bin/env python3
import os, re, json, html

SRC = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/source-wordpress"
LIB = "/Users/edoaldunate/Claude Clones/CLIENTES/2wheels/2wheels-web/lib"

def toks(h):
    h = re.sub(r"<(script|style|noscript|svg)[^>]*>.*?</\1>", "", h, flags=re.S | re.I)
    out = []
    for m in re.finditer(r"<(h[1-4]|p|li)[^>]*>(.*?)</\1>", h, re.S | re.I):
        t = html.unescape(re.sub(r"<[^>]+>", "", m.group(2))).strip()
        if t:
            out.append((m.group(1).lower(), t))
    return out

DAY_HEAD = re.compile(r"^(day|giorno|tag)\s*\d", re.I)
TEMPLATE = re.compile(r"airolo|passo del sole|nara", re.I)

def all_days(tk):
    out, cur = [], None
    for tag, t in tk:
        if tag in ("h2", "h3", "h4") and DAY_HEAD.match(t):
            cur = {"day": t, "body": []}
            out.append(cur)
        elif tag in ("h1", "h2", "h3", "h4"):
            cur = None  # cualquier otro heading cierra el día
        elif tag == "p" and cur is not None:
            if "lorem ipsum" in t.lower():
                continue
            cur["body"].append(t)
    return out

def pick(days, en_slug):
    if en_slug != "enduro-alps":
        days = [d for d in days if not TEMPLATE.search(d["day"])]
    seen, out = set(), []
    for d in days:
        key = re.sub(r"\s+", " ", d["day"]).strip()
        if key in seen:
            continue
        seen.add(key)
        out.append({"day": d["day"], "body": d["body"][:4]})
    return out

def html_path(loc, slug):
    base = "html" if loc == "en" else f"html/{loc}"
    return os.path.join(SRC, base, "tour", slug, "index.html")

for loc in ("en", "it", "de"):
    fn = "tours.json" if loc == "en" else f"tours.{loc}.json"
    p = os.path.join(LIB, fn)
    data = json.load(open(p))
    counts = 0
    for t in data:
        en = t.get("en_slug") or t["slug"]
        hp = html_path(loc, t["slug"])
        it = pick(all_days(toks(open(hp, encoding="utf-8", errors="replace").read())), en) if os.path.exists(hp) else []
        t["itinerary"] = it
        if it:
            counts += 1
    json.dump(data, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"{fn}: {counts}/{len(data)} tours con itinerario")

# muestra
d = json.load(open(os.path.join(LIB, "tours.json")))
for t in d:
    n = len(t["itinerary"])
    print(f"  {t['slug']:28} dias={n}" + (f"  ej: {t['itinerary'][0]['day'][:40]}" if n else ""))
