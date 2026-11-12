# zsdd-site

Zihni Selvi Dijital Danışmanlık internet sitesi (statik HTML/CSS/JS, GitHub Pages). Alan adı: `zihniselvidijitaldanismanlik.com`.

## Durum (12 Kasım 2026)

**İçerik ve tasarım tamam. GitHub Pages açık, ama site henüz canlı değil: alan adının DNS kayıtları eklenmedi.**

Kalan iş (Cloudflare DNS, hepsi "DNS only" / gri bulut):

1. `@` için dört A kaydı: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Eski A/AAAA kaydı varsa sil.
2. `www` için CNAME → `zihinselvi.github.io`.
3. GitHub alan adı doğrulaması (Settings → Pages → Verified domains) TXT kaydı isterse onu da ekle.
4. Settings → Pages → "Check again", sonra "Enforce HTTPS"i işaretle.
5. Canlı kontrol: telefonda aç, `www` yönlendirmesi, paylaşım önizlemesi (LinkedIn Post Inspector).

Gizlilik metni (`gizlilik.html`) küçük işletmeye uygun, KVKK m.10 unsurlarını içeren sade bir metindir; avukat incelemesi yapılmadı, hukuki görüş yerine geçmez.

## Dosyalar

- Yayın dosyaları: `index.html`, `gizlilik.html`, `404.html`, `css/`, `js/`, `fonts/`, `assets/img/` (portre), `logo.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`, `CNAME`.
- Kaynaklar ve üretim betikleri: `tools/`. `tools/src/` altında okunur CSS/JS; `sh tools/derle.sh` bunları küçültür ve `index.html`i üretir. Tek dosyalık önizleme için `python3 -I tools/onizleme_uret.py`.
- `_kaynak/` Jekyll tarafından yayına alınmaz (alt çizgi ile başlar).

## Kararlar

- Mobilde üst çubuk sabittir (kaydırırken gizlenmez). Menü zemini `.top::before` katmanındadır: `.top` üzerine `backdrop-filter` konursa `position:fixed` mobil menü 84 px'lik çubuğa hapsolur.
- "Ek hizmet" (matbaa ve reklam ürün rayı) kaldırıldı ve geri gelmeyecek.
- Tek kişi fotoğrafı `assets/img/` altındaki onaylı kare portredir; yalnızca "Zihni Selvi kimdir?" bölümünde kullanılır. Paylaşım görseli (`og:image`) 1200×630 `og-image.png` kalır (kare görsel önizlemede kırpılır).
