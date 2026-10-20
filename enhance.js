/* ============================================================================
   Enhancement layer — riszky.dev v2
   Animation-first, honest-simulated, theme-safe. Loaded AFTER app.js.
   ============================================================================ */
(function () {
  'use strict';

  var docReady = function (fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  docReady(function () {

    /* ---------- 1. Terminal boot log (complex, sequential lines) ---------- */
    var termBody = document.getElementById('term-body');
    if (termBody) {
      var bootScript = [
        { t: 'cmd',  s: 'npm run dev' },
        { t: 'ok',   s: '✓ backend ready on :3000 (NestJS)' },
        { t: 'ok',   s: '✓ database connected (PostgreSQL)' },
        { t: 'info', s: '→ swarm.agents.dispatch() [8 agents]' },
        { t: 'info', s: '→ analyzing IDX financials (10 sectors)' },
        { t: 'warn', s: '⚠ 3-layer extraction: 100% strict' },
        { t: 'ok',   s: '✓ deploy pipeline passed (CI/CD)' },
        { t: 'cmd',  s: 'git push origin main' },
        { t: 'ok',   s: '✓ up to date — portfolio live' }
      ];
      var li = 0, bi = 0, running = true;
      var cursor = null;

      function makeCursor() {
        cursor = document.createElement('span');
        cursor.className = 'term-cursor';
        cursor.textContent = '▋';
        return cursor;
      }

      function reset() {
        termBody.innerHTML = '';
        cursor = null;
        li = 0; bi = 0;
      }

      function typeCommand(line, chars) {
        if (chars.length === 0) return;
        var t = line.querySelector('.t-text');
        t.textContent = chars[0];
        for (var i = 1; i < chars.length; i++) {
          (function (ch) { setTimeout(function () { t.textContent += ch; }, i * 28); })(chars[i]);
        }
      }

      function step() {
        if (!running) return;
        if (li >= bootScript.length) {
          /* pause, then re-run the whole log for an endless live feel */
          setTimeout(function () {
            if (!running) return;
            reset();
            step();
          }, 2600);
          return;
        }
        var line = bootScript[li];
        var el = document.createElement('div');
        el.className = 'term-line t-' + line.t;
        if (line.t === 'cmd') {
          el.innerHTML = '<span class="t-prompt">$</span><span class="t-text"></span>';
          termBody.appendChild(el);
          typeCommand(el, line.s);
          var totalCmd = (line.s.length * 28) + 180;
          setTimeout(function () { if (running) step(); }, totalCmd);
        } else {
          el.textContent = line.s;
          termBody.appendChild(el);
          el.style.animationDelay = '0s';
          setTimeout(function () { if (running) step(); }, 300);
        }
        /* keep the latest command line visible with a live cursor */
        var old = termBody.querySelector('.term-cursor');
        if (old) old.remove();
        makeCursor().style.cssText = 'margin-left:4px';
        el.appendChild(cursor);
        li++;
      }

      step();
      document.addEventListener('visibilitychange', function () {
        running = document.visibilityState === 'visible';
      });
    }

    /* ---------- 2. Scroll reveal + section-rule sweep ---------- */
    var revealEls = document.querySelectorAll(
      '.hero, .glass-card, .section-header, .showcase-container, .contact-section, footer'
    );
    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      /* Make each card its own reveal so the rows stagger. */
      if (el.classList.contains('section-header')) el.classList.add('in');
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* Stagger the three skill cards for a wave effect. */
    var deps = ['Backend Architecture', 'Data Analysis', 'NLP & Intelligent Apps'];
    deps.forEach(function (t) {
      var cards = Array.prototype.slice.call(document.querySelectorAll('.glass-card'));
      cards.forEach(function (c) {
        var title = (c.querySelector('.card-title') || {}).textContent || '';
        if (title.indexOf(t) !== -1) c.style.transitionDelay = '0.08s';
      });
    });

    /* ---------- 3. Skill level bars animate only when visible ---------- */
    var skillTracks = document.querySelectorAll('.skill-level-track');
    if ('IntersectionObserver' in window && skillTracks.length) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var bar = e.target.querySelector('.skill-level-fill');
            if (bar) bar.style.width = e.target.dataset.level + '%';
            sio.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      skillTracks.forEach(function (t) { sio.observe(t); });
    } else {
      skillTracks.forEach(function (t) {
        var bar = t.querySelector('.skill-level-fill');
        if (bar) bar.setAttribute('style', 'width:' + t.dataset.level + '%');
      });
    }

    /* ---------- 4. Cursor glow inside showcase ---------- */
    var showcase = document.querySelector('.showcase-container');
    var glow = document.getElementById('cursor-glow');
    if (showcase && glow) {
      var lastX = 0, lastY = 0, tracking = false, frame = null;
      var glowOn = window.matchMedia('(pointer:fine)').matches;

      function renderGlow() {
        frame = null;
        glow.style.transform = 'translate(' + (lastX - 160) + 'px,' + (lastY - 160) + 'px)';
      }
      if (glowOn) {
        showcase.addEventListener('mousemove', function (e) {
          var rect = showcase.getBoundingClientRect();
          lastX = e.clientX - rect.left;
          lastY = e.clientY - rect.top;
          if (!tracking) { tracking = true; }
          if (!frame) frame = requestAnimationFrame(renderGlow);
        });
        showcase.addEventListener('mouseenter', function () {
          var rect = showcase.getBoundingClientRect();
          lastX = rect.width / 2; lastY = rect.height / 2;
        });
      }
    }

    /* ---------- 5. GitHub stats cards: switch to fallback if the external
       image never paints (they are SVGs from a third-party service and
       often fail or render squat). Hide the image only once we confirm it
       is NOT loading — do not preemptively replace a working badge. ---------- */
    function probeGhImg(img) {
      if (!img || !img.complete) return;
      var card = img.closest('.github-card');
      if (!card) return;
      var naturalW = img.naturalWidth || 0;
      var naturalH = img.naturalHeight || 0;
      /* A working github-readme-stats SVG has a real aspect ratio. A locked
         placeholder is a 0x0 or 1x1 broken image. Treat those as failure. */
      var squat = naturalW === 0 || (naturalW <= 8 && naturalH <= 8);
      if (squat) card.setAttribute('data-fallback', 'on');
    }
    ['gh-stats-img', 'gh-streak-img'].forEach(function (id) {
      var img = document.getElementById(id);
      if (!img) return;
      if (img.complete) probeGhImg(img);
      else img.addEventListener('load', function () { probeGhImg(img); });
      /* Absolute safety: if the browser never fires load within 6s and the
         image is still broken, show the fallback anyway. */
      setTimeout(function () { probeGhImg(img); }, 6000);
    });

    /* ---------- 6. Bento metrik: count-up on first view (values come from
       the markup, so the animation can never invent a number). ---------- */
    function countUp(el) {
      var text = el.textContent.trim();
      var m = /([\d.,]+)(.*)$/.exec(text);
      if (!m) return;
      var raw = m[1];
      var suffix = m[2] || '';
      var isRupiah = /[Rr][pP]/.test(text);
      var decimals = (raw.split(/[,.]/)[1] || '').length;
      var target = parseFloat(raw.replace(/\./g, '').replace(/,/g, '.')) || 0;
      var start = null, DUR = 900;

      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / DUR, 1);
        p = 1 - Math.pow(1 - p, 3);
        var val = target * p;
        var out;
        if (isRupiah) out = 'Rp ' + Math.round(val).toLocaleString('id-ID');
        else if (decimals > 0) out = val.toFixed(decimals).replace('.', ',');
        else out = Math.round(val).toLocaleString('id-ID');
        el.textContent = out + suffix;
        if (p < 1 && typeof requestAnimationFrame === 'function') requestAnimationFrame(step);
        else el.textContent = text;
      }
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(step);
    }

    var countTargets = [].slice.call(document.querySelectorAll('.swarm-stat-box .val'));
    if (countTargets.length && 'IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            countUp(e.target);
            cio.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      countTargets.forEach(function (el) { cio.observe(el); });
    } else {
      countTargets.forEach(countUp);
    }

    /* ---------- 7. Swarm sector switch: re-run count-up + flash relay ---------- */
    document.querySelectorAll('.swarm-sector-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.swarm-stat-box .val').forEach(function (el) {
          /* a viewport is already visible, run instantly without observer */
          el.textContent = el.textContent; /* placeholder; real values refresh below */
        });
        var relay = document.getElementById('swarm-relay-container');
        if (relay) {
          relay.style.transition = 'opacity 0.25s ease';
          relay.style.opacity = '0.35';
          setTimeout(function () {
            relay.style.opacity = '1';
            relay.style.transition = '';
          }, 120);
        }
      });
    });

    /* ---------- 8. Tilt on the Financely virtual card ---------- */
    var tilt = document.querySelector('.tilt');
    var vcard = document.querySelector('.portfolio-virtual-card');
    if (tilt && vcard && window.matchMedia('(pointer:fine)').matches) {
      var timer = null;
      tilt.addEventListener('mousemove', function (e) {
        if (timer) clearTimeout(timer);
        var r = tilt.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        vcard.style.transform =
          'scale(1.02) rotateX(' + (-py * 10).toFixed(2) + 'deg) rotateY(' + (px * 12).toFixed(2) + 'deg)';
      });
      tilt.addEventListener('mouseleave', function () {
        vcard.style.transform = 'scale(1) rotateX(0) rotateY(0)';
      });
    }

    /* ---------- 9. Year in footer stays current ---------- */
    var yearEl = document.querySelector('footer');
    if (yearEl) {
      var m = /© (\d{4})/.exec(yearEl.textContent);
      if (m) yearEl.textContent = yearEl.textContent.replace(m[1], String(new Date().getFullYear()));
    }

  });
})();
