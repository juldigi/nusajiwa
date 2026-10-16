/* NUSAJIWA 6.37 — Game HUD behaviour layer.
   Additive: tidak mengubah state, save, atau fungsi game. Hanya membaca DOM #nj35 dan memperhalus tampilannya.
   Rollback: hapus kelas "njx" dari #nj35 (atau lepas css_35.css + script_34.js). */
(function () {
  'use strict';
  // In QA mode the production model inspector must not be covered by the sanctuary HUD.
  if (new URLSearchParams(location.search).has('audit')) return;

  var STAGES = ['Telur', 'Bayi', 'Balita', 'Anak', 'Remaja', 'Dewasa', 'Tua', 'Legenda'];
  var XP_FLOOR = [0, 8, 24, 49, 81, 125, 180, 260]; // sama dengan NJ36_XP di script_32.js
  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function whenReady(fn) {
    var el = document.getElementById('nj35');
    if (el) return fn(el);
    var mo = new MutationObserver(function () {
      var found = document.getElementById('nj35');
      if (found) { mo.disconnect(); fn(found); }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  whenReady(function (root) {
    var $ = function (q, ctx) { return (ctx || root).querySelector(q); };
    var $$ = function (q, ctx) { return Array.prototype.slice.call((ctx || root).querySelectorAll(q)); };
    var vibrate = function (p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} };

    root.classList.add('njx');

    var info = $('#nj35Info');
    var pearls = $('#nj35Pearls');
    var toast = $('#nj35Toast');
    var side = $('#nj35Side');
    var sideBody = $('#nj35SideBody');

    /* ---------- Lembar menu: scrollTop tetap berlaku untuk kode lama ---------- */
    if (side && sideBody) {
      try {
        Object.defineProperty(side, 'scrollTop', {
          configurable: true,
          get: function () { return sideBody.scrollTop; },
          set: function (v) { sideBody.scrollTop = v; }
        });
      } catch (e) {}
    }

    /* ---------- Overlay buatan ---------- */
    var floatLayer = document.createElement('div');
    floatLayer.setAttribute('aria-hidden', 'true');
    root.appendChild(floatLayer);

    var cel = document.createElement('div');
    cel.className = 'njx-cel';
    cel.setAttribute('role', 'status');
    cel.innerHTML = '<div class="njx-cel-box"><div class="njx-cel-title"></div><div class="njx-cel-name"></div><div class="njx-cel-stage"></div></div>';
    root.appendChild(cel);
    var celTimer = 0;
    cel.addEventListener('click', function () { cel.classList.remove('show'); });

    function celebrate(name, idx) {
      var title = idx === 1 ? 'Telur menetas' : idx === 7 ? 'Legenda terbangun' : 'Tumbuh!';
      $('.njx-cel-title', cel).textContent = title;
      $('.njx-cel-name', cel).textContent = name;
      $('.njx-cel-stage', cel).textContent = 'Tahap ' + STAGES[idx];
      cel.classList.remove('show');
      void cel.offsetWidth;
      cel.classList.add('show');
      clearTimeout(celTimer);
      celTimer = setTimeout(function () { cel.classList.remove('show'); }, REDUCED ? 1800 : 2800);
      vibrate([20, 40, 30]);
    }

    /* ---------- Menu pojok kanan atas ---------- */
    var topRight = $('.nj-topright');
    var menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'nj-chip njx-menu-btn';
    menuBtn.id = 'njxMenuBtn';
    menuBtn.setAttribute('aria-label', 'Menu');
    menuBtn.setAttribute('aria-haspopup', 'menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '<span class="nj-chip-icon nj-icon-settings"></span>';
    if (topRight) topRight.appendChild(menuBtn);

    var menu = document.createElement('div');
    menu.className = 'njx-menu';
    menu.id = 'njxMenu';
    menu.setAttribute('role', 'menu');
    menu.hidden = true;
    menu.innerHTML =
      '<button type="button" role="menuitem" data-njx="quality"><span>Kualitas grafis</span><b id="njxQ">AUTO</b></button>' +
      '<a role="menuitem" href="./atlas-evolusi.html"><span>Atlas evolusi</span><b>Buka</b></a>' +
      '<button type="button" role="menuitem" data-njx="legacy"><span>Arsip klasik 2D</span><b>Buka</b></button>';
    root.appendChild(menu);

    function qualityLabel() {
      var q = $('#nj35Quality');
      var label = q && q.querySelector('span:last-child');
      return label ? label.textContent.trim() : 'AUTO';
    }
    function setMenu(open) {
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      if (open) { $('#njxQ').textContent = qualityLabel(); }
    }
    menuBtn.addEventListener('click', function (e) { e.stopPropagation(); setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) {
      e.stopPropagation();
      var b = e.target.closest('[data-njx]');
      if (!b) return;
      if (b.dataset.njx === 'quality') {
        var q = $('#nj35Quality');
        if (q) q.click();
        setTimeout(function () { $('#njxQ').textContent = qualityLabel(); }, 30);
      } else if (b.dataset.njx === 'legacy') {
        setMenu(false);
        var l = $('#nj35Legacy');
        if (l) l.click();
      }
    });
    root.addEventListener('click', function (e) {
      if (!menu.hidden && !e.target.closest('.njx-menu')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

    /* label aksesibel untuk tombol perawatan (label visual disembunyikan) */
    $$('.nj-action').forEach(function (a) {
      var sm = a.querySelector('small');
      if (sm && !a.getAttribute('aria-label')) { a.setAttribute('aria-label', sm.textContent.trim()); a.setAttribute('title', sm.textContent.trim()); }
    });

    /* ---------- Umpan balik sentuhan ---------- */
    root.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.nj-action, .nj-bottom button, .nj-adopt, .nj-ritual-primary, .nj-chip')) vibrate(8);
    }, { passive: true });
    root.addEventListener('click', function (e) {
      var a = e.target.closest('.nj-action');
      if (!a) return;
      a.classList.remove('njx-pulse');
      void a.offsetWidth;
      a.classList.add('njx-pulse');
    });

    /* ---------- Mata uang: hanya angka, dengan pop saat berubah ---------- */
    var lastCoins = null;
    function numberOf(txt) { return parseInt(String(txt).replace(/[^\d]/g, ''), 10); }
    function applyPearls() {
      var b = pearls && pearls.querySelector('b');
      if (!b) return;
      var txt = b.textContent;
      var n = numberOf(txt);
      if (isNaN(n)) return;
      pearls.setAttribute('role', 'status');
      pearls.setAttribute('aria-label', n.toLocaleString('id-ID') + ' Jiwa');
      if (/[A-Za-z]/.test(txt)) b.textContent = n.toLocaleString('id-ID');
      if (lastCoins !== null && n !== lastCoins) {
        var d = n - lastCoins;
        pearls.classList.remove('pop');
        void pearls.offsetWidth;
        pearls.classList.add('pop');
        var f = document.createElement('div');
        f.className = 'njx-float';
        f.textContent = (d > 0 ? '+' : '−') + Math.abs(d);
        var r = pearls.getBoundingClientRect();
        f.style.left = (r.left + 28) + 'px';
        f.style.top = (r.bottom + 4) + 'px';
        floatLayer.appendChild(f);
        void f.offsetWidth;
        f.classList.add('go');
        setTimeout(function () { f.remove(); }, 1200);
      }
      lastCoins = n;
    }

    /* ---------- Papan nama: bilah XP, label aksesibel, deteksi evolusi ---------- */
    var last = { name: '', idx: -1 };
    function applyInfo() {
      if (!info) return;
      var name = (info.querySelector('h2') || {}).textContent || '';
      var origin = (info.querySelector('.origin') || {}).textContent || '';
      var idx = STAGES.indexOf((origin.split('·')[1] || '').trim());

      var pct = 0;
      var span = info.querySelector('.nj-progress-line span');
      var m = span && /XP\s+(\d+)\s*\/\s*(\d+|MAX)/.exec(span.textContent);
      if (m) {
        if (m[2] === 'MAX') pct = 100;
        else {
          var floor = XP_FLOOR[Math.max(0, idx)] || 0;
          var next = +m[2];
          pct = next > floor ? Math.round(100 * (+m[1] - floor) / (next - floor)) : 0;
        }
        pct = Math.max(0, Math.min(100, pct));
      }
      info.style.setProperty('--xp', pct + '%');

      $$('.nj-stat', info).forEach(function (s) {
        var spans = s.querySelectorAll('label span');
        if (spans.length > 1) s.setAttribute('title', spans[0].textContent + ' ' + spans[1].textContent);
      });

      if (idx >= 0 && last.name === name && last.idx >= 0 && idx > last.idx) celebrate(name, idx);
      last = { name: name, idx: idx };
    }

    /* ---------- Banner lokasi ---------- */
    function applyToast() {
      if (!toast) return;
      toast.classList.toggle('loc', /^\s*⌖/.test(toast.textContent));
    }

    /* ---------- Lembar menu: kenali panel, rapikan isinya ---------- */
    var PANELS = [
      ['roster', '.nj-roster-summary', 'Koleksi'],
      ['explore', '#nj38QuestBoard', 'Main & Ekspedisi'],
      ['ritual', '.nj-stage-track', 'Altar evolusi'],
      ['archive', '.nj-codex-facts', 'Kodex'],
      ['journal', '.nj61-journal-list', 'Catatan penemuan']
    ];
    function sentenceCase(s) {
      s = s.replace(/^[^A-Za-zÀ-ÿ]+/, '').toLowerCase();
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    function fold(summaryText, node) {
      var d = document.createElement('details');
      d.className = 'njx-fold';
      var s = document.createElement('summary');
      s.textContent = summaryText;
      d.appendChild(s);
      node.parentNode.insertBefore(d, node);
      d.appendChild(node);
    }
    function applySide() {
      if (!side || !sideBody) return;
      var kind = '', title = 'Menu';
      for (var i = 0; i < PANELS.length; i++) {
        if (sideBody.querySelector(PANELS[i][1])) { kind = PANELS[i][0]; title = PANELS[i][2]; break; }
      }
      side.dataset.panel = kind;
      side.dataset.title = title;

      if (kind === 'roster' && !sideBody.querySelector('.njx-meter')) {
        var intro = sideBody.querySelector(':scope > p');
        if (intro) {
          var note = document.createElement('details');
          note.className = 'njx-note';
          var sm = document.createElement('summary');
          sm.textContent = 'Tentang koleksi ini';
          note.appendChild(sm);
          intro.parentNode.insertBefore(note, intro);
          note.appendChild(intro);
        }
        var sum = sideBody.querySelector('.nj-roster-summary');
        var pctTxt = sum && sum.querySelector('.nj-summary-card span');
        var pct = pctTxt ? parseInt(pctTxt.textContent, 10) || 0 : 0;
        var meter = document.createElement('div');
        meter.className = 'njx-meter';
        meter.innerHTML = '<i style="width:' + pct + '%"></i>';
        sum.parentNode.insertBefore(meter, sum.nextSibling);

        var field = sideBody.querySelector('.nj61-field');
        if (field) {
          var cnt = field.querySelector('.nj61-field-head strong');
          fold('Jurnal penjelajah' + (cnt ? ' · ' + cnt.textContent : ''), field);
        }

        var rc = sideBody.querySelector('.nj-result-count');
        if (rc) rc.textContent = rc.textContent.split('·')[0].trim();
        var fo = sideBody.querySelector('[data-njfilter="folklor"]');
        if (fo) fo.textContent = 'Folklor';
        var lg = sideBody.querySelector('[data-njfilter="legend"]');
        if (lg) lg.textContent = 'Tahap Legenda';

        var fl = sideBody.querySelector('.nj-filters');
        if (fl) {
          var sel = fl.querySelector('button.sel');
          var fix = function () { fl.scrollLeft = (sel && sel.offsetLeft + sel.offsetWidth > fl.clientWidth) ? Math.max(0, sel.offsetLeft - 20) : 0; };
          fix(); requestAnimationFrame(fix); setTimeout(fix, 180);
        }

        $$('.nj-item', sideBody).forEach(function (it) {
          if (it.querySelector('.nj-stage-badge.locked')) it.classList.add('njx-locked');
        });
      }

      if (kind === 'explore') {
        var eb = sideBody.querySelector('.nj38-quest .nj-eyebrow');
        if (eb) eb.textContent = sentenceCase(eb.textContent);
      }

      if (kind === 'ritual') {
        var done = $$('.nj-stage-track span.done', sideBody);
        if (done.length) done[done.length - 1].classList.add('cur');
        if (!sideBody.querySelector('.njx-atlas')) {
          var a = document.createElement('a');
          a.className = 'njx-atlas';
          a.href = './atlas-evolusi.html';
          a.textContent = 'Atlas evolusi';
          sideBody.appendChild(a);
        }
      }
    }

    /* ---------- Pasang pengamat (satu kali, tanpa loop) ---------- */
    function watch(el, fn, opts) {
      if (!el) return;
      var mo = new MutationObserver(function () {
        mo.disconnect();
        try { fn(); } catch (e) { if (window.console) console.warn('NJX', e); }
        mo.takeRecords();
        mo.observe(el, opts);
      });
      mo.observe(el, opts);
    }
    var kids = { childList: true, characterData: true, subtree: true };
    watch(info, applyInfo, kids);
    watch(pearls, applyPearls, kids);
    watch(toast, applyToast, kids);
    watch(sideBody, applySide, { childList: true });

    applyInfo();
    applyPearls();
    applySide();

    /* ---------- Layar judul (sekali per sesi) ---------- */
    var seen = false;
    try { seen = sessionStorage.getItem('njx-title') === '1'; } catch (e) {}
    if (/[?&]notitle\b/.test(location.search) || ['tamagotchi','classic'].includes(new URLSearchParams(location.search).get('ui'))) seen = true;
    if (!seen) {
      var t = document.createElement('div');
      t.className = 'njx-title';
      t.setAttribute('role', 'dialog');
      t.setAttribute('aria-label', 'NUSAJIWA');
      t.innerHTML = '<div class="njx-title-seal"></div><h1>NUSAJIWA</h1><p>Suaka hidup para makhluk Nusantara</p><button type="button">Masuk ke suaka</button>';
      root.appendChild(t);
      var go = $('button', t);
      var enter = function () {
        document.removeEventListener('keydown', onKey);
        try { sessionStorage.setItem('njx-title', '1'); } catch (e) {}
        vibrate(14);
        t.classList.add('out');
        setTimeout(function () { t.remove(); }, 700);
      };
      var onKey = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); } };
      go.addEventListener('click', enter);
      document.addEventListener('keydown', onKey);
    }
  });
})();