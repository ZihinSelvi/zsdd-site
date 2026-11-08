#!/usr/bin/env python3
"""PDF sayfalarından ürün görsellerini kırpar -> images/NN-slug.webp (kare, beyaz zemin, ortalı). Çalıştırma: python3 -I gorselleri_uret.py PDF"""
import sys, os, re, json, subprocess, tempfile
from PIL import Image, ImageChops, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from urunler import URUNLER, WHICH
PDF = sys.argv[1]; OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images"); os.makedirs(OUT, exist_ok=True)
S = 560
def slug(s):
    t = str.maketrans("çğıöşüÇĞİÖŞÜ","cgiosuCGIOSU")
    return re.sub(r"[^a-z0-9]+","-",s.translate(t).lower()).strip("-")
tmp = tempfile.mkdtemp()
def page(n):
    p = os.path.join(tmp, f"p{n}")
    subprocess.run(["pdftoppm","-r","110","-f",str(n),"-l",str(n),"-png","-singlefile",PDF,p],check=True)
    return Image.open(p+".png").convert("RGB")
def nonwhite_bbox(im, thr=24):
    bg = Image.new("RGB", im.size, (255,255,255))
    d = ImageChops.difference(im, bg).convert("L").point(lambda v: 255 if v>thr else 0)
    return d, d.getbbox()
def auto_crop(im, which):
    W,H = im.size
    reg = im.crop((int(.64*W),0,W,int(.93*H)))
    mask,_ = nonwhite_bbox(reg)
    rows = [mask.crop((0,y,mask.width,y+1)).getbbox() is not None for y in range(mask.height)]
    blobs, start, gap = [], None, 0
    for y,r in enumerate(rows):
        if r:
            if start is None: start = y
            gap = 0; end = y
        elif start is not None:
            gap += 1
            if gap > int(.025*H): blobs.append((start,end)); start=None
    if start is not None: blobs.append((start,end))
    blobs = [b for b in blobs if b[1]-b[0] > .08*H]
    b = blobs[0] if which=="first" else blobs[-1]
    return reg.crop((0,b[0],reg.width,b[1]+1))
def to_square(im):
    mask,bb = nonwhite_bbox(im)
    if bb: im = im.crop(bb)
    w,h = im.size; m = int(max(w,h)*.10)
    side = max(w,h)+2*m
    sq = Image.new("RGB",(side,side),(255,255,255)); sq.paste(im,((side-w)//2,(side-h)//2))
    return sq.resize((S,S), Image.LANCZOS)
def border_white(im):
    px = im.resize((56,56)); pts = [px.getpixel((i,j)) for i in range(56) for j in (0,55)]+[px.getpixel((j,i)) for i in range(56) for j in (0,55)]
    return sum(1 for p in pts if min(p)>235)/len(pts) > .97
def placeholder():
    im = Image.new("RGB",(S,S),(255,255,255)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((60,60,S-60,S-60),radius=36,outline=(175,225,251),width=6)
    for cx in (S//2-48, S//2+48):
        d.ellipse((cx-70,S//2-70,cx+70,S//2+70),outline=(175,225,251),width=14)
    return im
cache, meta = {}, []
for i,(ad,kat,pg,box) in enumerate(URUNLER,1):
    fn = f"{i:02d}-{slug(ad)}.webp"; yer = False
    if box == "yt": yer = True; im = placeholder()
    else:
        if pg not in cache: cache[pg] = page(pg)
        P = cache[pg]; W,H = P.size
        crop = auto_crop(P, WHICH.get(pg,"last")) if box is None else P.crop((int(box[0]*W),int(box[1]*H),int(box[2]*W),int(box[3]*H)))
        im = to_square(crop)
        if not border_white(im) and box is not None and False: pass
    im.save(os.path.join(OUT,fn),"WEBP",quality=82,method=6)
    meta.append({"ad":ad,"kat":kat,"sayfa":pg,"dosya":fn,"yer_tutucu":yer})
json.dump(meta, open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"urunler.json"),"w"), ensure_ascii=False, indent=1)
print(len(meta),"ürün,", sum(m["yer_tutucu"] for m in meta),"yer tutucu")
