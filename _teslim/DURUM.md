# ZSDD site: proje durumu (8 Kasım 2026 oturumu sonu)

Dal: `claude/confident-ritchie-vjbrlq` (PR açılmadı). Canlı alan adı: zihniselvidijitaldanismanlik.com (GitHub Pages, `CNAME` hazır).

## Zihni'nin onayladığı / verdiği bilgiler
- WhatsApp: +90 533 221 89 61 (`wa.me/905332218961`). Hazır mesajlar `tools/site_uret.py` içinde.
- LinkedIn: https://www.linkedin.com/in/zihni-selvi/ (Zihni verdi)
- Instagram `instagram.com/selvizihni/`, Facebook `facebook.com/zihniselvidijitaldanismanlik/`: açık aramayla bulundu, Zihni itiraz etmedi.
- Çalışma saatleri: "7/24 mesaj bırakabilirsiniz." Ünvan/vergi, yanıt süresi, iletişimde telefon ve sosyal medya satırı: kaldırıldı (sosyal medya yalnızca altbilgide).
- 2014–2023 boşluğu: "Açıkhava reklam işletmesi (HAYDETAY Reklamcılık Dijital Baskı Hizmetleri) faaliyetleri".
- Profil fotoğrafı: `images/zihni-selvi.webp` (orijinal `_kaynak/profil-foto-kaynak.jpg`).
- Tedarikçi bilgisi (Şirin Duba/Şirin Reklam adı, logo, telefonlar, e-posta, fiyat, iskonto) sitede gösterilmeyecek: Zihni "DOĞRU" dedi.
- Zihni'nin bilgisayarında Windows "animasyonları göster" kapalıydı; açınca animasyonlar çalıştı. Tarayıcı: Chrome.

## Yarına kalan
1. **Ürün yelpazesi** (Zihni yarına bıraktı): şu an 92 ürün, 8 kategori + "Tümü". Gözden geçirilecek: görsel yer tutucular (8 ürün: Rüzgar Tabela, Yelken Bayrak Eko, Raket Baskı, Billboard Baskı, Fener Tabela, 50x70 Ahşap Kasa Ledbox, Ledbox Baskısı, Oval Örümcek Stand), branda/folyo türlerinde tekrar eden rulo fotoğrafı, "Şirin Tabela" adı, ürün adlandırması ("Canvas Tablo", "Dekota" PDF'teki gibi).
2. Açık kararlar: "ben" dili ("Nasıl çalışıyorum?", "Başlangıç ürünümüz" → "ürünüm"?), "Demo isteyin" mesajı, telefondaki ₺350 örnek fiyat, LinkedIn/Instagram/Facebook onayı.
3. Kalan yer tutucu: `LOGO_YER_TUTUCU` (resmî vektör logo; şimdiki `logo.svg` taslaktaki yaylardan çizildi), `GÖRSEL_YER_TUTUCU` (yukarıdaki 8 ürün).
4. Yayın öncesi: gizlilik metni hukuki inceleme; `_kaynak/` içindeki tedarikçi PDF'ini depo herkese açılmadan çıkar; Lighthouse'u canlı alan adında yeniden ölç; 404 `<base href="/">` kök dizin ister.

## Teknik notlar
- Kaynak: `tools/src/style.css`, `tools/src/main.js`, `tools/index.template.html`, `tools/urunler.py` (ürün listesi), `tools/gorselleri_uret.py` (PDF → WebP), `tools/site_uret.py` (index.html üretir), `tools/onizleme_uret.py` (tek dosyalık önizleme).
- Üretim sırası: `esbuild tools/src/style.css --minify --outfile=css/style.css` ve aynısı `main.js` için; sonra `python3 -I tools/site_uret.py`; sonra `python3 -I tools/onizleme_uret.py`.
- Ders: önizleme dosyasını depo klasörü dışında (boş klasörde) test et; küçültülmüş CSS'te `url()` tırnaksızdır.
- Animasyon: halka döngüsü `tools/src/main.js` sonunda; `prefers-reduced-motion` açıkken halkalar sabit/soluk, nabız durur (bilerek). Yaklaşım kelime ağırlığı JS ile satır içi yazılır.
- Son ölçüm: Lighthouse mobil 94–97 / 100 / 100 / 100, masaüstü 100 / 100 / 100 / 100 (yerel sunucu).

## 12 Kasım 2026 oturumu
- Mobil üst çubuk (header) sabit: kaydırırken gizlenme (`is-hidden`) kaldırıldı; `overflow-x:clip` eklendi.
- Mobil menü (iki çizgi) kaydırılmış sayfada açılmıyordu: `.top` üzerindeki `backdrop-filter` `position:fixed` menüyü 84 px'e hapsediyordu. Zemin `.top::before` katmanına taşındı. Menüdeki "İletişim" düğmesinin iç boşluğu da düzeltildi.
- **Ek hizmet (Matbaa ve reklam / ürün rayı) şimdilik kaldırıldı**: bölüm, menü bağlantısı, ilgili CSS/JS ve `site_uret.py` kısmı. `tools/urunler.json`, `tools/urunler.py`, `images/` ve ürün görselleri geri dönüş için duruyor; bölümün eski hâli git geçmişinde (`tools/index.template.html`).
- Bu yüzden "Yarına kalan" listesindeki ürün yelpazesi maddeleri (görsel yer tutucular, adlandırma) şimdilik askıda.
- Portre: "Zihni Selvi kimdir?" bölümüne onaylı kare portre (`assets/img/`, webp + jpg yedek, `<picture>`) kondu; eski `images/zihni-selvi.webp` silindi. Kare portre JSON-LD `Person` kaydına eklendi. `og:image` bilerek 1200×630 `og-image.png` kaldı (kare görsel paylaşım önizlemesinde kırpılır). 375 px ve 1440 px'te yüz kırpılmıyor.
