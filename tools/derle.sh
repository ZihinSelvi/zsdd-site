#!/bin/sh
# Okunur kaynaklar tools/src/ içinde; yayımlanan küçültülmüş dosyalar css/ ve js/ içinde.
# Kullanım: sh tools/derle.sh   (esbuild gerekir: npx esbuild)
cd "$(dirname "$0")/.." || exit 1
npx esbuild tools/src/style.css --minify --outfile=css/style.css
npx esbuild tools/src/main.js --minify --outfile=js/main.js
python3 -I tools/site_uret.py
