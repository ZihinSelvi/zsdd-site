# zsdd-site

Zihni Selvi Dijital Danışmanlık internet sitesi (statik HTML/CSS/JS, GitHub Pages). Alan adı: `zihniselvidijitaldanismanlik.com`.

## Durum (12 Kasım 2026)

**Site canlı: https://zihniselvidijitaldanismanlik.com/** GitHub Pages `main` dalından (`/ root`) yayınlanır, HTTPS zorunludur. DNS Cloudflare'dedir: `@` için dört A kaydı (`185.199.108.153` … `185.199.111.153`) ve `www` CNAME → `zihinselvi.github.io`, hepsi "DNS only" (gri bulut; turuncu bulut GitHub sertifikasını bozar).

Gizlilik metni (`gizlilik.html`) küçük işletmeye uygun, KVKK m.10 unsurlarını içeren sade bir metindir; avukat incelemesi yapılmadı, hukuki görüş yerine geçmez. Saklama süresi: talep sonuçlandıktan sonra en fazla 2 yıl.

Kalan: gerçek telefonda test, paylaşım önizlemesi (LinkedIn Post Inspector), canlı adreste Lighthouse.

## Dosyalar

- Yayın dosyaları: `index.html`, `gizlilik.html`, `404.html`, `css/`, `js/`, `fonts/`, `assets/img/` (portre), `logo.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`, `CNAME`.
- Kaynaklar ve üretim betikleri: `tools/`. `tools/src/` altında okunur CSS/JS; `sh tools/derle.sh` bunları küçültür ve `index.html`i üretir. Tek dosyalık önizleme için `python3 -I tools/onizleme_uret.py`.
- `_kaynak/` Jekyll tarafından yayına alınmaz (alt çizgi ile başlar).

## Kararlar

- Mobilde üst çubuk sabittir (kaydırırken gizlenmez). Menü zemini `.top::before` katmanındadır: `.top` üzerine `backdrop-filter` konursa `position:fixed` mobil menü 84 px'lik çubuğa hapsolur.
- "Ek hizmet" (matbaa ve reklam ürün rayı) kaldırıldı ve geri gelmeyecek.
- Tek kişi fotoğrafı `assets/img/` altındaki onaylı kare portredir; yalnızca "Zihni Selvi kimdir?" bölümünde kullanılır. Paylaşım görseli (`og:image`) 1200×630 `og-image.png` kalır (kare görsel önizlemede kırpılır).
