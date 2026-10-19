#!/usr/bin/env python3
"""Genera lib/seo.json: { path: {title, description} } para todas las URLs.

- Base: títulos/descripciones de Yoast del WP en vivo (source-wordpress/meta/live-seo.json,
  generado comparando WP vs Next). Se conservan tal cual para no mover el posicionamiento.
- TITLE_FIX: corrige traducciones malas de Yoast (p.ej. "Casa" = home, "Rundgänge").
- Descripciones que el WP no tenía: se escriben a partir del contenido de cada página.
"""
import json, os, re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
live = json.load(open(os.path.join(ROOT, "source-wordpress", "meta", "live-seo.json"), encoding="utf-8"))
rentals = json.load(open(os.path.join(ROOT, "lib", "rentals.json"), encoding="utf-8"))

TITLE_FIX = {
    "/it": "Noleggio bici, e-bike e scooter a Lugano - 2wheels Rental",  # WP: "Casa - Noleggio 2wheels"
    "/it/contatti": "Contatti - 2wheels Rental",                          # WP: "Contatto - Noleggio 2wheels"
    "/de/kontakt": "Kontakt - 2wheels Rental",                            # WP: "Ansprechpartner"
    "/de/touren": "Touren - 2wheels Rental",                              # WP: "Rundgänge"
}


def clip(s, n=158):
    s = re.sub(r"\*\*", "", re.sub(r"\s+", " ", s)).strip()
    if len(s) <= n:
        return s
    return s[: s.rfind(" ", 0, n - 1)].rstrip(",;:—–-") + "…"


DESC = {
    # Bikes / Motorbikes: texto del hero de la landing (lib/rentals.json)
    **{p: clip(" ".join(rentals[k][l]["hero"]["body"]))
       for k, paths in {"bikes-e-bikes": {"en": "/bikes-e-bikes", "it": "/it/biciclette-e-bike", "de": "/de/fahrrader-e-bikes"},
                        "motorbikes-scooters": {"en": "/motorbikes-scooters", "it": "/it/moto-scooter", "de": "/de/motorrader-motorroller"}}.items()
       for l, p in paths.items()},
    "/2wheels-season-pass": "Ride more, pay less: the 2wheels Season Pass gives you 10 or 20 premium bike rentals for the whole season in Ticino, from CHF 40 per ride.",
    "/it/pass-stagionale-2wheels": "Pedala di più, paga di meno: il Season Pass 2wheels include 10 o 20 noleggi di bici premium per tutta la stagione in Ticino, da CHF 40 a uscita.",
    "/de/2rader-saisonkarte": "Mehr fahren, weniger zahlen: der 2wheels Saisonpass mit 10 oder 20 Premium-Bike-Mieten für die ganze Saison im Tessin, ab CHF 40 pro Fahrt.",
    "/hotel-programs": "Hotel Bike Program in Ticino: premium bikes for your guests, with maintenance and logistics managed by 2wheels Rental. Seasonal or annual plans.",
    "/it/programmi-alberghieri": "Hotel Bike Program in Ticino: biciclette premium per i vostri ospiti, con manutenzione e logistica gestite da 2wheels Rental. Piani stagionali o annuali.",
    "/de/hotelprogramme": "Hotel-Fahrradprogramm im Tessin: Premium-Bikes für Ihre Gäste, Wartung und Logistik übernimmt 2wheels Rental. Saison- oder Jahresprogramme.",
    "/cookie-policy-eu": "How 2wheels Rental uses cookies on this website and how you can manage your consent preferences.",
    "/it/politica-dei-cookie-eu": "Come 2wheels Rental utilizza i cookie su questo sito e come puoi gestire le tue preferenze di consenso.",
    "/de/cookie-policy-eu": "Wie 2wheels Rental Cookies auf dieser Website verwendet und wie Sie Ihre Einwilligung verwalten können.",
}

out = {}
for path, wp, _nx in live:
    p = path.rstrip("/") or "/"
    title = TITLE_FIX.get(p) or (wp or {}).get("title")
    desc = (wp or {}).get("desc") or DESC.get(p)
    if title or desc:
        out[p] = {k: v for k, v in (("title", title), ("description", desc)) if v}
for p, d in DESC.items():
    out.setdefault(p, {})["description"] = out.get(p, {}).get("description") or d

json.dump(dict(sorted(out.items())), open(os.path.join(ROOT, "lib", "seo.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(len(out), "rutas;", sum(1 for v in out.values() if "description" not in v), "sin descripción")
