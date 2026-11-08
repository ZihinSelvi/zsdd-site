#!/usr/bin/env python3
"""tools/index.template.html + urunler.json -> index.html  (python3 -I tools/site_uret.py)"""
import json, os, re, html
from urllib.parse import quote
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
T = open(os.path.join(R,"tools","index.template.html"),encoding="utf8").read()
URUN = json.load(open(os.path.join(R,"tools","urunler.json"),encoding="utf8"))
NUM = "905332218961"
def wa(msg): return f"https://wa.me/{NUM}?text={quote(msg, safe='')}"
GENEL = wa("Merhaba, ZSDD sitesinden yazıyorum. Ücretsiz ön teşhis hakkında bilgi almak istiyorum.")
TESHIS = wa("Merhaba, ücretsiz ön teşhis hakkında bilgi almak istiyorum.")
DEMO = wa("Merhaba, WhatsApp Hızlı Yanıt Sistemi için demo istiyorum.")
assert TESHIS == "https://wa.me/905332218961?text=Merhaba%2C%20%C3%BCcretsiz%20%C3%B6n%20te%C5%9Fhis%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.", TESHIS
arcs = open("/tmp/claude-0/arcs.txt",encoding="utf8").read() if os.path.exists("/tmp/claude-0/arcs.txt") else None
if arcs is None:
    src = open(os.path.join(R,"_kaynak","ZSDD-site-onizleme.html"),encoding="utf8").read()
    m = re.search(r'<svg class="asm" viewBox="0 0 2000 2000".*?<g[^>]*>(.*?)</g>', src, re.S)
    arcs = m.group(1).strip("\n")
LINKEDIN = "https://www.linkedin.com/in/zihni-selvi/"
INSTAGRAM = "https://www.instagram.com/selvizihni/"
FACEBOOK = "https://www.facebook.com/zihniselvidijitaldanismanlik/"
def icon(ad, url, svg):
    return f'<li><a href="{url}" rel="noopener" aria-label="{ad}">{svg}</a></li>'
SV = {
 "LinkedIn": '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 9.5h4v11H3zM10 9.5h3.8v1.6h.06c.53-1 1.84-2.1 3.8-2.1 4.06 0 4.8 2.67 4.8 6.14v5.36h-4v-4.75c0-1.13-.02-2.6-1.58-2.6-1.58 0-1.82 1.24-1.82 2.52v4.83h-4z"/></svg>',
 "Instagram": '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>',
 "Facebook": '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8.5V7c0-.8.5-1 1-1h2V3h-3c-3 0-4 2-4 4v1.5H8V12h2v9h4v-9h2.6l.4-3.5z"/></svg>',
}
SOSYAL = '<ul class="social" aria-label="Sosyal medya">' + "".join(icon(a,u,SV[a]) for a,u in (("LinkedIn",LINKEDIN),("Instagram",INSTAGRAM),("Facebook",FACEBOOK))) + '</ul>'
kats = []
for p in URUN:
    if p["kat"] not in kats: kats.append(p["kat"])
# "Diğer" en sona
if "Diğer" in kats: kats.remove("Diğer"); kats.append("Diğer")
chips = [f'        <li><button class="chip" type="button" data-kat="Tümü" aria-pressed="true">Tümü <small>{len(URUN)}</small></button></li>']
for k in kats:
    n = sum(1 for p in URUN if p["kat"]==k)
    chips.append(f'        <li><button class="chip" type="button" data-kat="{html.escape(k)}" aria-pressed="false">{html.escape(k)} <small>{n}</small></button></li>')
cards = []
for p in URUN:
    ad = html.escape(p["ad"]); kat = html.escape(p["kat"])
    alt = f'{ad}, {kat.lower()} ürünü' + (' (görsel hazırlanıyor)' if p["yer_tutucu"] else '')
    link = wa(f'Merhaba, {p["ad"]} için teklif almak istiyorum.')
    ph = ' data-yer-tutucu="GÖRSEL_YER_TUTUCU"' if p["yer_tutucu"] else ''
    gizli = ''
    cards.append(f'        <li class="card" data-kat="{kat}"{ph}{gizli}><img src="images/{p["dosya"]}" width="560" height="560" loading="lazy" decoding="async" alt="{alt}"><h3>{ad}</h3><a href="{link}" rel="noopener" aria-label="{ad} için teklif isteyin">Teklif isteyin</a></li>')
out = (T.replace("{{ARCS}}", arcs).replace("{{CHIPS}}", "\n".join(chips)).replace("{{CARDS}}", "\n".join(cards))
        .replace("{{WA_GENEL}}", GENEL).replace("{{WA_TESHIS}}", TESHIS).replace("{{WA_DEMO}}", DEMO).replace("{{SOSYAL}}", SOSYAL).replace("{{INSTAGRAM}}", INSTAGRAM).replace("{{FACEBOOK}}", FACEBOOK))
assert "{{" not in out
open(os.path.join(R,"index.html"),"w",encoding="utf8").write(out)
print("index.html", len(out), "bayt;", len(cards), "kart;", kats)
