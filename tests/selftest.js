/* Word Adventure selftest. Run: node tests/selftest.js
   Validates data integrity + engine pure logic. Prints a pass count. */
'use strict';

var path = require('path');
var fs = require('fs');

// Shim a browser-like global so UMD data files + game.js load under Node.
global.window = {};

var ROOT = path.join(__dirname, '..');

// Load all data files (they register on global.window AND return via module.exports).
var files = fs.readdirSync(ROOT).filter(function (f) {
  return /^data.*\.js$/.test(f);
}).sort();

files.forEach(function (f) {
  require(path.join(ROOT, f));
});

var WORLDS = global.window.WORLDS || [];
var PHRASES = global.window.PHRASES || [];
var DIALOGUES = global.window.DIALOGUES || {};

var game = require(path.join(ROOT, 'game.js'));

var passed = 0;
var failed = 0;
var failures = [];
function ok(cond, msg) {
  if (cond) { passed++; }
  else { failed++; failures.push(msg); console.error('  FAIL: ' + msg); }
}

/* ---------------- data integrity ---------------- */
ok(WORLDS.length >= 27, 'at least 27 worlds loaded (got ' + WORLDS.length + ')');

var kidWorlds = WORLDS.filter(function (w) { return w.group === 'kid'; });
var adultWorlds = WORLDS.filter(function (w) { return w.group === 'adult'; });
ok(kidWorlds.length === 24, '24 kid worlds (got ' + kidWorlds.length + ')');
ok(adultWorlds.length === 3, '3 adult worlds (got ' + adultWorlds.length + ')');

var REQUIRED_WORLD_FIELDS = ['id', 'key', 'name_en', 'name_zh', 'emoji', 'group', 'star_req', 'words'];
var REQUIRED_WORD_FIELDS = ['word', 'meaning', 'syllables', 'sentence', 'sentence_zh', 'emoji'];

var totalWords = 0;
var globalWordSet = {};
var worldFieldBad = 0, wordFieldBad = 0, dupInWorld = 0;
WORLDS.forEach(function (w) {
  REQUIRED_WORLD_FIELDS.forEach(function (fld) {
    if (!(fld in w)) { worldFieldBad++; }
  });
  var localSeen = {};
  (w.words || []).forEach(function (entry) {
    totalWords++;
    REQUIRED_WORD_FIELDS.forEach(function (fld) {
      // emoji may be empty string for abstract words; require the key present and others non-empty
      if (!(fld in entry)) { wordFieldBad++; }
      else if (fld !== 'emoji' && (entry[fld] === '' || entry[fld] == null)) { wordFieldBad++; }
    });
    if (localSeen[entry.word]) { dupInWorld++; }
    localSeen[entry.word] = true;
    globalWordSet[entry.word] = (globalWordSet[entry.word] || 0) + 1;
  });
});
ok(worldFieldBad === 0, 'all worlds have required fields (' + worldFieldBad + ' missing)');
ok(wordFieldBad === 0, 'all word entries have required fields (' + wordFieldBad + ' bad)');
ok(dupInWorld === 0, 'no duplicate words within a single world (' + dupInWorld + ' dups)');

var uniqueWords = Object.keys(globalWordSet).length;

/* ---------------- phrases ---------------- */
ok(PHRASES.length >= 300, 'phrases dataset has 300+ entries (got ' + PHRASES.length + ')');
var phraseBad = 0;
PHRASES.forEach(function (p) {
  if (!p.phrase || !p.meaning) { phraseBad++; }
});
ok(phraseBad === 0, 'every phrase has phrase + meaning (' + phraseBad + ' bad)');

/* ---------------- dialogues (cartoon listening) ---------------- */
var worldsMissingDlg = 0, dlgBad = 0;
kidWorlds.forEach(function (w) {
  var arr = DIALOGUES[w.key] || [];
  if (arr.length < 3) { worldsMissingDlg++; }
  arr.forEach(function (d) {
    if (!d.lines || !d.lines.length) { dlgBad++; }
    if (!d.questions || !d.questions.length) { dlgBad++; }
    (d.lines || []).forEach(function (ln) { if (!ln.en || !ln.zh) { dlgBad++; } });
    (d.questions || []).forEach(function (q) {
      if (!q.q || !q.opts || typeof q.a !== 'number') { dlgBad++; }
      if (q.opts && (q.a < 0 || q.a >= q.opts.length)) { dlgBad++; }
    });
  });
});
ok(worldsMissingDlg === 0, 'every kids world has >=3 dialogues (' + worldsMissingDlg + ' short)');
ok(dlgBad === 0, 'all dialogues have transcripts + valid questions (' + dlgBad + ' bad)');

