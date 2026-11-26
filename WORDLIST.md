# Word Adventure — Data Manifest (WORDLIST.md)

This file tracks exactly which vocabulary datasets are shipped and which are still
pending, so a later session can append data files **without touching the engine**.
The engine is designed to load whatever data files exist and register them on the
shared global registries (`WORLDS`, `PHRASES`, `DIALOGUES`).

Last updated by the FEAT-001 data session.

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

## PENDING (not yet shipped — append in a later session)

### 1. Top-3,000 spoken-word coverage gap (HIGH priority per user steering)
The Kids Route currently ships **1701 unique words**. The V1.0 goal is full coverage of
the **top ~3,000 highest-frequency spoken English words**. Remaining work:
- Add `data-spoken-01.js .. data-spoken-NN.js`, group `'spoken'`, ~100-150 words each,
  until the top-3000 spoken list is fully covered. Use the same word-entry contract.
- **Verification method (to run when the spoken files are added):** obtain a reference
  top-3000 spoken-frequency list (e.g. a SUBTLEX-US / spoken-corpus frequency list),
  lowercase and tokenize both it and the shipped `word` fields, then compute set
  difference. Any reference word not present in `WORLDS` becomes a new spoken-vocab
  entry. The repo ships `tests/selftest.js` hooks so coverage can be asserted once the
  reference list is vendored as a plain-text data file (no network at runtime).
- Status of the verification in THIS session: coverage was measured structurally
  (1701 unique shipped words counted via Node over all world files). A full top-3000
  diff was **not** completed because no offline frequency list was available in the
  sandbox; this is the first task for the follow-up session.

### 2. Level Route — stage-graded word lists (MEDIUM priority)
Grouped by stage, ~100-150 words per file, same entry contract, group names as noted:
- Primary (`group:'primary'`) — target ~1,200 cumulative. **PENDING**
- Middle School / zhongkao (`group:'middle'`) — ~1,600 cumulative. **PENDING**
- High School / gaokao (`group:'high'`) — ~3,500 cumulative. **PENDING**

### 3. Exam-track additions (LOWEST priority per latest steering)
- CET-4/6 additions (`group:'cet'`) — ~2,000 new words. **PENDING**
- IELTS / TOEFL core additions (`group:'ielts'`) — ~1,500 new words. **PENDING**

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
