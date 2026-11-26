# Word Adventure — Data Manifest (WORDLIST.md)

This file tracks exactly which vocabulary datasets are shipped and which are still
pending, so a later session can append data files **without touching the engine**.
The engine is designed to load whatever data files exist and register them on the
shared global registries (`WORLDS`, `PHRASES`, `DIALOGUES`).

Last updated by the FEAT-004 vocabulary-expansion session.

## Data contract (do not change)

- World file (`data-XX.js`, adult files): one world object with
  `{ id, key, name_en, name_zh, emoji, group, star_req, words: [...] }`.
  Each word entry: `{ word, meaning, syllables, sentence, sentence_zh, emoji }`.
  Registered via `window.WORLDS.push(WORLD)` + `module.exports = WORLD` (ES5 UMD).
- Phrases file (`data-phrases.js`): array of `{ phrase, meaning, emoji }`.
  Registered via `window.PHRASES` + `module.exports`.
- Dialogues file (`data-dialogues.js`): map keyed by world `key`, each value an array of
  `{ id, title_en, title_zh, lines:[{s,en,zh}], questions:[{q,opts:[emoji...],a}] }`.
  Registered via `window.DIALOGUES` + `module.exports`.
- ES5-safe only: no `import`/`export`, no `?.`, no `??`. Must run on old Android WebViews via `file://`.

## DONE (shipped in this session)

### Kids Route — 27 themed worlds
| File | World | Words |
|------|-------|-------|
| data-01.js | Animals | 80 |
| data-02.js | Birds & Insects | 77 |
| data-03.js | Sea Creatures | 78 |
| data-04.js | Fruits | 78 |
| data-05.js | Vegetables | 77 |
| data-06.js | Food & Drink | 77 |
| data-07.js | Colors & Shapes | 77 |
| data-08.js | Numbers & Time | 77 |
| data-09.js | Body Parts | 76 |
| data-10.js | Family | 76 |
| data-11.js | Clothes & Accessories | 76 |
| data-12.js | Transport | 76 |
| data-13.js | School Supplies | 76 |
| data-14.js | Jobs | 76 |
| data-15.js | Household Items | 76 |
| data-16.js | Kitchenware | 75 |
| data-17.js | Nature & Weather | 76 |
| data-18.js | Places | 76 |
| data-19.js | Action Verbs | 76 |
| data-20.js | Feelings | 76 |
| data-21.js | Sports | 75 |
| data-22.js | Instruments & Toys | 75 |
| data-23.js | Festivals | 75 |
| data-24.js | Adjectives & Opposites | 76 |
| data-adult-travel.js | Travel (adult) | 62 |
| data-adult-workplace.js | Workplace (adult) | 60 |
| data-adult-exam.js | Exam high-frequency (adult) | 60 |

Totals: **1833 kid words + 182 adult words = 2015 word entries**; **1701 unique words**
(~1694 single-token). 24 kid worlds + 3 adult worlds = **27 worlds**.

### Spoken high-frequency support
- `data-phrases.js` — **394 high-frequency spoken chunks / daily lines** (greetings,
  "let's go", "come on", "watch out", "it's my turn", "well done", etc.), each with
  Chinese meaning and an emoji. (Requirement was 300+.)
- `data-dialogues.js` — **72 original cartoon-style mini-dialogues**, 3 per kids world
  (24 worlds), each 2-3 lines with bilingual transcript and 2 picture-based
  comprehension questions. Scripts are original; no real cartoon lines were copied.

### Level Route + Spoken Core — FEAT-004 expansion (shipped this session)

Generated from a curated, model-sourced high-frequency word list
(`tools/vocab_data.js`) and emitted as ES5-safe UMD data files by
`tools/gen_vocab.js`. Every tuple was deduplicated against the shipped `WORLDS`
over lowercased `word` fields, and within each new group, so the counts below are
NEW unique words only (words already present in the kid/adult worlds were skipped).
The `tools/` folder is a dev aid and is NOT loaded by the runtime game.

