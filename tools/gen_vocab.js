/* FEAT-004 vocabulary generator (dev tool, Node 22, NOT shipped to the runtime).
   Emits ES5-safe UMD data-*.js files for the Level Route + spoken high-frequency
   groups. Curated model-sourced high-frequency vocabulary (no offline corpus in
   the sandbox, no network). Dedupes against the shipped WORLDS over lowercased
   word fields, and dedupes within each new group.

   Run: node tools/gen_vocab.js
*/
'use strict';
var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');

/* ---- load already-shipped words so we never duplicate across groups ---- */
global.window = {};
fs.readdirSync(ROOT).filter(function (f) { return /^data.*\.js$/.test(f); }).sort()
  .forEach(function (f) { require(path.join(ROOT, f)); });
var SHIPPED = {};
(global.window.WORLDS || []).forEach(function (w) {
  (w.words || []).forEach(function (e) { SHIPPED[String(e.word).toLowerCase()] = 1; });
});

/* ---- syllable heuristic (approximate; good enough for study hints) ---- */
function syllabify(word) {
  var w = String(word).toLowerCase();
  if (w.length <= 3) { return w; }
  var vowels = 'aeiouy';
  var groups = [];
  var i, isV, prevV = false, start = 0;
  // find vowel-group boundaries, split before each new vowel group after a consonant
  var marks = [];
  for (i = 0; i < w.length; i++) {
    isV = vowels.indexOf(w[i]) >= 0;
    if (isV && !prevV && i > 0) { marks.push(i); }
    prevV = isV;
  }
  // build rough chunks by splitting one char before each vowel-group start
  var cuts = [];
  for (i = 0; i < marks.length; i++) {
    var p = marks[i] - 1;
    if (p > start && p < w.length - 1) { cuts.push(p); }
  }
  if (!cuts.length) { return w; }
  var out = [];
  var last = 0;
  for (i = 0; i < cuts.length; i++) { out.push(w.slice(last, cuts[i])); last = cuts[i]; }
  out.push(w.slice(last));
  out = out.filter(function (s) { return s.length > 0; });
  return out.join('-') || w;
}

/* ---- escape single quotes/backslashes for ES5 string literals ---- */
function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

/* ---- emit one world file ---- */
function emit(file, world) {
  var lines = [];
  lines.push('/* Word Adventure data file. FEAT-004 expansion; ES5-safe UMD. */');
  lines.push('(function(){');
  lines.push('  var WORLD = {');
  lines.push("    id: '" + esc(world.id) + "',");
  lines.push("    key: '" + esc(world.key) + "',");
  lines.push("    name_en: '" + esc(world.name_en) + "',");
  lines.push("    name_zh: '" + esc(world.name_zh) + "',");
  lines.push("    emoji: '" + esc(world.emoji) + "',");
  lines.push("    group: '" + esc(world.group) + "',");
  lines.push('    star_req: 0,');
  lines.push('    words: [');
  world.words.forEach(function (e, idx) {
    var comma = idx === world.words.length - 1 ? '' : ',';
    lines.push('      { word: \'' + esc(e.word) + '\', meaning: \'' + esc(e.meaning) +
      '\', syllables: \'' + esc(e.syllables) + '\', sentence: \'' + esc(e.sentence) +
      '\', sentence_zh: \'' + esc(e.sentence_zh) + '\', emoji: \'' + esc(e.emoji) + '\' }' + comma);
  });
  lines.push('    ]');
  lines.push('  };');
  lines.push("  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);");
  lines.push('  if (!root.WORLDS) { root.WORLDS = []; }');
  lines.push('  root.WORLDS.push(WORLD);');
  lines.push("  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }");
  lines.push('})();');
  lines.push('');
  fs.writeFileSync(path.join(ROOT, file), lines.join('\n'));
}

/* ---- build a word entry from a "word|zh|emoji" curated tuple ---- */
var SEEN = {}; // dedupe across all newly generated groups + shipped
Object.keys(SHIPPED).forEach(function (k) { SEEN[k] = 1; });

function buildEntries(pairs) {
  var out = [];
  pairs.forEach(function (p) {
    var word = p[0], zh = p[1], emoji = p.length > 2 ? p[2] : '';
    var lw = word.toLowerCase();
    if (SEEN[lw]) { return; } // skip duplicates (shipped or already added)
    SEEN[lw] = 1;
    var syl = syllabify(word);
    out.push({
      word: word,
      meaning: zh,
      syllables: syl,
      sentence: 'I can use the word "' + word + '" in a sentence.',
      sentence_zh: '我能在句子里用“' + zh + '”这个词。',
      emoji: emoji
    });
  });
  return out;
}

/* ---- chunk a big pair-list into files of ~130 entries ---- */
function emitGroup(opts) {
  // opts: { group, prefix, name_en, name_zh, emoji, idBase, pairs, perFile }
  var entries = buildEntries(opts.pairs);
  var per = opts.perFile || 130;
  var fileReport = [];
  var n = 0;
  for (var i = 0; i < entries.length; i += per) {
    n++;
    var slice = entries.slice(i, i + per);
    var num = ('0' + n).slice(-2);
    var file = opts.prefix + '-' + num + '.js';
    emit(file, {
      id: opts.idBase + '-' + num,
      key: opts.group + '-' + num,
      name_en: opts.name_en + ' ' + n,
      name_zh: opts.name_zh + ' ' + n,
      emoji: opts.emoji,
      group: opts.group,
      words: slice
    });
    fileReport.push({ file: file, count: slice.length });
  }
  return { total: entries.length, files: fileReport };
}

module.exports = { emitGroup: emitGroup, SEEN: SEEN };

/* The curated vocabulary lives in a sibling module to keep this file readable. */
var DATA = require('./vocab_data.js');

var report = {};
report.spoken = emitGroup({
  group: 'spoken', prefix: 'data-spoken', idBase: 'ws',
  name_en: 'Spoken Core', name_zh: '高频口语', emoji: '🗣️', pairs: DATA.spoken
});
report.primary = emitGroup({
  group: 'primary', prefix: 'data-level-primary', idBase: 'wlp',
  name_en: 'Primary', name_zh: '小学', emoji: '🎒', pairs: DATA.primary
});
report.middle = emitGroup({
  group: 'middle', prefix: 'data-level-middle', idBase: 'wlm',
  name_en: 'Middle School', name_zh: '初中中考', emoji: '📗', pairs: DATA.middle
});
report.high = emitGroup({
  group: 'high', prefix: 'data-level-high', idBase: 'wlh',
  name_en: 'High School', name_zh: '高中高考', emoji: '📘', pairs: DATA.high
});
report.cet = emitGroup({
  group: 'cet', prefix: 'data-level-cet', idBase: 'wlc',
  name_en: 'CET-4/6', name_zh: '四六级', emoji: '🎓', pairs: DATA.cet
});
report.ielts = emitGroup({
  group: 'ielts', prefix: 'data-level-ielts', idBase: 'wli',
  name_en: 'IELTS/TOEFL', name_zh: '雅思托福', emoji: '🌍', pairs: DATA.ielts
});

console.log(JSON.stringify(report, null, 2));
