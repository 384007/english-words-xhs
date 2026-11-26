/* Word Adventure 《单词大冒险》 engine. ES5-safe. Pure front-end, zero network.
   Exposes pure logic for Node require via UMD guard at the bottom. */
(function () {
  'use strict';

  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);

  /* ========================================================================
     PURE LOGIC (also exported for the selftest). No DOM access in this block.
     ======================================================================== */

  // Fisher-Yates shuffle (returns a new array).
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Generate n distinct quiz options from a world's words that always include
  // the correct word entry. Returns array of word entries, shuffled.
  function generateQuizOptions(world, wordEntry, n) {
    if (!n || n < 1) { n = 4; }
    var words = (world && world.words) ? world.words : [];
    var options = [wordEntry];
    var seen = {};
    seen[wordEntry.word] = true;
    // Build candidate pool excluding the correct answer.
    var pool = [];
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (!seen[w.word]) { pool.push(w); }
    }
    pool = shuffle(pool);
    for (var p = 0; p < pool.length && options.length < n; p++) {
      if (!seen[pool[p].word]) {
        options.push(pool[p]);
        seen[pool[p].word] = true;
      }
    }
    // If the world is tiny, pad by relaxing distinctness is not desired; just
    // return what we have (still includes the correct answer).
    return shuffle(options);
  }

  // Case/whitespace-insensitive spelling check.
  function checkSpelling(input, word) {
    if (input == null || word == null) { return false; }
    var a = String(input).replace(/\s+/g, '').toLowerCase();
    var b = String(word).replace(/\s+/g, '').toLowerCase();
    return a === b && a.length > 0;
  }

  // Spaced-repetition scheduler. Interval in minutes grows on correct answers,
  // resets on wrong. Returns the updated item (does not mutate input).
  // Steps roughly: 10m, 1d, 3d, 7d, 16d, 35d.
  var REVIEW_STEPS_MIN = [10, 1440, 4320, 10080, 23040, 50400];
  function scheduleReview(item, wasCorrect, now) {
    if (now == null) { now = Date.now(); }
    var out = {};
    for (var k in item) { if (item.hasOwnProperty(k)) { out[k] = item[k]; } }
    var step = (typeof out.step === 'number') ? out.step : 0;
    if (wasCorrect) {
      step = step + 1;
      if (step > REVIEW_STEPS_MIN.length - 1) { step = REVIEW_STEPS_MIN.length - 1; }
    } else {
      step = 0;
    }
    out.step = step;
    out.lastReview = now;
    out.intervalMin = REVIEW_STEPS_MIN[step];
    out.nextReview = now + out.intervalMin * 60 * 1000;
    out.wrongCount = (out.wrongCount || 0) + (wasCorrect ? 0 : 1);
    return out;
  }

  // Serialize game state to a JSON string (stable shape).
  function serializeState(state) {
    var s = state || {};
    var payload = {
      v: 1,
      stars: s.stars || 0,
      stickers: s.stickers || [],
      streak: s.streak || 0,
      lastDaily: s.lastDaily || '',
      cleared: s.cleared || {},
      mistakes: s.mistakes || [],
      outfits: s.outfits || [],
      equipped: s.equipped || {},
      bestSpeed: s.bestSpeed || 0,
      bestChallenge: s.bestChallenge || 0,
      correctCount: s.correctCount || 0,
      adultUnlocked: !!s.adultUnlocked,
      muted: !!s.muted
    };
    return JSON.stringify(payload);
  }

  // Parse a serialized state string back into a state object. Never throws.
  function deserializeState(str) {
    var base = {
      stars: 0, stickers: [], streak: 0, lastDaily: '', cleared: {},
      mistakes: [], outfits: [], equipped: {}, bestSpeed: 0, bestChallenge: 0,
      correctCount: 0, adultUnlocked: false, muted: false
    };
    if (!str) { return base; }
    try {
      var p = JSON.parse(str);
      if (!p || typeof p !== 'object') { return base; }
      base.stars = p.stars || 0;
      base.stickers = p.stickers || [];
      base.streak = p.streak || 0;
      base.lastDaily = p.lastDaily || '';
      base.cleared = p.cleared || {};
      base.mistakes = p.mistakes || [];
      base.outfits = p.outfits || [];
      base.equipped = p.equipped || {};
      base.bestSpeed = p.bestSpeed || 0;
      base.bestChallenge = p.bestChallenge || 0;
      base.correctCount = p.correctCount || 0;
      base.adultUnlocked = !!p.adultUnlocked;
      base.muted = !!p.muted;
    } catch (e) { return base; }
    return base;
  }

  // Count total words across the world registry.
  function totalWordCount(worlds) {
    var t = 0;
    for (var i = 0; i < (worlds ? worlds.length : 0); i++) {
      t += (worlds[i].words ? worlds[i].words.length : 0);
    }
    return t;
  }

  /* ========================================================================
     PAYMENT PROVIDER STUB (default OFF). Prices only exposed when a host grants
     payment permission. Without permission, nothing is ever rendered.
     ======================================================================== */
  var PaymentProvider = {
    enabled: false, // DEFAULT OFF. No UI, no prices, unless a host enables it.
    prices_rmb: { world_pass: 6, sticker_pack: 3, adult_unlock: 12 },
    hasPermission: function () { return this.enabled === true; },
    purchase: function (sku) {
      // No real transaction in the stub; returns a harmless result object.
      if (!this.hasPermission()) { return { ok: false, reason: 'disabled' }; }
      return { ok: true, sku: sku };
    }
  };

  /* ========================================================================
     Everything below is browser-only. Guard so Node require does not throw.
     ======================================================================== */
  function initBrowser() {
    var doc = root.document;
    var WORLDS = root.WORLDS || [];
    var PHRASES = root.PHRASES || [];
    var DIALOGUES = root.DIALOGUES || {};

    /* ---------- storage with in-memory fallback ---------- */
    var memStore = {};
    var STORAGE_KEY = 'word_adventure_save_v1';
    function storeGet(key) {
      try {
        if (root.localStorage) {
          var v = root.localStorage.getItem(key);
          return (v == null) ? (memStore[key] == null ? null : memStore[key]) : v;
        }
      } catch (e) {}
      return memStore[key] == null ? null : memStore[key];
    }
    function storeSet(key, val) {
      memStore[key] = val;
      try { if (root.localStorage) { root.localStorage.setItem(key, val); } } catch (e) {}
    }

    var state = deserializeState(storeGet(STORAGE_KEY));
    function save() { storeSet(STORAGE_KEY, serializeState(state)); }

    /* ---------- audio (WebAudio synth, no files) ---------- */
    var AudioEngine = (function () {
      var ctx = null;
      var bgmTimer = null;
      function ac() {
        if (ctx) { return ctx; }
        try {
          var AC = root.AudioContext || root.webkitAudioContext;
          if (AC) { ctx = new AC(); }
        } catch (e) { ctx = null; }
        return ctx;
      }
      function beep(freq, dur, type, vol) {
        if (state.muted) { return; }
        var c = ac();
        if (!c) { return; }
        try {
          if (c.state === 'suspended' && c.resume) { c.resume(); }
          var o = c.createOscillator();
          var g = c.createGain();
          o.type = type || 'sine';
          o.frequency.value = freq;
          g.gain.value = vol == null ? 0.08 : vol;
          o.connect(g); g.connect(c.destination);
          var now = c.currentTime;
          g.gain.setValueAtTime(g.gain.value, now);
          g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
          o.start(now); o.stop(now + dur);
        } catch (e) {}
      }
      return {
        correct: function () { beep(660, 0.12, 'triangle'); setTimeout(function () { beep(880, 0.16, 'triangle'); }, 110); },
        wrong: function () { beep(200, 0.25, 'sawtooth', 0.06); },
        tap: function () { beep(520, 0.05, 'square', 0.04); },
        win: function () { var n = [523, 659, 784, 1046]; for (var i = 0; i < n.length; i++) { (function (f, d) { setTimeout(function () { beep(f, 0.18, 'triangle'); }, d); })(n[i], i * 140); } },
        startBgm: function () {
          if (bgmTimer || state.muted) { return; }
          var notes = [392, 440, 494, 523, 494, 440];
          var idx = 0;
          bgmTimer = setInterval(function () {
            if (state.muted) { return; }
            beep(notes[idx % notes.length], 0.3, 'sine', 0.025);
            idx++;
          }, 650);
        },
        stopBgm: function () { if (bgmTimer) { clearInterval(bgmTimer); bgmTimer = null; } }
      };
    })();

    /* ---------- speech synthesis with mandatory fallback chain ---------- */
    var Speech = (function () {
      var synth = root.speechSynthesis || null;
      function englishVoice() {
        if (!synth || !synth.getVoices) { return null; }
        var voices = synth.getVoices() || [];
        var i;
        for (i = 0; i < voices.length; i++) { if (/en[-_]US/i.test(voices[i].lang)) { return voices[i]; } }
        for (i = 0; i < voices.length; i++) { if (/en[-_]GB/i.test(voices[i].lang)) { return voices[i]; } }
        for (i = 0; i < voices.length; i++) { if (/^en/i.test(voices[i].lang)) { return voices[i]; } }
        return null;
      }
      function anyVoice() {
        if (!synth || !synth.getVoices) { return null; }
        var voices = synth.getVoices() || [];
        return voices.length ? voices[0] : null;
      }
      // Returns a capability string: 'english' | 'spell' | 'none'.
      function capability() {
        if (!synth) { return 'none'; }
        if (englishVoice()) { return 'english'; }
        if (anyVoice()) { return 'spell'; }
        // Voices may load late; if the API exists at all, assume it can speak.
        var v = synth.getVoices ? synth.getVoices() : [];
        return v.length === 0 ? 'english' : 'none';
      }
      function speakText(text, rate) {
        if (!synth || !root.SpeechSynthesisUtterance) { return false; }
        try {
          synth.cancel();
          var u = new root.SpeechSynthesisUtterance(text);
          u.rate = rate || 1.0;
          var ev = englishVoice();
          if (ev) { u.voice = ev; u.lang = ev.lang; } else { u.lang = 'en-US'; }
          synth.speak(u);
          return true;
        } catch (e) { return false; }
      }
      function spellOut(word) {
        if (!synth || !root.SpeechSynthesisUtterance) { return false; }
        try {
          synth.cancel();
          var letters = String(word).toUpperCase().split('');
          var any = anyVoice();
          for (var i = 0; i < letters.length; i++) {
            var u = new root.SpeechSynthesisUtterance(letters[i]);
            u.rate = 0.8;
            if (any) { u.voice = any; u.lang = any.lang; }
            synth.speak(u);
          }
          return true;
        } catch (e) { return false; }
      }
      return {
        capability: capability,
        // Returns 'spoke' | 'spelled' | 'nospeech'. 'nospeech' => caller must
        // show syllables + mouth hints and NEVER a fake playing state.
        pronounceWord: function (word, rate) {
          var cap = capability();
          if (cap === 'english') { return speakText(word, rate) ? 'spoke' : 'nospeech'; }
          if (cap === 'spell') { return spellOut(word) ? 'spelled' : 'nospeech'; }
          return 'nospeech';
        },
        pronounceSentence: function (text, rate) {
          var cap = capability();
          if (cap === 'english') { return speakText(text, rate) ? 'spoke' : 'nospeech'; }
          // No English voice: speak nothing misleading for a whole sentence.
          return 'nospeech';
        }
      };
    })();

    // Warm up voices (some browsers populate asynchronously).
    try { if (root.speechSynthesis && root.speechSynthesis.getVoices) { root.speechSynthesis.getVoices(); root.speechSynthesis.onvoiceschanged = function () {}; } } catch (e) {}

    /* ---------- unified pointer/touch handler + ghost-click dedupe ---------- */
    var lastTapTime = 0;
    function bindTap(el, handler) {
      if (!el) { return; }
      var fired = false;
      function run(ev) {
        var now = Date.now();
        // Ghost-click dedupe: ignore the synthetic mouse event following touch.
        if (now - lastTapTime < 400 && ev.type === 'click') { return; }
        if (ev.type === 'touchend') { lastTapTime = now; fired = true; }
        if (ev.type === 'click' && fired) { fired = false; return; }
        if (ev.cancelable) { ev.preventDefault(); }
        AudioEngine.tap();
        handler(ev);
      }
      // pointer events when present, else touch + click fallback.
      if (root.PointerEvent) {
        el.addEventListener('pointerup', function (ev) {
          if (ev.cancelable) { ev.preventDefault(); }
          AudioEngine.tap();
          handler(ev);
        });
      } else {
        el.addEventListener('touchend', run, { passive: false });
        el.addEventListener('click', run);
      }
    }

    /* ---------- tiny DOM helpers ---------- */
    function el(tag, cls, text) {
      var e = doc.createElement(tag);
      if (cls) { e.className = cls; }
      if (text != null) { e.textContent = text; }
      return e;
    }
    function clear(node) { while (node.firstChild) { node.removeChild(node.firstChild); } }

    /* ---------- lion mascot inline SVG ---------- */
    function lionSVG() {
      var eq = state.equipped || {};
      var hat = eq.hat ? '<ellipse cx="60" cy="18" rx="22" ry="8" fill="#e85d5d"/><rect x="48" y="4" width="24" height="16" rx="4" fill="#e85d5d"/>' : '';
      var scarf = eq.scarf ? '<rect x="40" y="88" width="40" height="10" rx="5" fill="#4a90e2"/>' : '';
      var glasses = eq.glasses ? '<circle cx="50" cy="56" r="9" fill="none" stroke="#333" stroke-width="2"/><circle cx="70" cy="56" r="9" fill="none" stroke="#333" stroke-width="2"/><line x1="59" y1="56" x2="61" y2="56" stroke="#333" stroke-width="2"/>' : '';
      return '<svg class="mascot" viewBox="0 0 120 120">' +
        '<circle cx="60" cy="60" r="40" fill="#f4a93c"/>' +
        '<g fill="#e08a1e">' +
        '<circle cx="24" cy="40" r="10"/><circle cx="96" cy="40" r="10"/><circle cx="30" cy="80" r="10"/><circle cx="90" cy="80" r="10"/>' +
        '<circle cx="18" cy="60" r="10"/><circle cx="102" cy="60" r="10"/><circle cx="60" cy="18" r="10"/><circle cx="60" cy="102" r="10"/>' +
        '</g>' +
        '<circle cx="60" cy="60" r="34" fill="#ffd27f"/>' +
        '<circle cx="50" cy="56" r="4" fill="#3a2a12"/><circle cx="70" cy="56" r="4" fill="#3a2a12"/>' +
        '<ellipse cx="60" cy="68" rx="6" ry="4" fill="#5a3b16"/>' +
        '<path d="M52 74 q8 8 16 0" stroke="#5a3b16" stroke-width="2" fill="none"/>' +
        glasses + hat + scarf +
        '</svg>';
    }

    function mascotStage(mood, bubble) {
      var stage = el('div', 'mascot-stage');
      var wrap = el('div', 'mascot-wrap' + (mood ? ' ' + mood : ''));
      wrap.innerHTML = lionSVG();
      stage.appendChild(wrap);
      var b = el('div', 'mascot-bubble', bubble || '');
      stage.appendChild(b);
      return { stage: stage, wrap: wrap, bubble: b };
    }

    /* ---------- celebration ---------- */
    function celebrate(big) {
      var layer = doc.getElementById('celebrate-layer');
      if (!layer) { return; }
      var colors = ['#ff6b6b', '#ffd166', '#06d6a0', '#4cc9f0', '#b388ff'];
      for (var i = 0; i < 24; i++) {
        var c = el('div', 'confetti');
        c.style.left = (Math.random() * 100) + '%';
        c.style.background = colors[i % colors.length];
        c.style.animationDelay = (Math.random() * 0.3) + 's';
        layer.appendChild(c);
        (function (node) { setTimeout(function () { if (node.parentNode) { node.parentNode.removeChild(node); } }, 1700); })(c);
      }
      if (big) {
        var star = el('div', 'big-celebrate', '🎉');
        doc.body.appendChild(star);
        setTimeout(function () { if (star.parentNode) { star.parentNode.removeChild(star); } }, 1300);
        AudioEngine.win();
      }
    }

    /* ---------- progress helpers ---------- */
    function kidWorlds() { return WORLDS.filter(function (w) { return w.group === 'kid'; }); }
    function adultWorlds() { return WORLDS.filter(function (w) { return w.group === 'adult'; }); }
    function otherGroups() {
      var seen = {}; var order = [];
      for (var i = 0; i < WORLDS.length; i++) {
        var g = WORLDS[i].group;
        if (g !== 'kid' && g !== 'adult' && !seen[g]) { seen[g] = true; order.push(g); }
      }
      return order;
    }
    function groupLabel(g) {
      var map = { spoken: '高频口语 Spoken', primary: '小学 Primary', middle: '初中 Middle', high: '高中 High', cet: '四六级 CET', ielts: '雅思托福 IELTS/TOEFL' };
      return map[g] || g;
    }
    function isCleared(w) { return !!state.cleared[w.key]; }
    function worldUnlocked(w) {
      if (w.group === 'adult' && !state.adultUnlocked) { return false; }
      return state.stars >= (w.star_req || 0);
    }

    function registerCorrect() {
      state.correctCount = (state.correctCount || 0) + 1;
      if (state.correctCount % 5 === 0) { celebrate(true); }
      save();
    }
    function addMistake(worldKey, word) {
      var item = scheduleReview({ key: worldKey + ':' + word, worldKey: worldKey, word: word }, false, Date.now());
      // replace existing or push
      var found = false;
      for (var i = 0; i < state.mistakes.length; i++) {
        if (state.mistakes[i].key === item.key) { state.mistakes[i] = scheduleReview(state.mistakes[i], false, Date.now()); found = true; break; }
      }
      if (!found) { state.mistakes.push(item); }
      save();
    }
    function findWordEntry(worldKey, word) {
      for (var i = 0; i < WORLDS.length; i++) {
        if (WORLDS[i].key === worldKey) {
          for (var j = 0; j < WORLDS[i].words.length; j++) {
            if (WORLDS[i].words[j].word === word) { return WORLDS[i].words[j]; }
          }
        }
      }
      return null;
    }

    var STICKERS = ['🦁', '🐯', '🐼', '🦊', '🐸', '🐵', '🐙', '🦄', '🐝', '🦋', '🐬', '🦉', '🐧', '🦜', '🐢', '🦕', '🌟', '🏆', '🎈', '🍭', '🚀', '🎨', '🎸', '⚽', '🍉', '🌈', '👑'];
    function stickerFor(index) { return STICKERS[index % STICKERS.length]; }

    function clearWorld(w) {
      if (isCleared(w)) { return; }
      state.cleared[w.key] = true;
      state.stars = (state.stars || 0) + 3;
      var idx = Object.keys(state.cleared).length - 1;
      var st = stickerFor(idx);
      if (state.stickers.indexOf(st) === -1) { state.stickers.push(st); }
      save();
      celebrate(true);
    }

    /* ---------- router ---------- */
    var app = doc.getElementById('app');
    var currentNav = 'home';
    function go(screenFn, nav) {
      if (nav) { currentNav = nav; }
      clear(app);
      app.appendChild(topbar());
      var scr = el('div', 'screen');
      app.appendChild(scr);
      screenFn(scr);
      app.appendChild(bottomnav());
      scr.scrollTop = 0;
    }

    function topbar() {
      var bar = el('div', 'topbar');
      var t = el('div', 'title');
      t.innerHTML = 'Word Adventure<small>《单词大冒险》</small>';
      bar.appendChild(t);
      var star = el('div', 'pill', '⭐ ' + (state.stars || 0));
      var streak = el('div', 'pill', '🔥 ' + (state.streak || 0));
      var mute = el('div', 'pill', state.muted ? '🔇' : '🔊');
      bindTap(mute, function () {
        state.muted = !state.muted;
        if (state.muted) { AudioEngine.stopBgm(); } else { AudioEngine.startBgm(); }
        mute.textContent = state.muted ? '🔇' : '🔊';
        save();
      });
      bar.appendChild(star); bar.appendChild(streak); bar.appendChild(mute);
      return bar;
    }

    function bottomnav() {
      var nav = el('div', 'bottomnav');
      var items = [
        { k: 'home', i: '🗺️', l: '地图 Map', fn: screenHome },
        { k: 'stickers', i: '🏅', l: '贴纸 Stickers', fn: screenStickers },
        { k: 'store', i: '🎩', l: '装扮 Dress', fn: screenStore },
        { k: 'phrases', i: '💬', l: '口语 Phrases', fn: screenPhrases }
      ];
      for (var i = 0; i < items.length; i++) {
        (function (it) {
          var n = el('div', 'nav' + (currentNav === it.k ? ' active' : ''));
          n.innerHTML = '<span class="i">' + it.i + '</span>' + it.l;
          bindTap(n, function () { go(it.fn, it.k); });
          nav.appendChild(n);
        })(items[i]);
      }
      return nav;
    }

    /* ================= HOME ================= */
    function screenHome(scr) {
      scr.appendChild(buildHomeHeader());
      // Mascot at current progress point.
      var kw = kidWorlds();
      var clearedCount = 0;
      for (var i = 0; i < kw.length; i++) { if (isCleared(kw[i])) { clearedCount++; } }
      var m = mascotStage('', clearedCount >= kw.length ? '太棒了！全部通关！All done!' : '一起去冒险吧！Let us go!');
      scr.appendChild(m.stage);

      // Quick-play menu (all real entries).
      var grid = el('div', 'menu-grid');
      var entries = [
        { ic: '⚡', n: '极速挑战<small>Speed 60s</small>', fn: screenSpeedIntro },
        { ic: '🚂', n: '句子火车<small>Sentence Train</small>', fn: screenTrainIntro },
        { ic: '📖', n: '错题本<small>Mistake Book</small>', fn: screenMistakeIntro },
        { ic: '📅', n: '每日练习<small>Daily 10</small>', fn: screenDailyIntro },
        { ic: '🎬', n: '无字幕挑战<small>No-Subtitle</small>', fn: screenNoSubIntro },
        { ic: '💬', n: '日常口语<small>Daily Phrases</small>', fn: screenPhrases }
      ];
      for (var e = 0; e < entries.length; e++) {
        (function (en) {
          var card = el('div', 'menu-card');
          card.innerHTML = '<div class="ic">' + en.ic + '</div><div class="n">' + en.n + '</div>';
          bindTap(card, function () { go(en.fn, 'home'); });
          grid.appendChild(card);
        })(entries[e]);
      }
      scr.appendChild(grid);

      // Adult-mode toggle.
      var tog = el('div', 'toggle-row');
      tog.innerHTML = '<span class="lab">成人模式 Adult Mode</span>';
      var sw = el('div', 'sw' + (state.adultUnlocked ? ' on' : ''));
      sw.innerHTML = '<span class="knob"></span>';
      bindTap(sw, function () {
        state.adultUnlocked = !state.adultUnlocked;
        sw.className = 'sw' + (state.adultUnlocked ? ' on' : '');
        save();
        go(screenHome, 'home');
      });
      tog.appendChild(sw);
      scr.appendChild(tog);

      // Kids Route.
      scr.appendChild(routeSection('🧒 儿童路线 Kids Route', kidWorlds()));
      // Adult worlds (only when toggle on).
      if (state.adultUnlocked) {
        scr.appendChild(routeSection('🧑 成人世界 Adult Worlds', adultWorlds()));
      }
      // Level Route for any other groups that exist (grows file by file).
      var og = otherGroups();
      for (var g = 0; g < og.length; g++) {
        var list = WORLDS.filter(function (w) { return w.group === og[g]; });
        scr.appendChild(routeSection('📚 ' + groupLabel(og[g]), list));
      }

      // Payment entries ONLY if a host granted permission (default hidden).
      if (PaymentProvider.hasPermission()) {
        var pay = el('div', 'route-section');
        pay.appendChild(el('h3', null, '商店 Shop'));
        var skus = [
          { k: 'world_pass', l: '世界通行证 World Pass' },
          { k: 'sticker_pack', l: '贴纸包 Sticker Pack' },
          { k: 'adult_unlock', l: '成人世界 Adult Unlock' }
        ];
        for (var s = 0; s < skus.length; s++) {
          (function (sk) {
            var it = el('div', 'store-item');
            it.innerHTML = '<div class="em">🛒</div><div class="info"><b>' + sk.l + '</b><small>¥' + PaymentProvider.prices_rmb[sk.k] + '</small></div>';
            var b = el('button', 'btn small', '购买');
            bindTap(b, function () { PaymentProvider.purchase(sk.k); });
            it.appendChild(b);
            pay.appendChild(it);
          })(skus[s]);
        }
        scr.appendChild(pay);
      }
    }

    function buildHomeHeader() {
      var box = el('div');
      var kw = kidWorlds();
      var cleared = 0;
      for (var i = 0; i < kw.length; i++) { if (isCleared(kw[i])) { cleared++; } }
      box.appendChild(el('h2', null, '世界地图 World Map'));
      var bar = el('div', 'bar');
      var span = el('span');
      span.style.width = (kw.length ? Math.round(cleared / kw.length * 100) : 0) + '%';
      bar.appendChild(span);
      box.appendChild(bar);
      box.appendChild(el('div', 'sub', '已通关 ' + cleared + ' / ' + kw.length + ' 个世界 · ⭐' + (state.stars || 0) + ' · 连续 ' + (state.streak || 0) + ' 天'));
      return box;
    }

    function routeSection(title, list) {
      var sec = el('div', 'route-section');
      sec.appendChild(el('h3', null, title));
      var route = el('div', 'route');
      var firstUncleared = null;
      for (var i = 0; i < list.length; i++) { if (!isCleared(list[i]) && worldUnlocked(list[i]) && firstUncleared == null) { firstUncleared = list[i].key; } }
      for (var j = 0; j < list.length; j++) {
        (function (w) {
          var unlocked = worldUnlocked(w);
          var node = el('div', 'world-node' + (unlocked ? '' : ' locked'));
          var html = '<div class="wemoji">' + (w.emoji || '🌍') + '</div>' +
            '<div class="wname">' + w.name_en + '<small>' + w.name_zh + '</small></div>';
          if (isCleared(w)) { html += '<div class="cleared">⭐</div>'; }
          if (!unlocked) { html += '<div class="lock">🔒 需 ' + (w.star_req || 0) + '⭐</div>'; }
          node.innerHTML = html;
          if (w.key === firstUncleared) {
            var mh = el('div', 'mascot-here', '🦁');
            node.appendChild(mh);
          }
          if (unlocked) { bindTap(node, function () { go(function (s) { screenWorld(s, w); }, 'home'); }); }
          route.appendChild(node);
        })(list[j]);
      }
      sec.appendChild(route);
      return sec;
    }

    /* ================= WORLD MENU (4 modes + listening) ================= */
    function screenWorld(scr, w) {
      scr.appendChild(backBtn(function () { go(screenHome, 'home'); }));
      scr.appendChild(el('h2', null, (w.emoji || '') + ' ' + w.name_en + ' / ' + w.name_zh));
      scr.appendChild(el('div', 'sub', '共 ' + w.words.length + ' 个单词 · ' + (isCleared(w) ? '已通关 ✅' : '通关可得一枚贴纸 🏅')));
      var modes = [
        { ic: '🃏', n: '单词卡片<small>Word Cards</small>', fn: function (s) { modeWordCards(s, w); } },
        { ic: '🎧', n: '听音辨图<small>Listening Quiz</small>', fn: function (s) { modeListening(s, w); } },
        { ic: '🔤', n: '拼字积木<small>Spelling Blocks</small>', fn: function (s) { modeSpelling(s, w); } },
        { ic: '🧩', n: '配对消消<small>Matching Pairs</small>', fn: function (s) { modeMatching(s, w); } },
        { ic: '🎬', n: '动画听力<small>Cartoon Listening</small>', fn: function (s) { modeCartoon(s, w); } }
      ];
      var grid = el('div', 'menu-grid');
      for (var i = 0; i < modes.length; i++) {
        (function (md) {
          var card = el('div', 'menu-card');
          card.innerHTML = '<div class="ic">' + md.ic + '</div><div class="n">' + md.n + '</div>';
          bindTap(card, function () { go(function (s) { md.fn(s); }, 'home'); });
          grid.appendChild(card);
        })(modes[i]);
      }
      scr.appendChild(grid);
      var finish = el('button', 'btn green', isCleared(w) ? '已通关 Completed' : '完成本世界 Finish & Clear ⭐');
      if (isCleared(w)) { finish.setAttribute('disabled', 'disabled'); }
      bindTap(finish, function () {
        if (isCleared(w)) { return; }
        clearWorld(w);
        go(function (s) { screenWorld(s, w); }, 'home');
      });
      scr.appendChild(finish);
    }

    function backBtn(fn) {
      var b = el('button', 'btn ghost small', '← 返回 Back');
      bindTap(b, fn);
      return b;
    }

    /* ---- speaker control with fallback chain rendering ---- */
    function speakerControl(wordEntry, rate) {
      var box = el('div');
      var btn = el('button', 'btn secondary', '🔊 发音 Say it');
      var hint = el('div', 'hint-box');
      hint.style.display = 'none';
      bindTap(btn, function () {
        var res = Speech.pronounceWord(wordEntry.word, rate);
        if (res === 'nospeech') {
          // Never show a fake playing state: just syllables + mouth hints.
          hint.style.display = 'block';
          hint.innerHTML = '🗣️ 本设备无语音，看音节跟读：<b>' + (wordEntry.syllables || wordEntry.word) + '</b><br>口型提示 Mouth: 慢慢念出每个音节。';
        } else {
          hint.style.display = 'none';
        }
      });
      box.appendChild(btn);
      box.appendChild(hint);
      return box;
    }

    /* ================= MODE 1: WORD CARDS ================= */
    function modeWordCards(scr, w) {
      var idx = 0;
      scr.appendChild(backBtn(function () { go(function (s) { screenWorld(s, w); }, 'home'); }));
      var holder = el('div');
      scr.appendChild(holder);
      function render() {
        clear(holder);
        var we = w.words[idx];
        var card = el('div', 'wordcard');
        card.innerHTML = '<div class="big-emoji">' + (we.emoji || '🔤') + '</div>' +
          '<div class="big-word">' + we.word + '</div>' +
          '<div class="syll">' + (we.syllables || we.word) + '</div>' +
          '<div class="meaning">' + we.meaning + '</div>';
        var sent = el('div', 'sentence');
        sent.innerHTML = '🔊 ' + we.sentence + '<span class="zh">' + we.sentence_zh + '</span>';
        bindTap(sent, function () {
          var res = Speech.pronounceSentence(we.sentence);
          if (res === 'nospeech') {
            sent.innerHTML = '（本设备无英文语音，请看音节朗读） ' + we.sentence + '<span class="zh">' + we.sentence_zh + '</span>';
          }
        });
        card.appendChild(sent);
        holder.appendChild(card);
        holder.appendChild(speakerControl(we));
        // slow-replay for the sentence
        var slow = el('button', 'btn ghost small', '🐢 慢速句子 Slow');
        bindTap(slow, function () {
          var res = Speech.pronounceSentence(we.sentence, 0.6);
          if (res === 'nospeech') { sent.innerHTML = '（无语音，看音节） ' + we.sentence + '<span class="zh">' + we.sentence_zh + '</span>'; }
        });
        holder.appendChild(slow);
        var nav = el('div', 'btn-row');
        var prev = el('button', 'btn ghost', '上一个 Prev');
        var next = el('button', 'btn', '下一个 Next →');
        bindTap(prev, function () { idx = (idx - 1 + w.words.length) % w.words.length; render(); });
        bindTap(next, function () { idx = (idx + 1) % w.words.length; render(); });
        nav.appendChild(prev); nav.appendChild(next);
        holder.appendChild(nav);
        holder.appendChild(el('div', 'sub', (idx + 1) + ' / ' + w.words.length));
      }
      render();
    }

    /* ================= MODE 2: LISTENING QUIZ ================= */
    function modeListening(scr, w) {
      scr.appendChild(backBtn(function () { go(function (s) { screenWorld(s, w); }, 'home'); }));
      var showZh = false;
      var holder = el('div');
      scr.appendChild(holder);
      var order = shuffle(w.words).slice(0, Math.min(10, w.words.length));
      var pos = 0, score = 0;
      function render() {
        clear(holder);
        if (pos >= order.length) {
          holder.appendChild(el('h2', null, '完成 Done! ' + score + '/' + order.length));
          holder.appendChild(mascotStage('dance', '太棒了！Great!').stage);
          var again = el('button', 'btn', '再来一次 Again');
          bindTap(again, function () { go(function (s) { modeListening(s, w); }, 'home'); });
          holder.appendChild(again);
          return;
        }
        var we = order[pos];
        holder.appendChild(el('h2', null, '听音辨图 Listening ' + (pos + 1) + '/' + order.length));
        var play = el('button', 'btn secondary', '🔊 再听一次 Play word');
        var hint = el('div', 'hint-box'); hint.style.display = 'none';
        bindTap(play, function () {
          var res = Speech.pronounceWord(we.word);
          if (res === 'nospeech') { hint.style.display = 'block'; hint.innerHTML = '无语音，提示音节：<b>' + (we.syllables || we.word) + '</b>'; }
        });
        holder.appendChild(play);
        holder.appendChild(hint);
        // toggle Chinese meanings
        var tog = el('button', 'btn ghost small', showZh ? '隐藏中文 Hide 中文' : '显示中文 Show 中文');
        bindTap(tog, function () { showZh = !showZh; render(); });
        holder.appendChild(tog);
        // auto play
        Speech.pronounceWord(we.word);
        var opts = generateQuizOptions(w, we, 4);
        var grid = el('div', 'opt-grid');
        var answered = false;
        for (var i = 0; i < opts.length; i++) {
          (function (o) {
            var cell = el('div', 'opt');
            cell.innerHTML = (o.emoji || '🔤') + (showZh ? '<span class="lbl">' + o.meaning + '</span>' : '');
            bindTap(cell, function () {
              if (answered) { return; }
              answered = true;
              if (o.word === we.word) {
                cell.className = 'opt right'; AudioEngine.correct(); score++; registerCorrect();
              } else {
                cell.className = 'opt wrong'; AudioEngine.wrong(); addMistake(w.key, we.word);
              }
              setTimeout(function () { pos++; render(); }, 650);
            });
            grid.appendChild(cell);
          })(opts[i]);
        }
        holder.appendChild(grid);
      }
      render();
    }

    /* ================= MODE 3: SPELLING BLOCKS ================= */
    function modeSpelling(scr, w) {
      scr.appendChild(backBtn(function () { go(function (s) { screenWorld(s, w); }, 'home'); }));
      var order = shuffle(w.words).slice(0, Math.min(10, w.words.length));
      var pos = 0, score = 0;
      var holder = el('div');
      scr.appendChild(holder);
      function render() {
        clear(holder);
        if (pos >= order.length) {
          holder.appendChild(el('h2', null, '完成 Done! ' + score + '/' + order.length));
          holder.appendChild(mascotStage('dance', '拼得真好！Nice spelling!').stage);
          var again = el('button', 'btn', '再来一次 Again');
          bindTap(again, function () { go(function (s) { modeSpelling(s, w); }, 'home'); });
          holder.appendChild(again);
          return;
        }
        var we = order[pos];
        holder.appendChild(el('h2', null, '拼字积木 Spelling ' + (pos + 1) + '/' + order.length));
        var card = el('div', 'wordcard');
        card.innerHTML = '<div class="big-emoji">' + (we.emoji || '🔤') + '</div><div class="meaning">' + we.meaning + '</div>';
        holder.appendChild(card);
        var hintBox = el('div', 'hint-box', '💡 音节提示 Syllables: ' + (we.syllables || we.word));
        hintBox.style.display = 'none';
        var hintBtn = el('button', 'btn ghost small', '💡 音节提示 Hint');
        bindTap(hintBtn, function () { hintBox.style.display = 'block'; });
        holder.appendChild(hintBtn);
        holder.appendChild(hintBox);

        var answer = we.word.toLowerCase();
        var slotsWrap = el('div', 'spell-slots');
        var built = [];
        var slotEls = [];
        for (var i = 0; i < answer.length; i++) {
          var sl = el('div', 'slot');
          slotsWrap.appendChild(sl); slotEls.push(sl);
        }
        holder.appendChild(slotsWrap);

        var tilesWrap = el('div', 'tiles');
        var letters = shuffle(answer.split(''));
        for (var t = 0; t < letters.length; t++) {
          (function (ch) {
            var tile = el('div', 'tile', ch);
            bindTap(tile, function () {
              if (tile.className.indexOf('used') !== -1) { return; }
              if (built.length >= answer.length) { return; }
              tile.className = 'tile used';
              built.push({ ch: ch, tile: tile });
              var slot = slotEls[built.length - 1];
              slot.className = 'slot filled'; slot.textContent = ch;
              if (built.length === answer.length) {
                var guess = '';
                for (var b = 0; b < built.length; b++) { guess += built[b].ch; }
                if (checkSpelling(guess, we.word)) {
                  AudioEngine.correct(); score++; registerCorrect();
                  setTimeout(function () { pos++; render(); }, 650);
                } else {
                  AudioEngine.wrong(); addMistake(w.key, we.word);
                  for (var s2 = 0; s2 < slotEls.length; s2++) { slotEls[s2].className = 'slot'; slotEls[s2].textContent = ''; }
                  for (var u = 0; u < built.length; u++) { built[u].tile.className = 'tile'; }
                  built = [];
                }
              }
            });
            tilesWrap.appendChild(tile);
          })(letters[t]);
        }
        holder.appendChild(tilesWrap);
        var clearB = el('button', 'btn ghost small', '🧹 清空 Clear');
        bindTap(clearB, function () {
          for (var s3 = 0; s3 < slotEls.length; s3++) { slotEls[s3].className = 'slot'; slotEls[s3].textContent = ''; }
          for (var u2 = 0; u2 < built.length; u2++) { built[u2].tile.className = 'tile'; }
          built = [];
        });
        holder.appendChild(clearB);
      }
      render();
    }

    /* ================= MODE 4: MATCHING PAIRS ================= */
    function modeMatching(scr, w) {
      scr.appendChild(backBtn(function () { go(function (s) { screenWorld(s, w); }, 'home'); }));
      scr.appendChild(el('h2', null, '配对消消 Matching'));
      scr.appendChild(el('div', 'sub', '点单词卡再点对应的意思卡 Match word with meaning'));
      var pick = shuffle(w.words).slice(0, Math.min(5, w.words.length));
      var left = shuffle(pick.map(function (x) { return { type: 'word', word: x.word, label: x.word }; }));
      var right = shuffle(pick.map(function (x) { return { type: 'mean', word: x.word, label: (x.emoji || '') + ' ' + x.meaning }; }));
      var grid = el('div', 'match-grid');
      var selected = null;
      var remaining = pick.length;
      var holder = el('div');
      function makeCol(items) {
        var frag = [];
        for (var i = 0; i < items.length; i++) {
          (function (it) {
            var card = el('div', 'match-card');
            card.innerHTML = it.label;
            card._data = it;
            card._el = card;
            bindTap(card, function () {
              if (card.className.indexOf('done') !== -1) { return; }
              if (!selected) {
                selected = { it: it, card: card }; card.className = 'match-card sel'; return;
              }
              if (selected.card === card) { selected.card.className = 'match-card'; selected = null; return; }
              if (selected.it.word === it.word && selected.it.type !== it.type) {
                selected.card.className = 'match-card done'; card.className = 'match-card done';
                selected = null; remaining--; AudioEngine.correct(); registerCorrect();
                if (remaining === 0) {
                  holder.appendChild(el('div', 'banner good', '全部配对成功！All matched! 🎉'));
                  var again = el('button', 'btn', '再来一组 Again');
                  bindTap(again, function () { go(function (s) { modeMatching(s, w); }, 'home'); });
                  holder.appendChild(again);
                }
              } else {
                AudioEngine.wrong(); addMistake(w.key, selected.it.word);
                selected.card.className = 'match-card'; selected = null;
              }
            });
            grid.appendChild(card);
          })(items[i]);
        }
        return frag;
      }
      // interleave left/right into a 2-col grid
      var maxLen = Math.max(left.length, right.length);
      var merged = [];
      for (var i = 0; i < maxLen; i++) { if (left[i]) { merged.push(left[i]); } if (right[i]) { merged.push(right[i]); } }
      makeCol(merged);
      scr.appendChild(grid);
      scr.appendChild(holder);
    }

    /* ================= CARTOON LISTENING ================= */
    function modeCartoon(scr, w) {
      scr.appendChild(backBtn(function () { go(function (s) { screenWorld(s, w); }, 'home'); }));
      var dlgs = (DIALOGUES && DIALOGUES[w.key]) ? DIALOGUES[w.key] : [];
      if (!dlgs.length) {
        scr.appendChild(el('h2', null, '动画听力 Cartoon Listening'));
        scr.appendChild(el('div', 'hint-box', '本世界暂无动画对话 No dialogues for this world yet.'));
        return;
      }
      var di = 0;
      var holder = el('div');
      scr.appendChild(holder);
      function playDialogue(d, rate) {
        // Speak each line in sequence; if no english voice, caller shows note.
        var cap = Speech.capability();
        if (cap !== 'english') { return 'nospeech'; }
        try {
          root.speechSynthesis.cancel();
          for (var i = 0; i < d.lines.length; i++) {
            var u = new root.SpeechSynthesisUtterance(d.lines[i].en);
            u.rate = rate || 1.0; u.lang = 'en-US';
            root.speechSynthesis.speak(u);
          }
          return 'spoke';
        } catch (e) { return 'nospeech'; }
      }
      function renderListen(d) {
        clear(holder);
        holder.appendChild(el('h2', null, '🎬 ' + d.title_en + ' / ' + d.title_zh));
        holder.appendChild(el('div', 'sub', '先只听声音，不看字幕 Listen only, no text'));
        holder.appendChild(mascotStage('', '🎧 认真听...').stage);
        var note = el('div', 'hint-box'); note.style.display = 'none';
        var play = el('button', 'btn secondary', '🔊 播放对话 Play');
        bindTap(play, function () { if (playDialogue(d) === 'nospeech') { note.style.display = 'block'; note.textContent = '本设备无英文语音，直接看下方问题与字幕。'; } });
        var slow = el('button', 'btn ghost small', '🐢 慢速 Slow');
        bindTap(slow, function () { if (playDialogue(d, 0.6) === 'nospeech') { note.style.display = 'block'; note.textContent = '本设备无英文语音。'; } });
        holder.appendChild(play); holder.appendChild(slow); holder.appendChild(note);
        var next = el('button', 'btn green', '去回答问题 Questions →');
        bindTap(next, function () { renderQuestions(d, 0, 0); });
        holder.appendChild(next);
        // auto play once
        playDialogue(d);
      }
      function renderQuestions(d, qi, correct) {
        clear(holder);
        var qs = d.questions || [];
        if (qi >= qs.length) { renderTranscript(d, correct, qs.length); return; }
        var q = qs[qi];
        holder.appendChild(el('h2', null, '问题 Question ' + (qi + 1) + '/' + qs.length));
        holder.appendChild(el('div', 'wordcard', q.q));
        var grid = el('div', 'opt-grid');
        var answered = false;
        for (var i = 0; i < q.opts.length; i++) {
          (function (opt, idx) {
            var cell = el('div', 'opt', opt);
            bindTap(cell, function () {
              if (answered) { return; }
              answered = true;
              if (idx === q.a) { cell.className = 'opt right'; AudioEngine.correct(); registerCorrect(); correct++; }
              else { cell.className = 'opt wrong'; AudioEngine.wrong(); }
              setTimeout(function () { renderQuestions(d, qi + 1, correct); }, 650);
            });
            grid.appendChild(cell);
          })(q.opts[i], i);
        }
        holder.appendChild(grid);
      }
      function renderTranscript(d, correct, total) {
        clear(holder);
        holder.appendChild(el('h2', null, '字幕 Transcript · ' + correct + '/' + total));
        for (var i = 0; i < d.lines.length; i++) {
          var r = el('div', 'row');
          r.innerHTML = '<div class="txt"><b>' + d.lines[i].s + ': ' + d.lines[i].en + '</b><span class="zh">' + d.lines[i].zh + '</span></div>';
          holder.appendChild(r);
        }
        var replay = el('button', 'btn secondary', '🔁 重听 Replay');
        bindTap(replay, function () { playDialogue(d); });
        holder.appendChild(replay);
        di++;
        if (di < dlgs.length) {
          var nxt = el('button', 'btn', '下一段 Next scene →');
          bindTap(nxt, function () { renderListen(dlgs[di]); });
          holder.appendChild(nxt);
        } else {
          var done = el('button', 'btn green', '完成 Done');
          bindTap(done, function () { go(function (s) { screenWorld(s, w); }, 'home'); });
          holder.appendChild(done);
        }
      }
      renderListen(dlgs[di]);
    }

    /* ================= NO-SUBTITLE CHALLENGE ================= */
    function screenNoSubIntro(scr) {
      scr.appendChild(backBtn(function () { go(screenHome, 'home'); }));
      scr.appendChild(el('h2', null, '🎬 无字幕挑战 No-Subtitle Challenge'));
      scr.appendChild(el('div', 'sub', '只听声音回答问题，按关卡计分 Audio-only, graded by level'));
      scr.appendChild(el('div', 'hint-box', '历史最高 Best: ' + (state.bestChallenge || 0)));
      // gather scenes across unlocked kid worlds
      var scenes = [];
      var kw = kidWorlds();
      for (var i = 0; i < kw.length; i++) {
        if (!worldUnlocked(kw[i])) { continue; }
        var arr = (DIALOGUES && DIALOGUES[kw[i].key]) ? DIALOGUES[kw[i].key] : [];
        for (var j = 0; j < arr.length; j++) { scenes.push(arr[j]); }
      }
      if (!scenes.length) {
        scr.appendChild(el('div', 'hint-box', '暂无可用场景 No scenes available.'));
        return;
      }
      var start = el('button', 'btn green', '开始挑战 Start (' + Math.min(5, scenes.length) + ' 关)');
      bindTap(start, function () { runNoSub(shuffle(scenes).slice(0, 5)); });
      scr.appendChild(start);
    }
    function runNoSub(scenes) {
      go(function (scr) {
        scr.appendChild(backBtn(function () { go(screenNoSubIntro, 'home'); }));
        var holder = el('div');
        scr.appendChild(holder);
        var si = 0, score = 0;
        function speakScene(d, rate) {
          if (Speech.capability() !== 'english') { return 'nospeech'; }
          try {
            root.speechSynthesis.cancel();
            for (var i = 0; i < d.lines.length; i++) {
              var u = new root.SpeechSynthesisUtterance(d.lines[i].en);
              u.rate = rate || 1.0; u.lang = 'en-US';
              root.speechSynthesis.speak(u);
            }
            return 'spoke';
          } catch (e) { return 'nospeech'; }
        }
        function scene() {
          clear(holder);
          if (si >= scenes.length) {
            holder.appendChild(el('h2', null, '挑战结束 Finished! 得分 ' + score));
            if (score > (state.bestChallenge || 0)) { state.bestChallenge = score; save(); holder.appendChild(el('div', 'banner good', '新纪录 New best! 🏆')); }
            holder.appendChild(mascotStage(score > 0 ? 'dance' : 'comfort', '').stage);
            var again = el('button', 'btn', '再来 Again');
            bindTap(again, function () { go(screenNoSubIntro, 'home'); });
            holder.appendChild(again);
            return;
          }
          var d = scenes[si];
          holder.appendChild(el('h2', null, '第 ' + (si + 1) + ' 关 Level ' + (si + 1)));
          holder.appendChild(el('div', 'sub', '仔细听，不看字幕 Listen carefully'));
          var note = el('div', 'hint-box'); note.style.display = 'none';
          var play = el('button', 'btn secondary', '🔊 播放 Play');
          bindTap(play, function () { if (speakScene(d) === 'nospeech') { note.style.display = 'block'; note.textContent = '本设备无英文语音，请凭问题选图。'; } });
          var slow = el('button', 'btn ghost small', '🐢 慢速 Slow');
          bindTap(slow, function () { if (speakScene(d, 0.6) === 'nospeech') { note.style.display = 'block'; note.textContent = '本设备无英文语音。'; } });
          holder.appendChild(play); holder.appendChild(slow); holder.appendChild(note);
          var q = (d.questions && d.questions[0]) ? d.questions[0] : null;
          if (!q) { si++; scene(); return; }
          holder.appendChild(el('div', 'wordcard', q.q));
          var grid = el('div', 'opt-grid');
          var answered = false;
          for (var i = 0; i < q.opts.length; i++) {
            (function (opt, idx) {
              var cell = el('div', 'opt', opt);
              bindTap(cell, function () {
                if (answered) { return; } answered = true;
                if (idx === q.a) { cell.className = 'opt right'; AudioEngine.correct(); score++; registerCorrect(); }
                else { cell.className = 'opt wrong'; AudioEngine.wrong(); }
                setTimeout(function () { si++; scene(); }, 700);
              });
              grid.appendChild(cell);
            })(q.opts[i], i);
          }
          holder.appendChild(grid);
          speakScene(d);
        }
        scene();
      }, 'home');
    }

    /* ================= SPEED CHALLENGE ================= */
    function allWords() {
      var out = [];
      for (var i = 0; i < WORLDS.length; i++) {
        if (WORLDS[i].group === 'adult' && !state.adultUnlocked) { continue; }
        for (var j = 0; j < WORLDS[i].words.length; j++) { out.push({ w: WORLDS[i].words[j], world: WORLDS[i] }); }
      }
      return out;
    }
    function screenSpeedIntro(scr) {
      scr.appendChild(backBtn(function () { go(screenHome, 'home'); }));
      scr.appendChild(el('h2', null, '⚡ 极速挑战 Speed Challenge'));
      scr.appendChild(el('div', 'sub', '60 秒内看单词选中文意思 Pick the meaning in 60s'));
      scr.appendChild(el('div', 'hint-box', '历史最高 Best: ' + (state.bestSpeed || 0)));
      var start = el('button', 'btn green', '开始 Start');
      bindTap(start, function () { runSpeed(); });
      scr.appendChild(start);
    }
    function runSpeed() {
      go(function (scr) {
        var holder = el('div');
        scr.appendChild(holder);
        var pool = allWords();
        var score = 0, timeLeft = 60, done = false;
        var timerEl = el('div', 'banner', '⏱️ 60');
        function tick() {
          if (done) { return; }
          timeLeft--;
          timerEl.textContent = '⏱️ ' + timeLeft;
          if (timeLeft <= 0) { finish(); return; }
          setTimeout(tick, 1000);
        }
        function finish() {
          done = true; clear(holder);
          holder.appendChild(el('h2', null, '时间到 Time up! 得分 ' + score));
          if (score > (state.bestSpeed || 0)) { state.bestSpeed = score; save(); holder.appendChild(el('div', 'banner good', '新纪录 New best! 🏆')); }
          holder.appendChild(mascotStage(score > 0 ? 'dance' : 'comfort', '').stage);
          var again = el('button', 'btn', '再来 Again');
          bindTap(again, function () { go(screenSpeedIntro, 'home'); });
          holder.appendChild(again);
        }
        function q() {
          if (done) { return; }
          clear(holder);
          holder.appendChild(timerEl);
          holder.appendChild(el('div', 'banner', '得分 ' + score));
          var pick = pool[Math.floor(Math.random() * pool.length)];
          var we = pick.w;
          holder.appendChild(el('div', 'wordcard', we.word));
          // 4 meaning options
          var opts = generateQuizOptions(pick.world, we, 4);
          var grid = el('div', 'opt-grid');
          var answered = false;
          for (var i = 0; i < opts.length; i++) {
            (function (o) {
              var cell = el('div', 'opt');
              cell.innerHTML = '<span class="lbl">' + o.meaning + '</span>';
              bindTap(cell, function () {
                if (answered) { return; } answered = true;
                if (o.word === we.word) { cell.className = 'opt right'; score++; AudioEngine.correct(); registerCorrect(); }
                else { cell.className = 'opt wrong'; AudioEngine.wrong(); }
                setTimeout(q, 250);
              });
              grid.appendChild(cell);
            })(opts[i]);
          }
          holder.appendChild(grid);
        }
        q(); setTimeout(tick, 1000);
      }, 'home');
    }

    /* ================= SENTENCE TRAIN ================= */
    function screenTrainIntro(scr) {
      scr.appendChild(backBtn(function () { go(screenHome, 'home'); }));
      scr.appendChild(el('h2', null, '🚂 句子火车 Sentence Train'));
      scr.appendChild(el('div', 'sub', '把打乱的单词排成正确的句子 Arrange the words'));
      var start = el('button', 'btn green', '开始 Start');
      bindTap(start, function () { runTrain(); });
      scr.appendChild(start);
    }
    function runTrain() {
      go(function (scr) {
        scr.appendChild(backBtn(function () { go(screenTrainIntro, 'home'); }));
        var pool = allWords();
        var rounds = 0;
        var holder = el('div');
        scr.appendChild(holder);
        function round() {
          clear(holder);
          var pick = pool[Math.floor(Math.random() * pool.length)];
          var sentence = pick.w.sentence.replace(/[.!?]$/, '');
          var words = sentence.split(/\s+/);
          holder.appendChild(el('h2', null, '句子火车 Sentence Train'));
          holder.appendChild(el('div', 'hint-box', '中文 ' + pick.w.sentence_zh));
          var target = el('div', 'train-target');
          var pool2 = el('div', 'train-pool');
          var placed = [];
          holder.appendChild(target);
          holder.appendChild(pool2);
          var shuffled = shuffle(words);
          var banner = el('div', 'banner');
          function checkDone() {
            if (placed.length === words.length) {
              var guess = placed.join(' ');
              if (guess === words.join(' ')) {
                banner.className = 'banner good'; banner.textContent = '正确！Correct! ✅'; AudioEngine.correct(); registerCorrect();
                var nxt = el('button', 'btn', '下一句 Next →');
                bindTap(nxt, function () { rounds++; round(); });
                holder.appendChild(nxt);
              } else {
                banner.className = 'banner bad'; banner.textContent = '再试一次 Try again'; AudioEngine.wrong();
              }
            }
          }
          for (var i = 0; i < shuffled.length; i++) {
            (function (wd) {
              var tile = el('div', 'wtile', wd);
              bindTap(tile, function () {
                if (tile.className.indexOf('used') !== -1) { return; }
                tile.className = 'wtile used';
                placed.push(wd);
                var pt = el('div', 'wtile', wd);
                bindTap(pt, function () {
                  // tap placed tile to remove it (only last for simplicity)
                  var idx = placed.lastIndexOf(wd);
                  if (idx === placed.length - 1) { placed.pop(); target.removeChild(pt); tile.className = 'wtile'; banner.textContent = ''; }
                });
                target.appendChild(pt);
                checkDone();
              });
              pool2.appendChild(tile);
            })(shuffled[i]);
          }
          holder.appendChild(banner);
          var reset = el('button', 'btn ghost small', '🧹 重排 Reset');
          bindTap(reset, function () { round(); });
          holder.appendChild(reset);
        }
        round();
      }, 'home');
    }

    /* ================= MISTAKE BOOK ================= */
    function screenMistakeIntro(scr) {
      scr.appendChild(backBtn(function () { go(screenHome, 'home'); }));
      scr.appendChild(el('h2', null, '📖 错题本 Mistake Book'));
      var now = Date.now();
      var due = state.mistakes.filter(function (m) { return !m.nextReview || m.nextReview <= now; });
      scr.appendChild(el('div', 'sub', '共 ' + state.mistakes.length + ' 条，到期复习 ' + due.length + ' 条 Due now: ' + due.length));
      if (!state.mistakes.length) {
        scr.appendChild(el('div', 'hint-box', '太棒了，暂时没有错题！No mistakes yet. 🎉'));
        return;
      }
      // Start practice directly on the due (or all) items.
      runMistakes(due.length ? due : state.mistakes.slice(0, 10));
    }
    function runMistakes(items) {
      go(function (scr) {
        scr.appendChild(backBtn(function () { go(screenHome, 'home'); }));
        var holder = el('div');
        scr.appendChild(holder);
        var pos = 0;
        function render() {
          clear(holder);
          if (pos >= items.length) {
            holder.appendChild(el('h2', null, '复习完成 Review done! 🎉'));
            holder.appendChild(mascotStage('dance', '错题都复习好啦！').stage);
            var back = el('button', 'btn', '返回首页 Home');
            bindTap(back, function () { go(screenHome, 'home'); });
            holder.appendChild(back);
            return;
          }
          var m = items[pos];
          var we = findWordEntry(m.worldKey, m.word);
          var world = null;
          for (var i = 0; i < WORLDS.length; i++) { if (WORLDS[i].key === m.worldKey) { world = WORLDS[i]; } }
          if (!we || !world) { pos++; render(); return; }
          holder.appendChild(el('h2', null, '错题复习 ' + (pos + 1) + '/' + items.length));
          var play = el('button', 'btn secondary', '🔊 ' + we.word);
          var hint = el('div', 'hint-box'); hint.style.display = 'none';
          bindTap(play, function () { if (Speech.pronounceWord(we.word) === 'nospeech') { hint.style.display = 'block'; hint.textContent = '音节 ' + (we.syllables || we.word); } });
          holder.appendChild(play); holder.appendChild(hint);
          holder.appendChild(el('div', 'wordcard', '选出正确意思 Pick the meaning'));
          var opts = generateQuizOptions(world, we, 4);
          var grid = el('div', 'opt-grid');
          var answered = false;
          for (var o = 0; o < opts.length; o++) {
            (function (op) {
              var cell = el('div', 'opt');
              cell.innerHTML = '<span class="lbl">' + op.meaning + '</span>';
              bindTap(cell, function () {
                if (answered) { return; } answered = true;
                var right = op.word === we.word;
                if (right) { cell.className = 'opt right'; AudioEngine.correct(); registerCorrect(); }
                else { cell.className = 'opt wrong'; AudioEngine.wrong(); }
                // update schedule in state
                for (var k = 0; k < state.mistakes.length; k++) {
                  if (state.mistakes[k].key === m.key) {
                    state.mistakes[k] = scheduleReview(state.mistakes[k], right, Date.now());
                    // graduate: remove after reaching last step and correct
                    if (right && state.mistakes[k].step >= 3) { state.mistakes.splice(k, 1); }
                    break;
                  }
                }
                save();
                setTimeout(function () { pos++; render(); }, 650);
              });
              grid.appendChild(cell);
            })(opts[o]);
          }
          holder.appendChild(grid);
        }
        render();
      }, 'home');
    }

    /* ================= DAILY PRACTICE ================= */
    function todayStr() {
      var d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
    function yesterdayStr() {
      var d = new Date(Date.now() - 86400000);
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
    function screenDailyIntro(scr) {
      scr.appendChild(backBtn(function () { go(screenHome, 'home'); }));
      scr.appendChild(el('h2', null, '📅 每日练习 Daily Practice'));
      scr.appendChild(el('div', 'sub', '每天 10 题，连续练习提升连胜 10 mixed words a day'));
      var doneToday = state.lastDaily === todayStr();
      scr.appendChild(el('div', 'hint-box', doneToday ? '今天已完成 ✅ 连续 ' + state.streak + ' 天' : '今天还没练习哦 Not done today'));
      var start = el('button', 'btn green', doneToday ? '再练一次 Practice again' : '开始今日练习 Start');
      bindTap(start, function () { runDaily(); });
      scr.appendChild(start);
    }
    function runDaily() {
      go(function (scr) {
        scr.appendChild(backBtn(function () { go(screenDailyIntro, 'home'); }));
        var holder = el('div');
        scr.appendChild(holder);
        var pool = allWords();
        var picks = shuffle(pool).slice(0, Math.min(10, pool.length));
        var pos = 0, score = 0;
        function render() {
          clear(holder);
          if (pos >= picks.length) {
            // update streak
            if (state.lastDaily !== todayStr()) {
              if (state.lastDaily === yesterdayStr()) { state.streak = (state.streak || 0) + 1; }
              else { state.streak = 1; }
              state.lastDaily = todayStr();
              save();
            }
            holder.appendChild(el('h2', null, '完成 Done! ' + score + '/' + picks.length));
            holder.appendChild(el('div', 'banner good', '🔥 连续 ' + state.streak + ' 天 Streak ' + state.streak));
            holder.appendChild(mascotStage('dance', '每天坚持，超棒！').stage);
            var back = el('button', 'btn', '返回首页 Home');
            bindTap(back, function () { go(screenHome, 'home'); });
            holder.appendChild(back);
            return;
          }
          var pick = picks[pos];
          var we = pick.w;
          holder.appendChild(el('h2', null, '每日练习 ' + (pos + 1) + '/' + picks.length));
          var play = el('button', 'btn secondary', '🔊 ' + we.word);
          var hint = el('div', 'hint-box'); hint.style.display = 'none';
          bindTap(play, function () { if (Speech.pronounceWord(we.word) === 'nospeech') { hint.style.display = 'block'; hint.textContent = '音节 ' + (we.syllables || we.word); } });
          holder.appendChild(play); holder.appendChild(hint);
          holder.appendChild(el('div', 'wordcard', '选出正确意思 Pick the meaning'));
          var opts = generateQuizOptions(pick.world, we, 4);
          var grid = el('div', 'opt-grid');
          var answered = false;
          for (var o = 0; o < opts.length; o++) {
            (function (op) {
              var cell = el('div', 'opt');
              cell.innerHTML = '<span class="lbl">' + op.meaning + '</span>';
              bindTap(cell, function () {
                if (answered) { return; } answered = true;
                if (op.word === we.word) { cell.className = 'opt right'; score++; AudioEngine.correct(); registerCorrect(); }
                else { cell.className = 'opt wrong'; AudioEngine.wrong(); addMistake(pick.world.key, we.word); }
                setTimeout(function () { pos++; render(); }, 600);
              });
              grid.appendChild(cell);
            })(opts[o]);
          }
          holder.appendChild(grid);
        }
        render();
      }, 'home');
    }

    /* ================= PHRASES ================= */
    function screenPhrases(scr) {
      scr.appendChild(el('h2', null, '💬 日常口语 Daily Phrases'));
      scr.appendChild(el('div', 'sub', '高频口语短句，点卡片发音 ' + PHRASES.length + ' phrases, tap to hear'));
      if (!PHRASES.length) { scr.appendChild(el('div', 'hint-box', '暂无短语 No phrases loaded.')); return; }
      var list = PHRASES;
      for (var i = 0; i < list.length; i++) {
        (function (p) {
          var r = el('div', 'row');
          r.innerHTML = '<div class="em">' + (p.emoji || '💬') + '</div><div class="txt"><b>' + p.phrase + '</b><span class="zh">' + p.meaning + '</span></div>';
          var b = el('button', 'btn small secondary', '🔊');
          var hint = el('div');
          bindTap(b, function () {
            var res = Speech.pronounceWord(p.phrase);
            if (res === 'nospeech') { r.appendChild(el('div', 'hint-box', '本设备无语音，照着读：' + p.phrase)); }
          });
          r.appendChild(b);
          scr.appendChild(r);
        })(list[i]);
      }
    }

    /* ================= STICKERS ================= */
    function screenStickers(scr) {
      scr.appendChild(el('h2', null, '🏅 贴纸册 Sticker Album'));
      var kw = kidWorlds();
      scr.appendChild(el('div', 'sub', '通关世界收集贴纸 ' + state.stickers.length + ' / ' + kw.length + ' collected'));
      var bar = el('div', 'bar'); var span = el('span');
      span.style.width = (kw.length ? Math.round(state.stickers.length / kw.length * 100) : 0) + '%';
      bar.appendChild(span); scr.appendChild(bar);
      var grid = el('div', 'sticker-grid');
      for (var i = 0; i < kw.length; i++) {
        var got = i < state.stickers.length;
        var s = el('div', 'sticker' + (got ? '' : ' empty'));
        s.innerHTML = '<div class="em">' + (got ? state.stickers[i] : '❔') + '</div><div class="nm">' + kw[i].name_zh + '</div>';
        grid.appendChild(s);
      }
      scr.appendChild(grid);
    }

    /* ================= STORE / OUTFITS ================= */
    function screenStore(scr) {
      scr.appendChild(el('h2', null, '🎩 狮子装扮 Lion Dress-up'));
      scr.appendChild(el('div', 'sub', '用星星购买装饰（纯外观）Buy cosmetic outfits with stars · ⭐' + state.stars));
      scr.appendChild(mascotStage('', '给我换个造型吧！').stage);
      var items = [
        { k: 'hat', em: '🎩', nm: '帽子 Hat', cost: 10 },
        { k: 'scarf', em: '🧣', nm: '围巾 Scarf', cost: 10 },
        { k: 'glasses', em: '👓', nm: '眼镜 Glasses', cost: 10 }
      ];
      for (var i = 0; i < items.length; i++) {
        (function (it) {
          var owned = state.outfits.indexOf(it.k) !== -1;
          var equipped = state.equipped[it.k];
          var row = el('div', 'store-item');
          row.innerHTML = '<div class="em">' + it.em + '</div><div class="info"><b>' + it.nm + '</b><small>' + (owned ? '已拥有 Owned' : '需要 ' + it.cost + '⭐') + '</small></div>';
          var btn = el('button', 'btn small', owned ? (equipped ? '取下 Unequip' : '佩戴 Equip') : '购买 Buy');
          if (!owned && state.stars < it.cost) { /* still real: show locked but informative */ }
          bindTap(btn, function () {
            if (!owned) {
              if (state.stars < it.cost) {
                row.appendChild(el('div', 'hint-box', '星星不够，去闯关获得更多星星！Not enough stars.'));
                return;
              }
              state.stars -= it.cost; state.outfits.push(it.k); save();
              go(screenStore, 'store'); return;
            }
            state.equipped[it.k] = !state.equipped[it.k]; save();
            go(screenStore, 'store');
          });
          row.appendChild(btn);
          scr.appendChild(row);
        })(items[i]);
      }
    }

    /* ---------- kick off ---------- */
    function start() {
      // start bgm on first user gesture (autoplay policies)
      function once() {
        if (!state.muted) { AudioEngine.startBgm(); }
        doc.removeEventListener('pointerdown', once);
        doc.removeEventListener('touchstart', once);
      }
      doc.addEventListener('pointerdown', once);
      doc.addEventListener('touchstart', once);
      go(screenHome, 'home');
    }

    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }

  // Run browser init only when a DOM exists.
  if (typeof document !== 'undefined' && root.document) {
    initBrowser();
  }

  /* ========================================================================
     UMD export of the REAL pure functions for Node / selftest.
     ======================================================================== */
  var api = {
    generateQuizOptions: generateQuizOptions,
    checkSpelling: checkSpelling,
    scheduleReview: scheduleReview,
    serializeState: serializeState,
    deserializeState: deserializeState,
    shuffle: shuffle,
    totalWordCount: totalWordCount,
    PaymentProvider: PaymentProvider,
    REVIEW_STEPS_MIN: REVIEW_STEPS_MIN
  };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
  root.WordAdventure = api;
})();