| Group | Files | New unique words |
|-------|-------|------------------|
| spoken (`group:'spoken'`) | data-spoken-01.js .. data-spoken-05.js | 530 |
| primary (`group:'primary'`) | data-level-primary-01.js | 28 |
| middle / zhongkao (`group:'middle'`) | data-level-middle-01.js, data-level-middle-02.js | 145 |
| high / gaokao (`group:'high'`) | data-level-high-01.js .. data-level-high-03.js | 346 |
| cet (`group:'cet'`) | data-level-cet-01.js .. data-level-cet-03.js | 274 |
| ielts (`group:'ielts'`) | data-level-ielts-01.js .. data-level-ielts-03.js | 269 |

New expansion entries: **1592 words across 17 files**.

**Grand total after FEAT-004: 44 worlds, 3607 word entries, 3293 UNIQUE words**
(up from 1701). Entry fields unchanged (`word, meaning, syllables, sentence,
sentence_zh, emoji`); `emoji` is a related symbol or `''` for abstract expansion
words, which the engine and selftest tolerate. `node tests/selftest.js` → 33/33 pass.

#### How the spoken coverage was built and verified

There is **no offline frequency corpus and no network** in this sandbox, so a
reference top-3,000 spoken-frequency list (e.g. SUBTLEX-US) could not be vendored or
downloaded. Coverage was therefore built by the documented fallback: a hand-curated
high-frequency spoken list in `tools/vocab_data.js` covering the categories that make
up the bulk of everyday/cartoon dialogue — pronouns, determiners, question words,
be/have/do/modals, the most common verbs/adjectives/adverbs, time/place/quantity
words, connectors, interjections/greetings, and everyday nouns.

Verification performed this session (structural, reproducible with Node):
1. Loaded all `data-*.js` under a `window` shim and counted **3293 unique lowercased
   words** across every world.
2. Confirmed the `spoken` group contributes **530 new** high-frequency words on top
   of the themed worlds (set-difference over lowercased `word` fields).
3. `tests/selftest.js` iterates every world and asserts 6-field integrity and
   per-world dedupe; it passes (33/33).

Limitation: without a canonical frequency list, exact "top-N covered" cannot be
asserted programmatically. The curated set targets the highest-frequency bands;
closing the remaining gap to a measured top-3,000 requires vendoring a frequency list
in a future session (see PENDING).

## PENDING (not yet shipped — append in a later session)

The user's aspirational target is 8,000–10,000 unique words. This session reached
**3293 unique**. Remaining work, all appendable as new `data-*.js` files WITHOUT
engine changes (the engine loads whatever data files exist and groups by `world.group`):

### 1. Measured top-3,000 spoken coverage (HIGH priority)
Vendor a plain-text spoken-frequency list (e.g. SUBTLEX-US) as an offline data file,
then compute the set difference against the shipped `word` fields and add any missing
high-frequency words as more `data-spoken-NN.js` files. This turns the current curated
approximation into a measured guarantee.

### 2. Level Route depth to full cumulative targets (MEDIUM priority)
Keep appending stage files to approach the cumulative syllabus sizes:
- primary ~1,200 cumulative, middle/zhongkao ~1,600, high/gaokao ~3,500.
  Current shipped per-group NEW counts: primary 28, middle 145, high 346 (most
  primary/middle words already exist inside the 27 themed worlds, hence the small
  NEW deltas after dedupe).

### 3. Exam-track depth (LOWEST priority)
- CET-4/6 (`group:'cet'`) toward ~2,000 new; IELTS/TOEFL (`group:'ielts'`) toward
  ~1,500 new. Shipped this session: cet 274, ielts 269. Append more files to reach
  the full targets.

## Notes for the engine / other features (out of FEAT-001 scope)
These were requested via live steering but belong to the engine feature, not the data feature:
- **Cartoon Listening mode**: play dialogue audio with no on-screen text, ask the
  picture questions, then reveal the bilingual transcript with replay. Data is ready in
  `data-dialogues.js` (keyed by world `key`).
- **No-Subtitle Challenge mode**: graded audio-only dialogue scenes with questions,
  scored by level. Can reuse `data-dialogues.js` entries (extend with a `level` field later).
- **Sentence listening**: natural-speed TTS by default with a slow-replay button.
- **selftest.js additions**: assert each kids world has >=3 dialogues with transcripts
  and questions, and that `PHRASES.length >= 300`. (Both already hold: 72 dialogues, 394 phrases.)
