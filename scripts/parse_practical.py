#!/usr/bin/env python3
"""Agrega `practical` (tabs de Practical Info: Included / Price / Conditions / FAQ) a tours.{,it,de}.json.

Cada tab: {"title": str, "blocks": [...]} con bloques:
  {"t": "ul", "items": [str]}          lista (What's included: una por columna)
  {"t": "p", "html": str}              párrafo (solo <a>/<strong>/<em>; links internos relativos)
  {"t": "h", "text": str}              subtítulo ("Any questions?")
  {"t": "cta", "text": str, "href": str}  botón suelto (let's talk)
  {"t": "faq", "items": [{"q","a"}]}   preguntas (h3 + p)
"""
import os, re, json, html

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SRC = os.path.join(ROOT, "source-wordpress")
LIB = os.path.join(ROOT, "lib")

def clean_inline(h):
    h = re.sub(r"</?(span|div|br)[^>]*>", " ", h)
    h = re.sub(r"<a [^>]*href=\"([^\"]+)\"[^>]*>", lambda m: f'<a href="{rel(m.group(1))}">', h)
    h = re.sub(r"<(strong|b|em|i)(\s[^>]*)?>", r"<\1>", h)
    h = re.sub(r"</?(?!a\b|/a\b|strong\b|/strong\b|b\b|/b\b|em\b|/em\b|i\b|/i\b)[a-z0-9]+[^>]*>", "", h)
    return re.sub(r"\s+", " ", h).strip()

def rel(u):
    return re.sub(r"^https?://(www\.)?2wheelsrental\.com", "", u)

def text(h):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", h))).strip()

def parse_panel(p):
    p = re.sub(r"<(script|style|svg)[^>]*>.*?</\1>", "", p, flags=re.S)
    blocks, faq = [], []
    tok = re.compile(r"<ul[^>]*>(.*?)</ul>|<p[^>]*>(.*?)</p>|<h([1-6])[^>]*>(.*?)</h\3>|<a [^>]*href=\"([^\"]+)\"[^>]*>(.*?)</a>", re.S)
    for m in tok.finditer(p):
        ul, para, _, head, href, atext = m.groups()
        if ul is not None:
            items = [text(li) for li in re.findall(r"<li[^>]*>(.*?)</li>", ul, re.S)]
            items = [i for i in items if i]
            if items:
                blocks.append({"t": "ul", "items": items})
        elif para is not None:
            h = clean_inline(para)
            if not text(h) or "lorem ipsum" in h.lower():
                continue
            if faq and faq[-1]["a"] is None:
                faq[-1]["a"] = h
            else:
                blocks.append({"t": "p", "html": h})
        elif head is not None:
            t = text(head)
            if not t or re.match(r"^(pregunta|question|domanda|frage)\s*\d+$", t, re.I):
                continue
            if t.endswith("?") and "<h3" in m.group(0):
                faq.append({"q": t, "a": None})
            else:
                blocks.append({"t": "h", "text": t})
        elif href is not None:
            # links dentro de <p> ya fueron consumidos por el match de <p>; esto son botones sueltos
            t = text(atext)
            if t:
                blocks.append({"t": "cta", "text": t, "href": rel(href)})
    # "1. Guide", "2. E-bike"… en párrafos → lista
    merged = []
    for b in blocks:
        num = b["t"] == "p" and re.match(r"^\d+\.\s+", b["html"])
        if num:
            item = text(b["html"][num.end():])
            if merged and merged[-1].get("_num"):
                merged[-1]["items"].append(item)
            else:
                merged.append({"t": "ul", "items": [item], "_num": True})
        else:
            merged.append(b)
    for b in merged:
        b.pop("_num", None)
    blocks = merged
    faq = [f for f in faq if f["a"]]
    if faq:
        # tab FAQ: solo las preguntas (algunos tours traen texto de precio pegado por error)
        return [{"t": "faq", "items": faq}]
    return blocks

def parse(h):
    w = re.search(r'class="e-n-tabs".*?<div class="e-n-tabs-content">(.*)', h, re.S)
    if not w:
        return []
    titles = [text(t) for t in re.findall(r'<span class="e-n-tab-title-text">(.*?)</span>', h[w.start():w.start() + 6000], re.S)]
    body = w.group(1)
    starts = [m.start() for m in re.finditer(r'<div[^>]*\bid="e-n-tab-content-', body)]
    tabs = []
    for i, s in enumerate(starts):
        e = starts[i + 1] if i + 1 < len(starts) else body.find("Keep Exploring") if "Keep Exploring" in body else len(body)
        e = e if e > s else len(body)
        seg = body[s:e]
        # cortar fin del widget en el último panel
        if i + 1 == len(starts):
            cut = re.search(r"<h2[^>]*>\s*(Keep Exploring|Continua|Weiter|Altri tour|Entdecken)", seg)
            if cut:
                seg = seg[:cut.start()]
        tabs.append({"title": titles[i] if i < len(titles) else f"Tab {i+1}", "blocks": parse_panel(seg)})
    return [t for t in tabs if t["blocks"]]

def html_path(loc, slug):
    base = "html" if loc == "en" else f"html/{loc}"
    return os.path.join(SRC, base, "tour", slug, "index.html")

for loc in ("en", "it", "de"):
    fn = "tours.json" if loc == "en" else f"tours.{loc}.json"
    p = os.path.join(LIB, fn)
    data = json.load(open(p, encoding="utf-8"))
    n = 0
    for t in data:
        hp = html_path(loc, t["slug"])
        t["practical"] = parse(open(hp, encoding="utf-8", errors="replace").read()) if os.path.exists(hp) else []
        n += bool(t["practical"])
    # tabs vacíos/placeholder en el original (Conditions, FAQ) → versión estándar del mismo idioma
    ref = max(data, key=lambda t: len(t["practical"]))["practical"]
    for t in data:
        have = {x["title"] for x in t["practical"]}
        for i, std in enumerate(ref):
            if i >= 2 and std["title"] not in have:
                t["practical"].insert(min(i, len(t["practical"])), std)
    json.dump(data, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"{fn}: {n}/{len(data)} con practical | ej: {[ (x['title'], len(x['blocks'])) for x in data[0]['practical']]}")
