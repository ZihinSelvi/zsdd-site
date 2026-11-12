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

## 12 Kasım 2026 oturum sonu: yayın durumu
**Site henüz canlı değil.** Kalan tek iş DNS.
- `main`'e temiz sürüm gönderildi (tedarikçi PDF'i, `_teslim/`, eski profil fotoğrafı ve `URUN-ENVANTERI.md` içermez). **Bu dalı olduğu gibi `main`'e birleştirme**: bu dosyalar herkese açık geçmişe girer. Yeni iş gerekirse dosyaları `main`'e seçerek taşı (aynı yöntem: `main` üzerine yeni commit, ağaç = dal ağacı eksi bu yollar).
- GitHub Pages **açıldı**: Settings → Pages → `main` / `(root)`. Custom domain `zihniselvidijitaldanismanlik.com` kayıtlı, durum "DNS check unsuccessful (NotServedByPagesError)" çünkü A kayıtları yok. "Enforce HTTPS" DNS çözülünce açılır.
- **Cloudflare DNS henüz eklenmedi**: 12 Kasım akşamı Cloudflare paneli "temporarily unavailable" verdi. Eklenecekler (hepsi gri bulut / DNS only):
  - A, `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - CNAME, `www` → `zihinselvi.github.io` (GitHub kullanıcı adı `zihinselvi`, alan adı `zihniselvi...`: yazım farkına dikkat)
  - GitHub alan adı doğrulaması (Settings → Pages → Verified domains) istenirse çıkan TXT kaydı da eklenir.
  - `@` için eski A/AAAA kaydı varsa sil.
- DNS sonrası kontrol: Pages sayfasında "Check again" → "Enforce HTTPS" işaretle → telefonda aç, paylaşım önizlemesi (LinkedIn Post Inspector), `www` yönlendirmesi, Lighthouse.
- Claude oturumunun ağ izni (Default ortam) `zihniselvidijitaldanismanlik.com`, `www` ve `zihinselvi.github.io` için açıldı; canlı kontrol bu oturumdan yapılabilir.
- Yayın öncesi açık: gizlilik metninin hukuki incelemesi.
- Diğer repo: `ZihinSelvi/sosyal-medya` içinde `claude/laughing-maxwell-j1j7ky` dalındaki 400'lük portre dosyaları hâlâ `main`'e alınmadı (siteyi etkilemez).
- Askıdaki: Ek hizmet (ürün yelpazesi) geri getirilecekse `tools/urunler.json` ve git geçmişindeki bölüm kullanılır; görsel yer tutucular ve adlandırma kararları açık.

## 12 Kasım 2026, ek karar ve değişiklikler
- **Ek hizmet geri gelmeyecek** (Zihni kararı). `images/` (92 ürün görseli), `tools/urunler.json`, `tools/urunler.py`, `tools/gorselleri_uret.py` silindi. "Ek hizmet geri gelirse" ve "görsel yer tutucular" maddeleri geçersiz.
- **Tedarikçi konusu kapandı** (Zihni: sitede yok, unut). Yukarıdaki "dalı olduğu gibi main'e birleştirme" uyarısı artık zorunlu değil; istenirse kaldırılır.
- **Gizlilik metni** (`gizlilik.html`) çok küçük işletmeye uygun, KVKK m.10 unsurlarını (veri sorumlusu, veri/yöntem/amaç/hukuki sebep, saklama süresi 2 yıl, aktarım ve yurt dışı, haklar, başvuru ve 30 gün yanıt, Kurul'a şikâyet) kapsayacak biçimde yeniden yazıldı. Avukat incelemesi yapılmadı (Zihni: zaman ve bütçe yok); metin hukuki görüş yerine geçmez. Saklama süresi **2 yıl, Zihni onayladı** (12 Kasım). Pratikte: talebi sonuçlanan yazışmalar (WhatsApp, e-posta, arama kayıtları) 2 yıl sonra silinir; kanunen saklanması gereken fatura/sözleşme belgeleri hariç.

## 12 Kasım 2026 gece: SİTE CANLI
- Cloudflare DNS eklendi (hepsi DNS only): `@` için dört A kaydı (185.199.108–111.153), `www` CNAME → `zihinselvi.github.io`.
- GitHub Pages: DNS check successful, "Enforce HTTPS" işaretli. https://zihniselvidijitaldanismanlik.com/ 200 (güncel sürüm, yeni portre, yeni gizlilik metni); `www` → ana adrese 301; olmayan sayfa 404.html gösteriyor.
- Kalan: telefonda gerçek cihaz testi (menü, sabit header), paylaşım önizlemesi (LinkedIn Post Inspector, WhatsApp), Lighthouse'u canlı adreste ölç. "Yarına kalan/DNS" maddeleri tamamlandı.
- Değişiklik akışı: kaynaklar `tools/src/`; `sh tools/derle.sh`; sonra `main`'e gider (Pages `main`'den yayınlar, birkaç dakikada günceller).

## 12 Kasım 2026, demo çelişkisi düzeltildi
- WhatsApp demosunda "Taslak yanıt / Onayla ve gönder" adımı vardı, oysa gerçek sistem onay beklemeden hemen yanıt gönderiyor. Düzeltildi: demo artık soru → yazıyor göstergesi → "Otomatik yanıt · hemen gönderildi". Madde listesi ve ekran okuyucu etiketi de güncellendi ("Onay beklemeden, hemen otomatik yanıt gönderir", "Müşteri beklemez, siz işinize bakarsınız"). Sitede "taslak/onay" ifadesi kalmadı. "Sistemi inceleyin" sayfasında bu çelişki yoktu.
- Zihni onayladı (12 Kasım): "Müşteri beklemez, siz işinize bakarsınız" maddesi kalıyor. Canlı kontrol: tüm dosyalar 200, 404 sayfası çalışıyor, og/canonical doğru, sitemap tarihi 12 Kasım'a çekildi. Lighthouse bu ortamda yok; telefonda ya da PageSpeed Insights ile ölçülebilir.