/* ---------------- engine exports present ---------------- */
ok(typeof game.generateQuizOptions === 'function', 'generateQuizOptions exported');
ok(typeof game.checkSpelling === 'function', 'checkSpelling exported');
ok(typeof game.scheduleReview === 'function', 'scheduleReview exported');
ok(typeof game.serializeState === 'function', 'serializeState exported');
ok(typeof game.deserializeState === 'function', 'deserializeState exported');

/* ---------------- quiz generation ---------------- */
var sampleWorld = kidWorlds[0];
for (var qi = 0; qi < 50; qi++) {
  var we = sampleWorld.words[qi % sampleWorld.words.length];
  var opts = game.generateQuizOptions(sampleWorld, we, 4);
  var hasCorrect = opts.some(function (o) { return o.word === we.word; });
  if (!hasCorrect) { ok(false, 'quiz options include correct answer (iter ' + qi + ')'); break; }
  if (opts.length !== 4) { ok(false, 'quiz returns 4 options (got ' + opts.length + ')'); break; }
  var seen = {}, dup = false;
  opts.forEach(function (o) { if (seen[o.word]) { dup = true; } seen[o.word] = true; });
  if (dup) { ok(false, 'quiz options are distinct (iter ' + qi + ')'); break; }
}
ok(true, 'generateQuizOptions: 50 draws include correct answer, 4 distinct options');

/* ---------------- spelling ---------------- */
ok(game.checkSpelling('Apple', 'apple') === true, 'checkSpelling case-insensitive');
ok(game.checkSpelling('  cat ', 'cat') === true, 'checkSpelling trims whitespace');
ok(game.checkSpelling('cot', 'cat') === false, 'checkSpelling rejects wrong word');
ok(game.checkSpelling('', 'cat') === false, 'checkSpelling rejects empty input');

/* ---------------- review scheduling ---------------- */
var now = 1000000000000;
var item = { key: 'w:cat', word: 'cat' };
var afterWrong = game.scheduleReview(item, false, now);
ok(afterWrong.nextReview > now, 'scheduleReview sets a future review time');
var afterCorrect = game.scheduleReview(afterWrong, true, now);
ok(afterCorrect.intervalMin > afterWrong.intervalMin, 'interval grows after correct');
var afterWrongAgain = game.scheduleReview(afterCorrect, false, now);
ok(afterWrongAgain.intervalMin <= afterCorrect.intervalMin, 'interval shortens/resets after wrong');
ok(afterWrongAgain.step === 0, 'step resets to 0 after wrong');

/* ---------------- save/load roundtrip ---------------- */
var state = {
  stars: 42, stickers: ['🦁', '🐯'], streak: 7, lastDaily: '2024-1-1',
  cleared: { animals: true, fruits: true }, mistakes: [{ key: 'w:cat', word: 'cat', step: 1 }],
  outfits: ['hat'], equipped: { hat: true }, bestSpeed: 15, bestChallenge: 3,
  correctCount: 99, adultUnlocked: true, muted: true
};
var round = game.deserializeState(game.serializeState(state));
ok(round.stars === 42, 'roundtrip stars');
ok(round.stickers.length === 2, 'roundtrip stickers');
ok(round.streak === 7, 'roundtrip streak');
ok(round.cleared.animals === true, 'roundtrip cleared progress');
ok(round.mistakes.length === 1 && round.mistakes[0].word === 'cat', 'roundtrip mistake book');
ok(round.adultUnlocked === true, 'roundtrip adult flag');
ok(game.deserializeState('not json').stars === 0, 'deserialize bad input never throws');

/* ---------------- payment stub default off ---------------- */
ok(game.PaymentProvider.enabled === false, 'PaymentProvider default OFF');
ok(game.PaymentProvider.hasPermission() === false, 'PaymentProvider no permission by default');

/* ---------------- report ---------------- */
console.log('');
console.log('Word Adventure selftest');
console.log('  Worlds: ' + WORLDS.length + ' (' + kidWorlds.length + ' kid + ' + adultWorlds.length + ' adult)');
console.log('  Total word entries: ' + totalWords + ' (' + uniqueWords + ' unique)');
console.log('  Phrases: ' + PHRASES.length);
var dlgCount = 0; Object.keys(DIALOGUES).forEach(function (k) { dlgCount += DIALOGUES[k].length; });
console.log('  Dialogues: ' + dlgCount);
console.log('');
console.log('  PASSED: ' + passed);
console.log('  FAILED: ' + failed);

if (failed > 0) {
  console.error('\nFAILURES:\n  - ' + failures.join('\n  - '));
  process.exit(1);
}
console.log('\nAll ' + passed + ' checks passed.');
