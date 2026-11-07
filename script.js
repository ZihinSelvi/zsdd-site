(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  $('#yil').textContent = new Date().getFullYear();

  /* açılış */
  window.addEventListener('load', function () { requestAnimationFrame(function () { doc.classList.add('is-loaded'); document.body.classList.add('is-loaded'); }); });
  setTimeout(function () { document.body.classList.add('is-loaded'); doc.classList.add('is-loaded'); }, 1200);
  var hero = $('.hero'); if (hero) setTimeout(function () { hero.classList.add('is-loaded'); }, 60);
  document.body.addEventListener('transitionstart', function () {}, { once: true });
  // başlık satırları .is-loaded sınıfını hero üzerinden alır
  var styleFix = document.createElement('style');
  styleFix.textContent = '.js .hero.is-loaded .hero__h .w{transform:none}';
  document.head.appendChild(styleFix);

  /* beliren öğeler, kardeşler arasında sıralı gecikme */
  var rv = $$('.rv');
  rv.forEach(function (el) {
    var sibs = $$('.rv', el.parentElement).filter(function (x) { return x.parentElement === el.parentElement; });
    var i = sibs.indexOf(el);
    el.style.setProperty('--d', (Math.min(i, 6) * 0.09) + 's');
  });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* menü */
  var top = $('#top'), nav = $('#nav'), tgl = $('.nav-toggle');
  function closeNav() { nav.classList.remove('is-open'); tgl.setAttribute('aria-expanded', 'false'); doc.style.overflow = ''; }
  tgl.addEventListener('click', function () {
    var o = nav.classList.toggle('is-open'); tgl.setAttribute('aria-expanded', String(o)); doc.style.overflow = o ? 'hidden' : '';
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* kaydırma: ilerleme, üst çubuk, sütun ağırlığı, paralaks */
  var bar = $('.progress i'), lastY = 0, ticking = false;
  var pillars = $$('[data-weight]'), par = $$('[data-parallax]');
  function frame() {
    ticking = false;
    var y = window.scrollY, h = doc.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    top.classList.toggle('is-solid', y > 40);
    top.classList.toggle('is-hidden', y > 240 && y > lastY + 4 && !nav.classList.contains('is-open'));
    if (y < lastY - 4 || y < 240) top.classList.remove('is-hidden');
    lastY = y;
    var vh = window.innerHeight;
    pillars.forEach(function (el) {
      var r = el.getBoundingClientRect(), c = r.top + Math.min(r.height, 220) / 2;
      var p = 1 - Math.abs(c - vh * 0.55) / (vh * 0.42);
      p = Math.max(0, Math.min(1, p));
      el.style.setProperty('--p', reduce ? 1 : p.toFixed(3));
    });
    if (!reduce) par.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect(), k = parseFloat(el.getAttribute('data-parallax'));
      el.style.translate = '0 ' + ((r.top + r.height / 2 - vh / 2) / vh * k).toFixed(1) + 'vh';
    });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', frame);
  frame();

  /* nabız çizgisi: önce çizilir, sonra bir nokta üzerinde gezer */
  var path = $('#pulsePath'), svg = path && path.ownerSVGElement;
  if (path && svg) {
    var dot = document.createElement('i'); dot.className = 'pulse__dot'; svg.parentNode.appendChild(dot);
    var len = path.getTotalLength(), t0 = null, drawn = false;
    function place(f) {
      var pt = path.getPointAtLength(len * f), r = svg.getBoundingClientRect(), hr = svg.parentNode.getBoundingClientRect();
      var s = Math.max(r.width / 1600, r.height / 200);
      var ox = (r.width - 1600 * s) / 2, oy = (r.height - 200 * s) / 2;
      dot.style.left = (r.left - hr.left + ox + pt.x * s) + 'px';
      dot.style.top = (r.top - hr.top + oy + pt.y * s) + 'px';
    }
    if (reduce) { path.style.strokeDashoffset = 0; }
    else {
      var step = function (t) {
        if (t0 === null) t0 = t;
        var e = (t - t0) / 1000;
        if (e < 2.6) { var f = 1 - Math.pow(1 - e / 2.6, 3); path.style.strokeDashoffset = 1 - f; dot.style.opacity = 1; place(f); }
        else { path.style.strokeDashoffset = 0; var f2 = ((e - 2.6) % 6) / 6; place(f2); dot.style.opacity = 1; }
        requestAnimationFrame(step);
      };
      setTimeout(function () { requestAnimationFrame(step); }, 500);
    }
  }

  /* hizmet bandı: kesintisiz döngü için kopya */
  var band = $('.band__t');
  if (band) { var row = $('.band__row', band); var c = row.cloneNode(true); c.setAttribute('aria-hidden', 'true'); band.appendChild(c); }

  /* ürün rayı: sürükle ve oklar */
  var rail = $('#rail');
  if (rail) {
    var down = false, sx = 0, sl = 0, moved = 0;
    rail.addEventListener('pointerdown', function (e) { if (e.pointerType === 'touch') return; down = true; moved = 0; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add('is-drag'); });
    window.addEventListener('pointermove', function (e) { if (!down) return; moved = e.clientX - sx; rail.scrollLeft = sl - moved; });
    window.addEventListener('pointerup', function () { down = false; rail.classList.remove('is-drag'); });
    $$('.rbtn').forEach(function (b) {
      b.addEventListener('click', function () { rail.scrollBy({ left: parseInt(b.getAttribute('data-dir'), 10) * 320, behavior: reduce ? 'auto' : 'smooth' }); });
    });
    rail.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') rail.scrollBy({ left: 320, behavior: 'smooth' }); if (e.key === 'ArrowLeft') rail.scrollBy({ left: -320, behavior: 'smooth' }); });
  }

  /* WhatsApp örnek akışı */
  var chat = $('#chat');
  if (chat) {
    var m1 = $('[data-step="1"]', chat), ty = $('[data-step="2"]', chat), dr = $('[data-step="3"]', chat), out = $('[data-step="4"]', chat), btn = $('.acts strong', chat);
    var timers = [], running = false;
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function reset() { [m1, ty, dr, out].forEach(function (x) { x.classList.remove('show'); }); btn.classList.remove('is-press'); }
    function play() {
      reset();
      later(function () { m1.classList.add('show'); }, 500);
      later(function () { ty.classList.add('show'); }, 1700);
      later(function () { ty.classList.remove('show'); dr.classList.add('show'); }, 3300);
      later(function () { btn.classList.add('is-press'); }, 6400);
      later(function () { dr.classList.remove('show'); out.classList.add('show'); }, 7100);
      later(play, 12500);
    }
    if (reduce) { m1.classList.add('show'); out.classList.add('show'); }
    else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !running) { running = true; play(); }
          else if (!e.isIntersecting && running) { running = false; timers.forEach(clearTimeout); timers = []; }
        });
      }, { threshold: 0.35 }).observe(chat);
    } else { m1.classList.add('show'); out.classList.add('show'); }
  }

  /* imleç halkası, mıknatıs düğmeler, kart eğimi (yalnızca fareli cihazlarda) */
  if (fine && !reduce) {
    document.body.classList.add('has-cursor');
    var cur = $('.cursor'), cx = 0, cy = 0, tx = 0, ty2 = 0;
    window.addEventListener('pointermove', function (e) { tx = e.clientX; ty2 = e.clientY; });
    (function loop() { cx += (tx - cx) * 0.18; cy += (ty2 - cy) * 0.18; cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', function (e) { cur.classList.toggle('is-hot', !!e.target.closest('a,button,.card,.row')); });

    $$('[data-magnet]').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.22) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.35) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
    $$('[data-tilt]').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'perspective(800px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) translateY(-6px)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }

  /* dağınık logo -> gerçek logo */
  (function () {
    var C = { x: 1000, y: 794 }, EMB = 1295;
    var PAL0 = ['#afe1fb', '#014aad', '#139ed5'];      /* dağınık: marka renkleri */
    var PAL1 = ['#cdecff', '#004aac', '#0b3269'];      /* birleşik: logonun kendi renkleri */
    function hex(h) { return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)]; }
    function mix(a, b, t) { var A = hex(a), B = hex(b); return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(A[i] + (B[i] - A[i]) * t); }).join(',') + ')'; }
    function sm(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
    function rnd(n) { var x = Math.sin(n * 91.7 + 3.1) * 10000; return x - Math.floor(x); }

    $$('svg[data-asm]').forEach(function (svg) {
      var mode = svg.getAttribute('data-asm'), sec = svg.parentElement;
      var grp = $('.asm__g', svg), img = $('.asm__img', svg);
      var ps = $$('.p', svg).map(function (el, i) {
        return { el: el, c: +el.getAttribute('data-c'), mx: +el.getAttribute('data-mx'), my: +el.getAttribute('data-my'),
          dx: (rnd(i + 1) - .5) * 520, dy: (rnd(i + 11) - .5) * 520, rot: (rnd(i + 21) - .5) * 90,
          d: rnd(i + 31), ph: rnd(i + 41) * 6.28, sp: .5 + rnd(i + 51) * .6 };
      });
      var S = 3, tx = 0, ty = 0, k = 1, L = 0, T = 0, a = 0, target = 0, hold = 0, vis = false, px = -1, py = -1, last = 0, autoOn = false;

      function layout() {
        var r = svg.getBoundingClientRect(), s = sec.getBoundingClientRect(), vw = window.innerWidth, small = vw < 900;
        k = r.width / 2000; L = r.left; T = r.top;
        var bw = mode === 'hero' ? (small ? 1.5 * vw : Math.min(.86 * vw, 1100)) : Math.min(small ? 1.1 * vw : vw, 1100);
        var Px = s.left + s.width * (mode === 'hero' ? (small ? .72 : .68) : .82);
        var Py = s.top + s.height * (mode === 'hero' ? .5 : .8);
        S = bw / (EMB * k);
        tx = (Px - L) / k - C.x; ty = (Py - T) / k - C.y;
      }
      function inZone(x, y) {
        var s = 1 + (S - 1) * (1 - a), u = (x - L) / k, v = (y - T) / k;
        var qx = C.x + (u - C.x - tx * (1 - a)) / s, qy = C.y + (v - C.y - ty * (1 - a)) / s;
        return Math.hypot(qx - 826, qy - 794) <= 480 || Math.hypot(qx - 1174.5, qy - 794) <= 480;
      }
      function draw(t) {
        var s = 1 + (S - 1) * (1 - a), io = sm((a - .82) / .18);
        grp.setAttribute('transform', 'translate(' + (C.x + tx * (1 - a)) + ' ' + (C.y + ty * (1 - a)) + ') scale(' + s + ') translate(' + (-C.x) + ' ' + (-C.y) + ')');
        img.setAttribute('opacity', io);
        ps.forEach(function (p) {
          var ai = sm((a - p.d * .4) / .6), f = 1 - ai, amp = reduce ? 0 : 26 * f;
          var ox = p.dx * f + Math.sin(t / 1000 * p.sp + p.ph) * amp, oy = p.dy * f + Math.cos(t / 1000 * p.sp * 1.2 + p.ph) * amp;
          p.el.setAttribute('transform', 'translate(' + ox.toFixed(1) + ' ' + oy.toFixed(1) + ') rotate(' + (p.rot * f).toFixed(1) + ' ' + p.mx + ' ' + p.my + ')');
          p.el.setAttribute('stroke', mix(PAL0[p.c], PAL1[p.c], ai));
          p.el.setAttribute('opacity', ((.38 + .62 * ai) * (1 - io)).toFixed(3));
        });
      }
      function loop(t) {
        if (!vis) return;
        var dt = Math.min(50, t - last) || 16; last = t;
        if (target === 1) {
          if (px >= 0 && inZone(px, py)) hold = Math.max(hold, t + 900);
          if (!autoOn && t > hold) target = 0;
        }
        if (reduce) a = target;
        else { a += (target - a) * Math.min(1, dt / 16) * .034 + Math.sign(target - a) * .001; }
        if (Math.abs(target - a) < .004) a = target;
        draw(t); requestAnimationFrame(loop);
      }
      var cycTimers = [];
      function cycle() {
        cycTimers.forEach(clearTimeout); cycTimers = [];
        if (!autoOn) return;
        cycTimers.push(setTimeout(function () { target = 1; }, 900));
        cycTimers.push(setTimeout(function () { target = 0; }, 5200));
        cycTimers.push(setTimeout(cycle, 9600));
      }
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          var was = vis; vis = es[0].isIntersecting;
          if (vis && !was) { layout(); last = performance.now(); requestAnimationFrame(loop); }
          if (!fine && !reduce) { autoOn = vis; if (vis) cycle(); }
        }, { threshold: .25 }).observe(sec);
      } else { vis = true; layout(); requestAnimationFrame(loop); }
      window.addEventListener('resize', layout);
      window.addEventListener('scroll', function () { if (vis) layout(); }, { passive: true });
      if (fine) window.addEventListener('pointermove', function (e) {
        if (!vis) return; px = e.clientX; py = e.clientY;
        if (inZone(px, py)) { target = 1; hold = performance.now() + 3200; }
      });
      layout(); draw(0);
    });
  })();
})();
