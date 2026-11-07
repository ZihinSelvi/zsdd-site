# ZSDD internet sitesi

Zihni Selvi Dijital Danışmanlık (ZSDD) tanıtım sitesi. Alan adı: `zihniselvidijitaldanismanlik.com` (Cloudflare Registrar, 3 Kasım 2026'da 1 yıllığına alındı).

**Durum (7 Kasım 2026):** İçerik ve tasarım tamam, **henüz yayında değil**. Çalışma dalı `claude/beautiful-feynman-24czog`, `main`'e alınmadı.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Tek sayfa: hero, hizmet bandı, ana hizmet, WhatsApp sistemi, yaklaşım, ek hizmet (ürün rayı), iletişim |
| `styles.css` | Tüm stil. Renk jetonları `:root` içinde |
| `script.js` | Hareketler: nabız çizgisi, dağınık logo halkaları, WhatsApp örnek akışı, ürün rayı, imleç/mıknatıs, kaydırma |
| `assets/logo.png` | ZSDD logosu (kullanıcının gönderdiği özgün görsel, değiştirilmedi) |
| `assets/urunler/` | Ek hizmet kartlarının fotoğrafları |
| `favicon.png`, `apple-touch-icon.png` | Logodan üretildi |

Derleme adımı yok, saf HTML/CSS/JS. Yazı tipleri Google Fonts'tan gelir.

## Kararlar

- **Renkler:** yalnızca marka kiti: `#033260`, `#014aad`, `#139ed5`, `#afe1fb`, beyaz. Sarı yok. Mavi (`#139ed5`) yalnızca vurgu, çizgi ve düğme.
- **Yazı tipi:** Başlıklar **Anybody** (ağırlık ve genişlik ekseni), gövde **Instrument Sans**. ZSDD tasarım sistemi hâlâ Bricolage Grotesque diyor; kullanıcı siteyi serbest bıraktı. Sosyal medya kapaklarıyla ayrışmaması için tasarım sistemindeki yazı tipi satırı güncellenmeli (henüz yapılmadı).
- **Dil:** "biz" dili (kullanıcı kararı). Sitede müşteri referansı, çalışan sayısı ya da ekip izlenimi veren bir ifade yok. WhatsApp sistemi için "demo olarak kurduk" yazıyor.
- **Ek hizmet (matbaa ve reklam):** yalnızca ürün başlığı ve fotoğraf. Fiyat yok (ŞİRİN Reklam kataloğundaki fiyatlar toptan ve KDV hariç). "Branda ve folyo baskı" kartı ilk sırada, fotoğrafı kullanıcının kendi çektiği gerçek baskı anı.
- **Logo davranışı:** Hero ve iletişimdeki dağınık halkalar logonun gerçek geometrisinden (12 yay) çıkarıldı. İmleç üzerine gelince parçalar halkaları boyunca sırayla yerine oturur, boyut sabit kalır, hero paragrafı bold olur. Telefonda kendiliğinden döngü, dokunuşla toplama.
- **Hareket azaltma:** Tarayıcı "animasyonu azalt" dese bile nabız noktası ve halka toplanması çalışır (kullanıcı kararı). Kayan bant ve kaydırma efektleri kapanır.
- **Kaldırılanlar:** "Dijital Temsilcilik" etiketi (anlamı belirsizdi), "Haritada aç" bağlantısı, "Şeffaf olalım" kutusu (siteye ait olmayan dahili not gibiydi).

## Gizli tanı göstergesi

Sayfanın en üstündeki logoya 5 kez hızlı dokunun ya da adresin sonuna `#tani` ekleyin. Ekran altında fps, `reduce`, `fine` ve her halkanın birleşme oranı görünür. Telefonda halkalar takılırsa ekran görüntüsü buradan alınır.

## Açık işler

1. **Yayın (en son iş, kullanıcı "başla" demeden yapılmaz).** Sıra önemli: DNS siteden önce girilmez (alan adı ele geçirme riski).
   1. Dalı `main`'e al, GitHub Pages'i aç (`Settings → Pages`).
   2. GitHub'da alan adı doğrulaması: `Settings → Pages → Verified domains`, çıkan TXT kaydını Cloudflare DNS'e ekle.
   3. Cloudflare DNS: `@` için dört A kaydı `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` için CNAME → `zihinselvi.github.io`. Hepsi "DNS only" (gri bulut).
   4. Pages'te custom domain'i gir, "Enforce HTTPS"i aç.
2. Tasarım sistemindeki yazı tipi satırını Anybody ve Instrument Sans'a güncelle (ya da siteyi Bricolage'a döndür).
3. İsteğe bağlı: ürün fotoğrafındaki restoran işine ait kısmi telefon numarasını bulanıklaştır.
4. İsteğe bağlı: matbaa ürünleri için tedarikçi kataloğundan alınan fotoğrafları (reklam dubaları, tabelalar vb.) kendi fotoğraflarınla değiştir.
5. Logodaki mavi, marka kitindeki maviden biraz farklı (`#39b5ff` civarı). Site kit renklerinde kaldı, logo olduğu gibi kullanıldı.

## İletişim bilgileri (sitede)

E-posta `zihni@zihniselvidijitaldanismanlik.com`, WhatsApp `+90 533 221 89 61`, adres: Anadolufeneri Mahallesi, Fener Caddesi No:20, Beykoz, İstanbul.
