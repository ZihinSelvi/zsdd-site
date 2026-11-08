# ZSDD ürün listesi: PDF'teki (Şirin Duba, 72 sayfa) ürün başlıklarından çıkarıldı.
# (ad, kategori, sayfa, kutu) ; kutu=None -> sayfa 1-27 için otomatik sağ sütun; kutu=(x0,y0,x1,y1) sayfa oranları
# 'yt' = görsel PDF'te tedarikçi markası/üçüncü taraf içerik taşıdığı için GÖRSEL_YER_TUTUCU kullanılır
D, B, T, N, BY, BR, DG = "Duba", "Bariyer ve koni", "Tabela ve pano", "Banner ve stand", "Bayrak", "Baskı ve branda", "Diğer"
URUNLER = [
 ("Küçük Duba",D,1,None),("Büyük Duba",D,2,None),("Uzun Büyük Duba",D,3,None),("A Tabela",T,4,None),
 ("Raket Duba",D,5,None),("Şirin Tabela",T,6,None),("Jumbo Duba",D,7,None),("Uzun Jumbo Duba",D,8,None),
 ("Uzun Küçük Duba",D,9,None),("Uzun Raket Duba",D,10,None),("Aç Kapa Tabela",T,11,(.68,.05,.97,.46)),("Dikme Duba",D,12,None),
 ("Küçük Başlıklı Dikme Duba",D,13,None),("Raket Başlıklı Dikme Duba",D,14,None),("Ok Duba",D,15,None),
 ("Uzun Ok Duba",D,16,None),("Hacıyatmaz Duba Küçük Başlıklı",D,17,None),("Hacıyatmaz Duba Raket Başlıklı",D,18,None),
 ("Hacıyatmaz Duba Büyük Başlıklı",D,19,None),("Kaygan Zemin",DG,20,None),("Fırfır",DG,21,None),
 ("Vale Duba",D,22,(.70,.50,.97,.97)),("Zincir",B,23,None),("Bariyer Duba",B,24,None),
 ("Bariyer Duba Küçük Başlıklı",B,25,None),("Bariyer Duba Raket Başlıklı",B,26,None),("Uzun Bariyer Duba",B,27,None),
 ("Rüzgar Tabela",T,28,"yt"),("Yaylı Rüzgar Pano",T,29,(.68,.02,.97,.50)),("Alüminyum A Pano",T,30,(.66,.54,1.0,.97)),
 ("Yer Tipi Poster Pano",T,31,(.66,.04,.98,.47)),("Uzun Yer Tipi Poster Pano",T,32,(.70,.03,.94,.47)),
 ("Çerçeveler",T,33,(.0,.46,.57,.86)),("Roll Up",N,34,(.0,.0,.46,.62)),("X Banner Ayarlanabilir",N,35,(.44,.05,.99,.90)),
 ("Tanıtım Standı",N,36,(.03,.0,.265,.68)),("Araç Magneti",BR,37,(.0,.10,.57,.50)),("Metal Bariyer",B,38,(.05,.125,.34,.66)),
 ("Şerit Bariyer",B,39,(.02,.14,.59,.66)),("Delinatör",B,40,(.06,.115,.94,.46)),("Trafik Konisi",B,41,(.06,.125,.94,.67)),
 ("Yelken Bayrak Eko",BY,42,"yt"),("Süsleme Bayrak",BY,43,(.12,.12,.88,.62)),("Ezilmez Taban",B,44,(.57,.02,.96,.27)),
 ("Tören Bayrağı",BY,45,(.39,.12,.615,.58)),("Araç Cam Bayrağı",BY,46,(.03,.20,.50,.46)),("Makam Bayrağı",BY,47,(.18,.22,.86,.63)),
 ("Türk Bayrağı",BY,48,(.03,.12,.67,.53)),("Masa Bayrağı",BY,49,(.04,.20,.36,.52)),
 ("Raket Baskı",BR,50,"yt"),("Billboard Baskı",BR,50,"yt"),
 ("Laminasyon",BR,51,(.04,.33,1.0,.69)),("Kesim",BR,52,(.04,.22,.82,.50)),("Reflektifli Branda",BR,53,(.10,.19,.44,.50)),
 ("Baskılı Duvar Kağıdı",BR,54,(.46,.35,1.0,.80)),("5 Mt. Baskı",BR,55,"yt"),("Fason Dijital Baskı",BR,56,"yt"),
 ("Metrajlı Satış",BR,57,(.0,.43,.44,.93)),("Canvas Tablo",BR,58,(.64,.17,.95,.50)),
 ("Dekota",BR,59,(.50,.20,.74,.36)),("Kompozit",BR,59,(.15,.74,.60,.92)),
 ("Windpro Işıklı Ledli",T,60,(.44,.20,.66,.48)),("Fener Tabela",T,61,"yt"),("Ledbox Baskısı",BR,63,"yt"),
 ("Buy Max Ledbox",T,64,(.07,.26,.49,.62)),("Master Sign Board Duba",D,65,(.03,.24,.55,.96)),
 ("Menü Panosu",T,66,(.06,.235,.54,.92)),("Wind Pro",T,67,(.07,.17,.39,.92)),("Zigzag Broşürlük",N,68,(.07,.27,.30,.96)),
 ("Oval Örümcek Stand",N,69,"yt"),("Hazır Tabela",T,71,(.19,.20,.42,.88)),("Maket Döner",T,72,(.04,.30,.46,.57)),
]
WHICH = {11:"first",20:"first",21:"first"}  # otomatik sütunda hangi görsel (varsayılan: son = kırmızı varyant)
