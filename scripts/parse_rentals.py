#!/usr/bin/env python3
"""Genera lib/rentals.json (landings Bikes & e-bikes / Motorbikes & Scooters, EN/IT/DE)
desde el HTML en vivo de 2wheelsrental.com (se guarda en source-wordpress/html/live/).

Estructura del Elementor: hero (h1 eyebrow + h2 título + párrafos + botón),
"Choose Your Ride" (h3 + intro + lista, nota Important) + imagen, galería, checklist
(equipamiento + Optional on Request) + imagen, card sobre foto (h3 + párrafos/listas + botón), CTA.

Uso: python3 scripts/parse_rentals.py [--fetch]
"""
import html, json, os, re, sys, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
LIVE = os.path.join(ROOT, "source-wordpress", "html", "live")
PUB = os.path.join(ROOT, "public")

PAGES = {
    "bikes-e-bikes": {"en": "bikes-e-bikes", "it": "it/biciclette-e-bike", "de": "de/fahrrader-e-bikes"},
    "motorbikes-scooters": {"en": "motorbikes-scooters", "it": "it/moto-scooter", "de": "de/motorrader-motorroller"},
}
# Foto de fondo de la card (viene del CSS de Elementor, no del HTML)
CARD_BG = {
    "bikes-e-bikes": "/wp-content/uploads/2026/03/highlights-2wheels-rental-alpe-vicania-lugano.webp",
    "motorbikes-scooters": "/wp-content/uploads/2026/05/2wheels-rental-lugano-ticino-scooter-motos-motorcycle-motorbike-noleggio-rent-11.webp",
}
SKIP_IMG = ("05-Campervan-Rental",)  # imagen oculta que Elementor deja en el DOM

# Correcciones de traducciones automáticas evidentes del WP (texto exacto → corregido)
FIX = {
    "it": {
        "Moto premium, pronte per la vostra prossima avventura.": "Bici premium, pronte per la vostra prossima avventura.",
        "PRENOTA LA TUA MOTO": "Prenota la tua bici",
        "Adatto a principianti e cavalieri esperti": "Adatto a principianti e ciclisti esperti",
        "Tutto ciò che serve per cavalcare": "Tutto ciò che serve per pedalare",
        "Pronti a cavalcare in Ticino?": "Pronti a pedalare in Ticino?",
        "Perfetto per i cavalieri con esperienza": "Perfetto per motociclisti con esperienza",
        "CHIEDERE IDEE PER I PERCORSI": "Chiedi idee per i percorsi",
        "PRENOTA IL TUO VIAGGIO": "Prenota la tua moto",
        "NOLEGGIA LA TUA BICICLETTA": "Noleggia la tua bici",
        "Andare più lontano. Scopri di più.": "Vai più lontano. Scopri di più.",
    },
    "de": {
        "Ideal für Paare, Familien und Freizeitreiter": "Ideal für Paare, Familien und Gelegenheitsfahrer",
        "Geeignet für Anfänger und erfahrene Reiter": "Geeignet für Anfänger und erfahrene Fahrer",
        "Alles, was Sie zum Reiten brauchen": "Alles, was Sie zum Fahren brauchen",
        "Bereit zum Reiten im Tessin?": "Bereit zum Radfahren im Tessin?",
        "Perfekt für Reiter mit Erfahrung": "Perfekt für erfahrene Fahrer",
        "Straßen- und Schotterfahrräder": "Rennräder & Gravelbikes",
        "Weiter reiten. Mehr entdecken.": "Weiter fahren. Mehr entdecken.",
        "Individuelle Planung von Autoreisen": "Individuelle Roadtrip-Planung",
        "BOOK YOUR RIDE": "Jetzt buchen",
        "BUCHEN SIE IHR BIKE": "Bike buchen",
        "MIETEN SIE IHR BIKE": "Bike mieten",
        "NACH ROUTENIDEEN FRAGEN": "Nach Routenideen fragen",
    },
    "en": {},
}


def fetch():
    os.makedirs(LIVE, exist_ok=True)
    for key, locs in PAGES.items():
        for loc, path in locs.items():
            req = urllib.request.Request(f"https://2wheelsrental.com/{path}/", headers={"User-Agent": "Mozilla/5.0"})
            open(os.path.join(LIVE, path.replace("/", "_") + ".html"), "wb").write(urllib.request.urlopen(req).read())


def rel(u):
    return re.sub(r"^https?://(www\.)?2wheelsrental\.com", "", u)


def clean(s):
    s = re.sub(r"<(strong|b)>", "**", s)
    s = re.sub(r"</(strong|b)>", "**", s)
    s = html.unescape(re.sub(r"<[^>]+>", "", s))
    s = re.sub(r"\s+", " ", s).strip()
    return re.sub(r"\*\*\s*\*\*", "", s).replace("** ", "**", 0)


