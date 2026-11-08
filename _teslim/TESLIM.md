# ZSDD site revizesi: teslim

Kaynak taslak: Artifact "Zihni Selvi Dijital Danışmanlık" (7 Kasım), `_kaynak/ZSDD-site-onizleme.html`. Ürün tablosu (92 ürün, 9a karşılaştırması): `URUN-TABLOSU.md`.

## Yer tutucular
| Yer tutucu | Nerede | Kimden istenecek |
|---|---|---|
| LINKEDIN_URL | iletişim, altbilgi, "Zihni Selvi kimdir" düğmesi, JSON-LD `sameAs` | Zihni: doğru profil. Aramada iki "Zihni Selvi" profili çıktı (`/in/zihni-selvi-3a95487a`, `/in/zihni-selvi-89b0a663`), hangisinin sizin olduğunu bilemedim |
| Instagram, Facebook (yer tutucu değil, onay bekliyor) | aynı yerler | Açık aramayla bulundu: `instagram.com/selvizihni/` ("Zihni Selvi | Dijital Danışman"), `facebook.com/zihniselvidijitaldanismanlik/`. Zihni onaylayacak |
| LOGO_YER_TUTUCU | `logo.svg` (taslaktaki 12 yaydan çizilen şeffaf halka), `logo-512.png`, favicon, `apple-touch-icon.png`; altbilgideki yazılı logo HTML ile kurulu | Zihni: resmî vektör logo (SVG/AI) |
| PORTRE_YER_TUTUCU | "Zihni Selvi kimdir" bölümü | Zihni: portre fotoğrafı |
| BOŞLUK_METNİ | Zaman çizelgesi, 2014–2023 kartı | Zihni: tek cümle |
| SAAT_YER_TUTUCU | İletişim bölümü, JSON-LD `openingHours` | Zihni |
| YANIT_SÜRESİ_YER_TUTUCU | İletişim bölümü | Zihni |
| ÜNVAN_VERGİ_YER_TUTUCU | Altbilgi, gizlilik.html | Zihni / muhasebe |
| GÖRSEL_YER_TUTUCU (8 ürün) | Rüzgar Tabela, Yelken Bayrak Eko, Raket Baskı, Billboard Baskı, Fener Tabela, 50x70 Ahşap Kasa Ledbox, Ledbox Baskısı, Oval Örümcek Stand | Zihni: kendi ürün fotoğrafı. PDF'teki fotoğraflarda tedarikçi logosu, üçüncü taraf afişi (telefon numarası dahil) ya da renkli zemin vardı |

