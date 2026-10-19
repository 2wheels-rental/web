#!/usr/bin/env python3
"""Completa tours.{,it,de}.json con datos del sitio en vivo:
  - highlightsTitle / highlights / highlightsImage (bloque "Highlights" o "Why Shuttle": caja oscura + foto)
  - routes / routesTitle (bloque "Routes Available" del Bike Shuttle: h2 título + párrafo por ruta)

Uso: python3 scripts/parse_tour_extras.py   (descarga cada tour en vivo a source-wordpress/html/live/tour/)
"""
import html, json, os, re, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
LIVE = os.path.join(ROOT, "source-wordpress", "html", "live", "tour")
PUB = os.path.join(ROOT, "public")
os.makedirs(LIVE, exist_ok=True)

ITIN = re.compile(r"^(itinerary|itinerario|reiseplan|reiseverlauf)$", re.I)
DAY = re.compile(r"^(day|giorno|tag)\s*\d", re.I)


def get(loc, slug):
    path = f"tour/{slug}/" if loc == "en" else f"{loc}/tour/{slug}/"
    f = os.path.join(LIVE, f"{loc}_{slug}.html")
    if not os.path.exists(f):
        req = urllib.request.Request(f"https://2wheelsrental.com/{path}", headers={"User-Agent": "Mozilla/5.0"})
        open(f, "wb").write(urllib.request.urlopen(req).read())
    return open(f, encoding="utf-8").read()


def booking(s):
    """Link del botón 'Book this tour' (WeTravel, tickets de Lugano Region, etc.)."""
    for m in re.finditer(r'<a class="elementor-button[^"]*" href="([^"]+)"[^>]*>\s*<span[^>]*>\s*<span class="elementor-button-text">\s*([^<]*)', s):
        if re.search(r"book|prenot|buch", m.group(2), re.I) and "2wheelsrental.com" not in m.group(1):
            return m.group(1)
    return None


def toks(s):
    a = s.find('data-elementor-type="single-post"')
    b = s.find('data-elementor-type="footer"')
    t = re.sub(r"<(script|style|svg)[^>]*>.*?</\1>", "", s[a:b], flags=re.S)
    out = []
    for m in re.finditer(r"<(h[1-6]|p|li)[^>]*>(.*?)</\1>|<img[^>]*?src=\"(https?://[^\"]+uploads[^\"]+)\"", t, re.S):
        if m.group(1):
            x = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", m.group(2)))).strip()
            if x:
                out.append((m.group(1), x))
        else:
            u = re.sub(r"^https?://(www\.)?2wheelsrental\.com", "", m.group(3))
            u = re.sub(r"-\d+x\d+(\.\w+)$", r"\1", u)  # versión original, no el thumbnail
            out.append(("img", u))
    return out


def extras(tk):
    res = {}
    # highlights: primer h2 seguido de <li>
    for i, (t, v) in enumerate(tk):
        if t == "h2" and i + 1 < len(tk) and tk[i + 1][0] == "li":
            items, j = [], i + 1
            while j < len(tk) and tk[j][0] == "li":
                items.append(tk[j][1]); j += 1
            res["highlightsTitle"], res["highlights"] = v, items
            if j < len(tk) and tk[j][0] == "img" and os.path.exists(PUB + tk[j][1]):
                res["highlightsImage"] = tk[j][1]
            break
    # rutas: h2 seguido directamente de otro h2 (título de sección + rutas h2/p), que no sea itinerario por días
    for i, (t, v) in enumerate(tk):
        if t == "h2" and not ITIN.match(v) and i + 2 < len(tk) and tk[i + 1][0] == "h2" and tk[i + 2][0] == "p" and not DAY.match(tk[i + 1][1]):
            routes, j = [], i + 1
            while j + 1 < len(tk) and tk[j][0] == "h2" and tk[j + 1][0] == "p" and not ITIN.match(tk[j][1]):
                routes.append({"day": tk[j][1], "body": [tk[j + 1][1]]}); j += 2
            routes = [r for r in routes if "lorem ipsum" not in r["body"][0].lower()]
            if len(routes) >= 2:
                res["routesTitle"], res["routes"] = v, routes
            break
    return res


for loc, fn in (("en", "tours.json"), ("it", "tours.it.json"), ("de", "tours.de.json")):
    p = os.path.join(ROOT, "lib", fn)
    data = json.load(open(p, encoding="utf-8"))
    for t in data:
        try:
            page = get(loc, t["slug"])
            ex = extras(toks(page))
            if not t.get("booking") and booking(page):
                t["booking"] = booking(page)
        except Exception as e:  # noqa: BLE001
            print(f"  ! {loc} {t['slug']}: {e}")
            continue
        if ex.get("highlights") and not t.get("highlights"):
            t["highlights"] = ex["highlights"]
        for k in ("highlightsTitle", "highlightsImage", "routesTitle", "routes"):
            if k in ex:
                t[k] = ex[k]
        print(f"{loc} {t['slug'][:28]:28} hl={len(t.get('highlights', []))} '{ex.get('highlightsTitle','')}' img={'y' if 'highlightsImage' in ex else '-'} routes={len(ex.get('routes', []))}")
    json.dump(data, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
