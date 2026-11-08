(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var hasIO = 'IntersectionObserver' in window;

  var yil = $('#yil'); if (yil) yil.textContent = new Date().getFullYear();

  /* açılış */
  var hero = $('.hero');
  function loaded() { if (hero) hero.classList.add('is-loaded'); }
  window.addEventListener('load', function () { requestAnimationFrame(loaded); });
  setTimeout(loaded, 1200);

  /* beliren öğeler, kardeşler arasında sıralı gecikme */
  var rv = $$('.rv');
  rv.forEach(function (el) {
    var sibs = $$('.rv', el.parentElement).filter(function (x) { return x.parentElement === el.parentElement; });
    el.style.setProperty('--d', (Math.min(sibs.indexOf(el), 6) * 0.09) + 's');
  });
  if (hasIO) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* menü: açıkken odak tuzağı, Esc ile kapanır ve odak düğmeye döner */
  var top = $('#top'), nav = $('#nav'), tgl = $('.nav-toggle');
  var inertTargets = [$('main'), $('.foot'), $('.skip')];
  function setOpen(o) {
    nav.classList.toggle('is-open', o);
    tgl.setAttribute('aria-expanded', String(o));
    doc.style.overflow = o ? 'hidden' : '';
    inertTargets.forEach(function (n) { if (n) { if (o) n.setAttribute('inert', ''); else n.removeAttribute('inert'); } });
    if (o) { var f = $('a', nav); if (f) f.focus(); }
  }
  function isOpen() { return nav.classList.contains('is-open'); }
  tgl.addEventListener('click', function () { setOpen(!isOpen()); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a') && isOpen()) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape') { setOpen(false); tgl.focus(); return; }
    if (e.key === 'Tab') {
      var items = $$('a', nav).concat([tgl]), i = items.indexOf(document.activeElement);
      if (e.shiftKey) { if (i <= 0) { e.preventDefault(); items[items.length - 1].focus(); } }
      else if (i === items.length - 1 || i === -1) { e.preventDefault(); items[0].focus(); }
    }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) { if (m.matches && isOpen()) setOpen(false); });

  /* kaydırma: ilerleme, üst çubuk, sütun ağırlığı */
  var bar = $('.progress i'), lastY = 0, ticking = false;
  var pillars = $$('[data-weight]');
  function frame() {
    ticking = false;
    var y = window.scrollY, h = doc.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    top.classList.toggle('is-solid', y > 40);
    top.classList.toggle('is-hidden', y > 240 && y > lastY + 4 && !isOpen());
    if (y < lastY - 4 || y < 240) top.classList.remove('is-hidden');
    lastY = y;
    var vh = window.innerHeight;
    pillars.forEach(function (el) {
      var r = el.getBoundingClientRect(), c = r.top + Math.min(r.height, 220) / 2;
      var p = 1 - Math.abs(c - vh * 0.55) / (vh * 0.42);
      p = Math.max(0, Math.min(1, p));
      el.style.setProperty('--p', reduce ? 1 : p.toFixed(3));
    });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', frame);
  frame();

  /* nabız çizgisi: önce çizilir, sonra bir nokta üzerinde gezer; ekran dışındayken durur */
  var path = $('#pulsePath'), psvg = path && path.ownerSVGElement;
  if (path && psvg) {
    var dot = document.createElement('i'); dot.className = 'pulse__dot'; psvg.parentNode.appendChild(dot);
    var run = false, elapsedBase = 0, startAt = 0;
    var pulseVis = true;
    var place = function (f) {
      var pt = path.getPointAtLength(path.getTotalLength() * f), r = psvg.getBoundingClientRect(), hr = psvg.parentNode.getBoundingClientRect();
      var s = Math.max(r.width / 1600, r.height / 200);
      dot.style.left = (r.left - hr.left + (r.width - 1600 * s) / 2 + pt.x * s) + 'px';
      dot.style.top = (r.top - hr.top + (r.height - 200 * s) / 2 + pt.y * s) + 'px';
    };
    var step = function (t) {
      if (!pulseVis) { run = false; elapsedBase += t - startAt; return; }
      var e = (elapsedBase + (t - startAt)) / 1000;
      if (reduce) { path.style.strokeDashoffset = 0; place(0.5); dot.style.opacity = 1; run = false; return; }
      if (e < 2.6) { var f = 1 - Math.pow(1 - e / 2.6, 3); path.style.strokeDashoffset = 1 - f; dot.style.opacity = 1; place(f); }
      else { path.style.strokeDashoffset = 0; place(((e - 2.6) % 6) / 6); dot.style.opacity = 1; }
      requestAnimationFrame(step);
    };
    var startPulse = function () { if (run) return; run = true; startAt = performance.now(); requestAnimationFrame(step); };
    setTimeout(startPulse, 500);
    if (hasIO && hero) {
      new IntersectionObserver(function (es) {
        pulseVis = es[0].isIntersecting;
        hero.classList.toggle('is-offscreen', !pulseVis);
        if (pulseVis) startPulse();
      }, { threshold: 0 }).observe(hero);
    }
  }

  /* hizmet bandı: kesintisiz döngü için kopya */
  var band = $('.band__t');
  if (band) { var row = $('.band__row', band); var c = row.cloneNode(true); c.setAttribute('aria-hidden', 'true'); band.appendChild(c); }

  /* ürünler: kategori seçici + yatay ray */
  var rail = $('#rail'), chips = $$('.chip'), cards = $$('.card'), durum = $('#kat-durum');
  function setKat(k, announce) {
    var n = 0;
    cards.forEach(function (li) { var on = li.getAttribute('data-kat') === k; li.hidden = !on; if (on) n++; });
    chips.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-kat') === k)); });
    if (rail) rail.scrollLeft = 0;
    if (announce && durum) durum.textContent = k + ': ' + n + ' ürün';
  }
  if (chips.length) {
    chips.forEach(function (b) { b.addEventListener('click', function () { setKat(b.getAttribute('data-kat'), true); }); });
  }
  if (rail) {
    var down = false, sx = 0, sl = 0, moved = 0;
    rail.addEventListener('pointerdown', function (e) { if (e.pointerType === 'touch') return; down = true; moved = 0; sx = e.clientX; sl = rail.scrollLeft; });
    window.addEventListener('pointermove', function (e) { if (!down) return; moved = e.clientX - sx; if (Math.abs(moved) > 5) rail.classList.add('is-drag'); rail.scrollLeft = sl - moved; });
    window.addEventListener('pointerup', function () { down = false; setTimeout(function () { rail.classList.remove('is-drag'); }, 0); });
    rail.addEventListener('click', function (e) { if (Math.abs(moved) > 5) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
    $$('.rbtn').forEach(function (b) {
      b.addEventListener('click', function () { rail.scrollBy({ left: parseInt(b.getAttribute('data-dir'), 10) * 320, behavior: reduce ? 'auto' : 'smooth' }); });
    });
    rail.addEventListener('keydown', function (e) {
      if (e.target !== rail) return;
      if (e.key === 'ArrowRight') rail.scrollBy({ left: 320, behavior: reduce ? 'auto' : 'smooth' });
      if (e.key === 'ArrowLeft') rail.scrollBy({ left: -320, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* WhatsApp örnek akışı */
  var chat = $('#chat');
  if (chat) {
    var m1 = $('[data-step="1"]', chat), ty = $('[data-step="2"]', chat), dr = $('[data-step="3"]', chat), out = $('[data-step="4"]', chat), btn = $('.acts strong', chat);
    var timers = [], running = false;
    var later = function (fn, ms) { timers.push(setTimeout(fn, ms)); };
    var reset = function () { [m1, ty, dr, out].forEach(function (x) { x.classList.remove('show'); }); btn.classList.remove('is-press'); };
    var play = function () {
      reset();
      later(function () { m1.classList.add('show'); }, 500);
      later(function () { ty.classList.add('show'); }, 1700);
      later(function () { ty.classList.remove('show'); dr.classList.add('show'); }, 3300);
      later(function () { btn.classList.add('is-press'); }, 6400);
      later(function () { dr.classList.remove('show'); out.classList.add('show'); }, 7100);
      later(play, 12500);
    };
    if (reduce || !hasIO) { m1.classList.add('show'); out.classList.add('show'); }
    else {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !running) { running = true; play(); }
          else if (!e.isIntersecting && running) { running = false; timers.forEach(clearTimeout); timers = []; }
        });
      }, { threshold: 0.35 }).observe(chat);
    }
  }

  /* logo halkaları: dağınık parçalar kendi halkaları boyunca yerine oturur; logo bütünüyle oluştuktan
     1 sn sonra tüm halkalar 2,5 sn'de (ease-out) solar ve bir sonraki tetiklemeye kadar görünmez kalır.
     Görünmezken rAF durur. Fare: imleç halka bölgesine girince tetiklenir. Dokunmatik: otomatik döngü ya da dokunuş. */
  (function () {
    var C = { x: 1000, y: 794 }, EMB = 1295;
    var DUR = 2800, HOLD = 1000, FADE = 2500, FIN = 450, WAIT = 900, PAUSE = 3500;
    var OP0 = 0.14, OPD = 0.14;                       /* soluk: dağınık .14, toplanınca .28 */
    var COL = ['#afe1fb', '#014aad', '#139ed5'];
    var bold = 0;                                     /* hero metin kalınlığı: bir kez kalınlaşır, geri dönmez */
    function ease(t) { t = Math.max(0, Math.min(1, t)); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function rnd(n) { var x = Math.sin(n * 91.7 + 3.1) * 10000; return x - Math.floor(x); }

    $$('svg[data-asm]').forEach(function (svg) {
      var mode = svg.getAttribute('data-asm'), sec = svg.parentElement, g = $('.asm__g', svg);
      var ps = $$('.p', svg).map(function (el, i) {
        var cx = +el.getAttribute('data-cx'), cy = +el.getAttribute('data-cy'), mx = +el.getAttribute('data-mx'), my = +el.getAttribute('data-my');
        var ang = Math.atan2(my - cy, mx - cx), layer = +el.getAttribute('data-c'), grp = +el.getAttribute('data-g');
        var sgn = rnd(i + 5) > .5 ? 1 : -1;
        el.setAttribute('stroke', COL[layer]);
        return { el: el, c: layer, cx: cx, cy: cy, ca: Math.cos(ang), sa: Math.sin(ang),
          rot: sgn * (55 + rnd(i + 21) * 70), dr: (rnd(i + 11) - .5) * 360, tx: (rnd(i + 41) - .5) * 140, ty: (rnd(i + 51) - .5) * 140,
          d: layer * .24 + grp * .12 + rnd(i + 31) * .08, ph: rnd(i + 61) * 6.28, sp: .5 + rnd(i + 71) * .6 };
      });
      var k = 1, L = 0, T = 0;
      var auto = !fine, vis = false, running = false, last = 0, pausedAt = 0, timer = 0;
      /* durum: idle (dağınık, bekler) → assemble → hold → fade → hidden (rAF durur)   [fadein: hidden'dan dönüş] */
      var S = { phase: 'idle', t0: 0, a: 0, v: 1, next: 'assemble' };

      function layout() {
        var s = sec.getBoundingClientRect(), vw = window.innerWidth, small = vw < 900;
        var bw = mode === 'hero' ? (small ? 1.5 * vw : Math.min(.86 * vw, 1100)) : Math.min(small ? 1.1 * vw : vw, 1100);
        var W = bw * 2000 / EMB;
        var Px = mode === 'hero' ? s.width * (small ? .72 : .68) : s.width * .82;
        var Py = mode === 'hero' ? s.height * .5 : s.height * .8;
        svg.style.width = W + 'px'; svg.style.height = W + 'px';
        svg.style.left = (Px - W * C.x / 2000) + 'px'; svg.style.top = (Py - W * C.y / 2000) + 'px';
        var r = svg.getBoundingClientRect(); k = r.width / 2000; L = r.left; T = r.top;
      }
      function inZone(x, y) {
        var u = (x - L) / k, v = (y - T) / k;
        return Math.hypot(u - 826, v - 794) <= 480 || Math.hypot(u - 1174.5, v - 794) <= 480;
      }
      function draw(t) {
        if (mode === 'hero') {                           /* lead: halkalar toplanınca kalınlaşır; solunca eski haline dönmez */
          var b = ease((S.a - .7) / .3);
          if (b > bold) { bold = b; sec.style.setProperty('--lw', (400 + 300 * bold).toFixed(0)); sec.style.setProperty('--lwd', (100 - 4 * bold).toFixed(1)); }
        }
        ps.forEach(function (p) {
          var ai = ease((S.a - p.d * .55) / .45), f = 1 - ai, amp = reduce ? 0 : 24 * f;
          var ox = (p.dr * p.ca + p.tx) * f + Math.sin(t / 1000 * p.sp + p.ph) * amp;
          var oy = (p.dr * p.sa + p.ty) * f + Math.cos(t / 1000 * p.sp * 1.2 + p.ph) * amp;
          p.el.setAttribute('transform', 'translate(' + ox.toFixed(1) + ' ' + oy.toFixed(1) + ') rotate(' + (p.rot * f).toFixed(2) + ' ' + p.cx + ' ' + p.cy + ')');
          p.el.setAttribute('opacity', (OP0 + OPD * ai).toFixed(3));
        });
        g.setAttribute('opacity', S.v.toFixed(3));
      }
      function go(phase, t) { S.phase = phase; S.t0 = t; }
      function loop(t) {
        if (!vis) { running = false; pausedAt = t; return; }
        var e = t - S.t0;
        switch (S.phase) {
          case 'fadein':
            S.v = Math.min(1, e / FIN);
            if (e >= FIN) go(S.next, t);
            break;
          case 'idle':
            if (auto && e >= WAIT) go('assemble', t);
            break;
          case 'assemble':
            S.a = Math.min(1, e / DUR);
            if (e >= DUR) go('hold', t);
            break;
          case 'hold':
            if (e >= HOLD) go('fade', t);
            break;
          case 'fade':
            var q = Math.min(1, e / FADE);
            S.v = (1 - q) * (1 - q);                     /* ease-out: opaklık hızlı düşer, kuyruk yavaş söner */
            if (q >= 1) {
              S.v = 0; go('hidden', t); draw(t);
              svg.style.visibility = 'hidden'; running = false;   /* rAF durur */
              if (auto) timer = setTimeout(restartAuto, PAUSE);
              return;
            }
            break;
        }
        draw(t);
        requestAnimationFrame(loop);
      }
      function start() {
        if (running || reduce || S.phase === 'hidden') return;
        running = true; var now = performance.now();
        if (pausedAt) { S.t0 += now - pausedAt; pausedAt = 0; }     /* ekran dışında geçen süre sayılmaz */
        requestAnimationFrame(loop);
      }
      function fromHidden(next) {                        /* görünmezken yeniden tetikleme: dağınık başla, aynı şekilde topla ve sol */
        clearTimeout(timer); S.a = 0; S.v = 0; S.next = next; svg.style.visibility = 'visible'; draw(performance.now());
        go('fadein', performance.now()); pausedAt = 0; running = false; requestAnimationFrame(function (t) { running = true; last = t; requestAnimationFrame(loop); });
      }
      function restartAuto() { if (!auto || S.phase !== 'hidden') return; if (!vis) { timer = setTimeout(restartAuto, 1000); return; } fromHidden('idle'); }
      function trigger() {                               /* fare girişi / dokunuş */
        if (reduce) return;
        var now = performance.now();
        if (S.phase === 'idle') { go('assemble', now); start(); }
        else if (S.phase === 'hidden') fromHidden('assemble');
      }

      layout();
      if (reduce) {                                      /* animasyon yok: sabit, soluk halkalar */
        S.a = 1; S.v = .55; bold = 0; draw(0);
        if (mode === 'hero') { sec.style.setProperty('--lw', '500'); sec.style.setProperty('--lwd', '98'); }
        window.addEventListener('resize', layout);
        return;
      }
      draw(0);
      if (hasIO) {
        new IntersectionObserver(function (es) {
          vis = es[0].isIntersecting;
          if (vis) { layout(); if (S.phase !== 'hidden') { if (S.phase === 'idle' && !S.t0) S.t0 = performance.now(); start(); } }
        }, { threshold: .1 }).observe(sec);
      } else { vis = true; S.t0 = performance.now(); start(); }
      window.addEventListener('resize', layout);
      window.addEventListener('scroll', function () { if (vis) { var r = svg.getBoundingClientRect(); L = r.left; T = r.top; } }, { passive: true });
      window.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse' || !fine) return;      /* yalnızca gerçek fareli cihazlar */
        if (auto) { auto = false; clearTimeout(timer); if (S.phase === 'idle') S.t0 = performance.now(); }   /* gerçek fare: otomatik döngüyü bırak */
        if (vis && inZone(e.clientX, e.clientY)) trigger();
      });
      window.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' || !vis) return;
        if (inZone(e.clientX, e.clientY)) { clearTimeout(timer); trigger(); }
      }, { passive: true });
    });
  })();
})();
