#!/usr/bin/env python3
"""index.html + css + js + yazı tipleri + görseller -> _teslim/ZSDD-site-onizleme-v2.html (tek dosya, hiçbir dış dosyaya bağımlı değil)"""
import re, base64, sys
def b64(path, mime): return f"data:{mime};base64,"+base64.b64encode(open(path,'rb').read()).decode()
h=open('index.html',encoding='utf8').read(); css=open('css/style.css',encoding='utf8').read()
css,n=re.subn(r'url\(["\']?\.\./fonts/([^)"\']+)["\']?\)', lambda m: 'url("'+b64('fonts/'+m.group(1),'font/woff2')+'")', css)
assert n==4 and '../fonts' not in css, n
js=open('js/main.js',encoding='utf8').read(); h=re.sub(r'<link rel="preload"[^>]*>\n','',h)
h=h.replace('<link rel="stylesheet" href="css/style.css">','<style>'+css+'</style>').replace('<script src="js/main.js" defer></script>','<script>'+js+'</script>')
h=h.replace('src="logo.svg"','src="'+b64('logo.svg','image/svg+xml')+'"')
def _img(m):
    f=m.group(1); mime='image/webp' if f.endswith('.webp') else 'image/jpeg'
    return b64('assets/img/'+f,mime)
h=re.sub(r'assets/img/([\w.-]+\.(?:webp|jpg))', _img, h)
assert 'src="images/' not in h and 'assets/img/' not in h and 'href="css/' not in h and 'src="js/' not in h and '../fonts' not in h
open('_teslim/ZSDD-site-onizleme-v2.html','w',encoding='utf8').write(h); print(len(h)//1024,'KB')
