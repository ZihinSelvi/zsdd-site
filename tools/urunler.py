# ZSDD ürün listesi: Şirin Duba PDF'indeki (72 sayfa) ürün başlıkları ve adlı ürün satırları.
# (ad, kategori, sayfa, kutu) ; kutu=None -> s.1-27 için otomatik sağ sütun; kutu=(x0,y0,x1,y1) sayfa oranları;
# kutu="yt" -> görsel PDF'te tedarikçi markası / üçüncü taraf içerik / renkli zemin taşıdığı için GÖRSEL_YER_TUTUCU
D, B, T, N, BY, BR, LED, DG = "Duba", "Bariyer ve koni", "Tabela ve pano", "Banner ve stand", "Bayrak", "Baskı ve branda", "Led ve fener tabela", "Diğer"
URUNLER = [
 # --- Duba (s.1-19, 22, 65)
 ("Küçük Duba",D,1,None),("Büyük Duba",D,2,None),("Uzun Büyük Duba",D,3,None),("Raket Duba",D,5,None),
 ("Jumbo Duba",D,7,None),("Uzun Jumbo Duba",D,8,None),("Uzun Küçük Duba",D,9,None),("Uzun Raket Duba",D,10,None),
 ("Dikme Duba",D,12,None),("Küçük Başlıklı Dikme Duba",D,13,None),("Raket Başlıklı Dikme Duba",D,14,None),
 ("Ok Duba",D,15,None),("Uzun Ok Duba",D,16,None),("Hacıyatmaz Duba Küçük Başlıklı",D,17,None),
 ("Hacıyatmaz Duba Raket Başlıklı",D,18,None),("Hacıyatmaz Duba Büyük Başlıklı",D,19,None),
 ("Vale Duba",D,22,(.70,.50,.97,.97)),("Master Sign Board Duba",D,65,(.03,.24,.55,.96)),
 # --- Bariyer ve koni
 ("Zincir",B,23,None),("Bariyer Duba",B,24,None),("Bariyer Duba Küçük Başlıklı",B,25,None),
 ("Bariyer Duba Raket Başlıklı",B,26,None),("Uzun Bariyer Duba",B,27,None),
 ("Metal Bariyer",B,38,(.05,.125,.34,.66)),("Bariyer Halatı",B,38,(.38,.15,.66,.38)),
 ("Şerit Bariyer",B,39,(.02,.14,.59,.66)),("Duvar Aparatı",B,39,(.64,.58,.96,.85)),
 ("Delinatör",B,40,(.06,.115,.94,.46)),("Delinatör Başlığı",B,40,(.06,.50,.235,.86)),
 ("Trafik Konisi",B,41,(.06,.125,.94,.67)),
 ("Ezilmez Taban Sabit",B,44,(.57,.02,.96,.27)),("Ezilmez Taban Rulmanlı",B,44,(.08,.35,.45,.55)),
 # --- Tabela ve pano
 ("A Tabela",T,4,None),("Şirin Tabela",T,6,None),("Aç Kapa Tabela",T,11,(.68,.05,.97,.46)),
 ("Rüzgar Tabela",T,28,"yt"),("Yaylı Rüzgar Pano",T,29,(.68,.02,.97,.50)),("Alüminyum A Pano",T,30,(.66,.54,1.0,.97)),
 ("Yer Tipi Poster Pano",T,31,(.66,.04,.98,.47)),("Uzun Yer Tipi Poster Pano",T,32,(.70,.03,.94,.47)),
 ("Çerçeveler",T,33,(.0,.46,.57,.86)),("Menü Panosu",T,66,(.06,.235,.54,.92)),("Wind Pro",T,67,(.07,.17,.39,.92)),
 ("Daire Tabela",T,71,(.205,.215,.375,.365)),("Elips Tabela",T,71,(.205,.415,.375,.563)),
 ("Dikdörtgen Tabela",T,71,(.205,.60,.375,.749)),("Kare Tabela",T,71,(.205,.785,.375,.935)),
 ("Maket Döner Yuvarlak Büyük Model",T,72,(.04,.30,.25,.57)),("Maket Döner Sekizgen Model",T,72,(.25,.30,.46,.57)),
 # --- Led ve fener tabela
 ("Fener Tabela",LED,61,"yt"),("Windpro Işıklı Ledli",LED,60,(.44,.20,.66,.48)),("Buy Max Ledbox",LED,64,(.07,.26,.49,.62)),
 ("50x70 Ahşap Kasa Ledbox",LED,62,"yt"),("Ledbox Baskısı",LED,63,"yt"),
 # --- Banner ve stand
 ("Roll Up",N,34,(.0,.0,.46,.62)),("X Banner Ayarlanabilir",N,35,(.44,.05,.99,.90)),
 ("Tanıtım Standı Oval",N,36,(.03,.0,.265,.68)),("Tanıtım Standı Kare",N,36,(.67,.28,.97,.70)),
 ("Zigzag Broşürlük",N,68,(.07,.27,.30,.96)),("Oval Örümcek Stand",N,69,"yt"),
 # --- Bayrak
 ("Yelken Bayrak Eko",BY,42,"yt"),("Süsleme Bayrak",BY,43,(.12,.12,.88,.62)),("Tören Bayrağı",BY,45,(.39,.12,.615,.58)),
 ("Araç Cam Bayrağı",BY,46,(.03,.20,.50,.46)),("Makam Bayrağı",BY,47,(.18,.22,.86,.63)),
 ("Türk Bayrağı",BY,48,(.03,.12,.67,.53)),("Masa Bayrağı",BY,49,(.04,.20,.36,.52)),
 ("T Masa Bayrağı",BY,49,(.08,.52,.28,.75)),("17'li Türk Ahşap Kaide",BY,49,(.59,.61,.82,.87)),
 # --- Baskı ve branda
 ("Araç Magneti",BR,37,(.0,.10,.57,.50)),("Raket Baskı",BR,50,"yt"),("Billboard Baskı",BR,50,"yt"),
 ("Laminasyon",BR,51,(.04,.33,1.0,.69)),("Yer Laminasyonu",BR,51,(.04,.33,1.0,.69)),
 ("Dijital Baskı Kesim",BR,52,(.04,.22,.82,.50)),("Renkli Folyo Kesim",BR,52,(.04,.22,.82,.50)),
 ("Reflektifli Branda",BR,53,(.10,.19,.44,.50)),("Baskılı Duvar Kağıdı",BR,54,(.46,.35,1.0,.80)),
 ("Işıklı Branda",BR,55,(.0,.43,.44,.93),57),("Mech Branda",BR,55,(.0,.43,.44,.93),57),("Avrupa Branda",BR,55,(.0,.43,.44,.93),57),("Avrupa Branda Arkası Siyah",BR,56,(.0,.43,.44,.93),57),
 ("Folyo Baskı Ekonomik",BR,56,(.0,.43,.44,.93),57),("Folyo Baskı Oracal",BR,56,(.0,.43,.44,.93),57),("One Way Vision",BR,56,(.52,.44,1.0,.68),57),("Şeffaf Folyo",BR,56,(.0,.43,.44,.93),57),
 ("Metrajlı Satış",BR,57,(.0,.43,.44,.93)),("Canvas Tablo",BR,58,(.64,.17,.95,.50)),
 ("Dekota Baskı",BR,59,(.50,.20,.74,.36)),("Kompozit Baskı",BR,59,(.15,.74,.60,.92)),
 # --- Diğer
 ("Kaygan Zemin",DG,20,None),("Fırfır",DG,21,None),
]
WHICH = {11:"first",20:"first",21:"first"}