## Kontrast (WCAG)
| Çift | Taslak | Yeni |
|---|---|---|
| Düğme: koyu lacivert yazı / #139ed5 zemin | 4,22:1 | kaldırıldı |
| Düğme: koyu lacivert yazı / #afe1fb zemin | | **9,20:1** |
| Düğme hover: koyu lacivert / beyaz | | 12,89:1 |
| Beyaz düğme: #014aad / beyaz | 8,13:1 | 8,13:1 |
| Küçük yazı (eyebrow, iletişim etiketi) #139ed5 / #033260 | 4,22:1 | #afe1fb ile **9,20:1** |
| Eyebrow açık mavi zeminde (#014aad / #afe1fb) | | 5,80:1 |
| Eyebrow beyaz zeminde (#014aad / beyaz) | | 8,13:1 |
| Lead #afe1fb / #033260 | 9,20:1 | 9,20:1 |
| Lead #afe1fb / #014aad | 5,80:1 | 5,80:1 |
| Hero lead, en parlak halka (opaklık .28) üstünde | 1,74:1 (halka .70 opak) | **4,54:1** |
| Hero beyaz başlık, en parlak halka üstünde | 2,44:1 | 6,37:1 |
| Hero çizgili başlık (iri yazı) #139ed5 / #033260 | 4,22:1 | 4,22:1 (iri yazı; 3:1 eşiği) |

## Lighthouse (yerel sunucu, Chromium, Lighthouse CLI; ham raporlar `lighthouse/`)
| Sayfa | Performans | Erişilebilirlik | En iyi uygulamalar | SEO |
|---|---|---|---|---|
| index.html (mobil) | 96–97 | 100 | 100 | 100 |
| index.html (masaüstü) | 100 | 100 | 100 | 100 |
| gizlilik.html (mobil) | 100 | 100 | 100 | 100 |
| 404.html (mobil) | 100 | 100 | 100 | 58* |

\* 404 sayfasında SEO düşüktür: yerel sunucu 404 yerine 200 döner ve sayfa bilerek `noindex`. GitHub Pages 404 durum kodunu kendisi verir.
Ölçüm yerel sunucuda yapıldı; gerçek alan adında önbellek başlıklarını GitHub Pages belirler (Lighthouse "cache" uyarısı buradan gelir). Canlıya çıkınca yeniden ölçülmeli.

## Ölçülen davranışlar
- 1440 ve 390 px: yatay kaydırma yok (`scrollWidth = innerWidth`), konsol hatası yok.
- Logo animasyonu (masaüstü, imleç): girişten ~2,8 sn sonra bütün, 1 sn bekleme, 2,5 sn'de ease-out solma, sonra `visibility:hidden`. Halkalar görünmezken halka rAF döngüsü sayaçla doğrulandı: durur (514 → 514 çağrı). İmleç yeniden girince dağınık başlar, aynı şekilde toplanır ve solar. Hero lead kalınlığı 700'de kalır, geri dönmez.
- Dokunmatik: bekle (0,9 sn) → topla (2,8) → tut (1) → sol (2,5) → 3,5 sn görünmez (rAF yok) → döngü yeniden. Dokunuş toplanmayı başlatır.
- `prefers-reduced-motion`: halkalar sabit ve soluk (%55 grup opaklığı), rAF yok, lead kalınlığı 500.
- Menü: açıkken odak tuzağı (Tab/Shift+Tab döner), Esc kapatır ve odağı düğmeye verir, `main`/altbilgi `inert`.
- Kategori seçici: Tümü 92 / Duba 18 / Bariyer ve koni 14 / Tabela ve pano 17 / Led ve fener tabela 5 / Banner ve stand 6 / Bayrak 9 / Baskı ve branda 21 / Diğer 2. Açılışta "Tümü" seçili.
- Yaklaşım: imleç kelimenin (Teşhis, Saha, Kanıt, Bakış) ve "İddia yerine" başlığının üstüne gelince ince yazı kalınlaşır (wght 900, wdth 75); kaydırmayla ağırlık değişimi de sürer.

## Yapmadıklarım ya da emin olmadıklarım
1. **Anlatıcı dili:** Taslakta ve verdiğiniz 4 adım metninde "biz/-ız" vardı. Kimlik kuralınız (tek kişi) gereği bütün metni "ben"e çevirdim; bölüm başlığı "Nasıl çalışıyorum" oldu (sizin yazdığınız "Nasıl çalışıyoruz" değil). "Başlangıç ürünümüz" etiketini yazdığınız gibi bıraktım; "-ümüz" çoğul takısı taşıyor, isterseniz "Başlangıç ürünüm" yapılır.
2. **"Gölge mod":** "önce taslak, siz onaylayın" yapıldı (liste maddesi ve telefondaki taslak etiketi).
3. **Örnek fiyat:** Telefondaki "₺350" bir örnektir, "(örnek)" etiketi ve altında not var. Gerçek bir fiyat değil.
4. **"Demo isteyin" mesajı** benim yazdığım: "Merhaba, WhatsApp Hızlı Yanıt Sistemi için demo istiyorum." Onaylayın ya da değiştirin.
5. **Fener Tabela, Kampanya:** s.61 ve s.70 tek ürün sayıldı; s.62 "Kampanya" sayfası "50x70 Ahşap Kasa Ledbox" adıyla eklendi (kampanya fiyatı yazılmadı).
6. **"Şirin Tabela"** PDF'teki ürün adıdır ve tedarikçi adını (Şirin) içerir. Kuralınız gereği ürün adı PDF'teki gibi bırakıldı; sizin kararınız: ad kalsın mı, "Geniş Tabela" gibi başka bir ad mı?
7. **Ürün görselleri:** 84 PDF fotoğrafı, 8 yer tutucu. Branda ve folyo baskı türlerinin görseli s.57'deki rulo fotoğrafıdır (aynı fotoğraf birkaç kartta). Hepsi 560×560, beyaz zemin, ortalı WebP. Fotoğraflar PDF'ten kırpıldı (CMYK'dan dönüşüm, düşük çözünürlüklü olabilir); bazı fotoğrafların içinde küçük ölçü yazıları, "Summa" makine markası ve "FİRMA LOGO" örnek yazısı var. Sitede fiyat ya da tedarikçi bilgisi bulunmadığını görsel levhayla taradım, ama piksel düzeyinde bir OCR taraması yapmadım.
8. **PDF'te ZSDD'ye ait olmayan bilgiler (9e):** Şirin Duba/Şirin Reklam adı ve logosu, 0212 653 44 94, 0501 347 46 40, 0533 065 90 26, 0552 653 44 94, 444 70 65, 0532 394 37 80, sirinduba@hotmail.com, fiyatlar (₺, $, €) ve %10 çuval iskontosu. Hiçbiri sitede yok. Bunlar bu depodaki `_kaynak/sirin-duba-urunler.pdf` içinde duruyor; alt çizgili klasör Jekyll ile yayına girmez, yine de depoyu herkese açacaksanız PDF'i çıkarın.
9. **Gizlilik metni** KVKK'ya uygun kısa bir taslak; hukuki inceleme yapılmadı. Saklama süresi için sayı yazmadım ("görüşmenin gerektirdiği süre"). Çerez ve analitik yoktur; bunu açıkça yazdım. Barındırma (GitHub Pages) ve dış bağlantılar da belirtildi.
10. **Telefon:** `tel:` bağlantısı WhatsApp numaranız (+90 533 221 89 61). Ayrı bir telefon varsa söyleyin.
11. **404.html** `<base href="/">` kullanır (herhangi bir derinlikte açılabildiği için); alan adı kökte çalıştığı sürece sorunsuz. `github.io/zsdd-site` altında önizlenirse stil yüklenmez. Diğer tüm yollar göreli.
12. **Sistemi inceleyin** düğmesi taslaktaki dış adrese (`zihinselvi.github.io/fiyat-botu`) gidiyor, değiştirmedim.
13. **Lighthouse'u canlı alan adında çalıştırmadım**; yerel ölçüm. JSON-LD `openingHours` şu an yer tutucu değer içerir (geçerli şema için gerçek saat gelince doldurulmalı).
14. **Yazı tipi:** Anybody ve Instrument Sans npm paketinden (`@fontsource-variable`, OFL) indirilip `fonts/` içine gömüldü; Google'a istek yok. Siz açıkça onay vermeden indirdim; istemezseniz kendi woff2 dosyalarınızla değiştirilir.
15. Ürün rayı "Teklif isteyin" bağlantıları her kartta ayrı (WhatsApp, hazır mesaj "Merhaba, [ürün adı] için teklif almak istiyorum."). Bölüm altında ayrı bir düğme eklemedim.
