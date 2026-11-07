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
    var ringsEl = $$('.rings');
    window.addEventListener('pointermove', function (e) {
      var px = e.clientX / window.innerWidth - 0.5, py = e.clientY / window.innerHeight - 0.5;
      ringsEl.forEach(function (r) { r.style.rotate = (px * 6) + 'deg'; });
    });
  }
})();