def tokens(path):
    s = open(path, encoding="utf-8").read()
    t = re.search(r'data-elementor-type="wp-page".*?data-elementor-type="footer"', s, re.S).group(0)
    t = re.sub(r"<(script|style|svg)[^>]*>.*?</\1>", "", t, flags=re.S)
    out = []
    pat = re.compile(
        r"<(h[1-6]|p|li)[^>]*>(.*?)</\1>"
        r"|<img[^>]*?src=\"(https?://[^\"]+uploads[^\"]+)\""
        r"|<a [^>]*href=\"([^\"]+)\"[^>]*>\s*(?:<span[^>]*>\s*)*<span class=\"elementor-button-text\">([^<]*)",
        re.S,
    )
    for m in pat.finditer(t):
        if m.group(1):
            x = clean(m.group(2))
            if x:
                out.append((m.group(1), x))
        elif m.group(3):
            u = rel(m.group(3))
            if not any(k in u for k in SKIP_IMG):
                out.append(("img", u))
        elif m.group(5) is not None:
            out.append(("btn", (m.group(5).strip(), m.group(4))))
    return out


def link(btn, fix):
    label, href = btn
    label = fix.get(label, label)
    if label.isupper():
        label = label.capitalize()
    ext = not href.startswith("https://2wheelsrental.com")
    return {"label": label, "href": rel(href) if not ext else href, **({"external": True} if ext else {})}


def build(key, loc):
    fix = FIX[loc]
    tk = [(t, fix.get(v, v) if isinstance(v, str) else v) for t, v in tokens(os.path.join(LIVE, PAGES[key][loc].replace("/", "_") + ".html"))]
    # quita prefijo/sufijo "**" sueltos
    tk = [(t, v.strip("*").strip() if isinstance(v, str) and t != "li" and v.startswith("**") and v.endswith("**") else v) for t, v in tk]
    i = 0
    nxt = lambda: tk[i]
    data = {}

    # HERO
    hero_img = None
    while tk[i][0] == "img":
        hero_img = tk[i][1]; i += 1
    assert tk[i][0] == "h1"; eyebrow = tk[i][1]; i += 1
    assert tk[i][0] == "h2"; title = tk[i][1]; i += 1
    body = []
    while tk[i][0] == "p":
        body.append(tk[i][1]); i += 1
    cta = link(tk[i][1], fix); i += 1
    data["hero"] = {"image": hero_img, "eyebrow": eyebrow,
                    "title": title, "keepCase": True, "body": body, "cta": cta}

    # SPLIT (Choose your ride)
    assert tk[i][0] == "h2"; split = {"title": tk[i][1], "paras": [], "groups": []}; i += 1
    note = None
    while tk[i][0] in ("h3", "p", "li"):
        t, v = tk[i]
        if t == "h3":
            split["groups"].append({"title": v, "items": []})
        elif t == "li":
            split["groups"][-1]["items"].append(v)
        elif t == "p" and split["groups"] and not split["groups"][-1]["items"] and "intro" not in split["groups"][-1]:
            split["groups"][-1]["intro"] = v
        else:  # "Important" + texto
            if note is None:
                note = {"title": v.strip("*").strip(), "text": ""}
            else:
                note["text"] = v
        i += 1
    if note:
        split["note"] = note
    imgs = []
    while tk[i][0] == "img":
        imgs.append(tk[i][1]); i += 1
    split["image"] = imgs[0]
    data["split"] = split
    gallery, checks_img = imgs[1:-1], imgs[-1]
    data["gallery"] = gallery

    # CHECKS
    assert tk[i][0] == "h2"; checks = {"image": checks_img, "title": tk[i][1], "items": []}; i += 1
    while tk[i][0] == "li":
        checks["items"].append(tk[i][1]); i += 1
    if tk[i][0] == "h3":
        checks["optionalTitle"] = tk[i][1]; checks["optional"] = []; i += 1
        while tk[i][0] == "li":
            checks["optional"].append(tk[i][1]); i += 1
    data["checks"] = checks

    # CARD
    assert tk[i][0] == "h2"; card = {"bg": CARD_BG[key], "title": tk[i][1], "groups": []}; i += 1
    while tk[i][0] in ("h3", "p", "li"):
        t, v = tk[i]
        if t == "h3":
            card["groups"].append({"title": v, "items": []})
        elif t == "p":
            card["groups"][-1].setdefault("paras", []).append(v)
        else:
            card["groups"][-1]["items"].append(v)
        i += 1
    if tk[i][0] == "btn":
        card["button"] = link(tk[i][1], fix); i += 1
    data["card"] = card

    # CTA
    assert tk[i][0] == "h2"; cta2 = {"title": tk[i][1], "paras": []}; i += 1
    while tk[i][0] == "p":
        cta2["paras"].append(tk[i][1]); i += 1
    cta2["button"] = link(tk[i][1], fix)
    data["cta"] = cta2
    data["order"] = ["split", "gallery", "checks", "card"]

    # sanity: imágenes locales
    for u in [hero_img, split["image"], checks_img, CARD_BG[key], *gallery]:
        if not os.path.exists(PUB + u):
            print(f"  ! falta {u}", file=sys.stderr)
    return data


if __name__ == "__main__":
    if "--fetch" in sys.argv:
        fetch()
    out = {key: {loc: build(key, loc) for loc in locs} for key, locs in PAGES.items()}
    json.dump(out, open(os.path.join(ROOT, "lib", "rentals.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    for key in out:
        d = out[key]["en"]
        print(key, "| split groups", len(d["split"]["groups"]), "| gallery", len(d["gallery"]), "| card groups", len(d["card"]["groups"]))
