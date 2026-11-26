# Word Adventure 《单词大冒险》

A picture-book-style, fully bilingual (中文 / English) English vocabulary adventure game for
young learners (and adults). Pure front-end: just open `index.html`. No build step, no server,
no network requests.

## At a glance

- **Worlds:** 44 total
  - **Kids Route:** 24 themed worlds (1833 entries) + 3 adult worlds (182 entries)
  - **Level Route:** spoken high-frequency (5 files, 530 entries), primary (28), middle/zhongkao (145), high/gaokao (346), CET-4/6 (274), IELTS/TOEFL (269)
- **Word entries:** 3607 (3293 unique words)
- **Daily spoken phrases:** 394 high-frequency chunks / daily lines
- **Cartoon dialogues:** 72 original mini-dialogues (3 per kids world) for listening practice
- **Selftest:** `node tests/selftest.js` → **33 / 33 checks passed**
- **Total size:** ~1.1 MB (well under the 9 MB cap)

Note on the 8,000-10,000 target: this build ships 3293 unique words. A measured top-3,000
spoken-frequency guarantee would require an offline frequency corpus (e.g. SUBTLEX-US), which is
not available in the no-network build environment, so spoken coverage was curated from
high-frequency vocabulary and verified structurally. See `WORDLIST.md` for shipped vs. pending
stages; more words can be appended as data files without any engine change.

## How to play

Open `index.html` in any modern browser (works on old Android WebViews via `file://`).

- **World Map / 世界地图:** travel route over every world with the lion mascot at your current
  progress point. Unlocked worlds are tappable; locked worlds show the real star requirement.
- **Per kids world, 5 modes:** Word Cards 单词卡片, Listening Quiz 听音辨图,
  Spelling Blocks 拼字积木, Matching Pairs 配对消消, and Cartoon Listening 动画听力.
- **Home-screen modes:** Speed Challenge 极速挑战 (60s), Sentence Train 句子火车,
  Mistake Book 错题本 (spaced repetition), Daily Practice 每日练习 (drives the streak),
  No-Subtitle Challenge 无字幕挑战, and Daily Phrases 日常口语.
- **Progression:** clearing a world awards stars + a sticker; stars buy cosmetic lion outfits
  (hat / scarf / glasses). A small celebration fires every 5 correct answers.

## Design constraints (all enforced)

- **Zero network:** CSP `connect-src 'none'`; no CDN, external fonts, images, or audio.
- **Emoji + inline SVG/CSS** for all illustrations and the lion mascot. No image/audio/font files.
- **Touch-first:** one unified pointer/touch handler with ghost-click dedupe.
- **ES5-safe** shipped code (no ES modules, optional chaining, or nullish coalescing).
- **localStorage** saves with an automatic in-memory fallback — never crashes.
- **Pronunciation** uses `speechSynthesis` with a mandatory fallback chain: prefer en-US/en-GB
  voices; otherwise spell the word letter by letter; if there is no voice at all, show only the
  syllable breakdown + mouth hints and never fake a speaking state. Sentences use natural speed
  with a slow-replay button (rate ~0.6).
- **WebAudio** synthesized sound effects + background music with a mute toggle.
- **Monetization stub default OFF:** prices are completely hidden without an explicit host grant.
- **AI-generated content / AI生成内容** label shown in the UI.

## Data model

The engine loads **whatever data files exist** and groups worlds by `world.group`
(`kid`, `adult`, and future `spoken` / `primary` / `middle` / `high` / `cet` / `ielts`),
rendering a Kids Route plus a Level Route section. Vocabulary can grow file by file without
touching the engine. See `WORDLIST.md` for the shipped vs. pending data manifest.

- World file: `{ id, key, name_en, name_zh, emoji, group, star_req, words: [...] }`
- Word entry: `{ word, meaning, syllables, sentence, sentence_zh, emoji }`
- Phrase: `{ phrase, meaning, emoji }`
- Dialogue: `{ id, title_en, title_zh, lines:[{s,en,zh}], questions:[{q, opts:[emoji...], a}] }`

## Tests

```
node tests/selftest.js
```

Validates data integrity (every entry has all fields, no duplicates within a world),
quiz generation (correct answer always among the options, distinct count), spelling checks,
save/load roundtrip, review scheduling, phrases count (300+), and that every kids world has at
least 3 dialogues with transcripts and questions.

## Files

- `index.html` — single page, CSP, data `<script>` tags, app root.
- `style.css` — responsive picture-book layout (320–430px wide, down to 568px tall), mascot animations.
- `game.js` — full engine; also exposes pure logic via a UMD guard for the selftest.
- `data-01.js` … `data-24.js` — 24 kids themed worlds.
- `data-adult-travel.js` / `data-adult-workplace.js` / `data-adult-exam.js` — adult worlds.
- `data-phrases.js` — 394 spoken phrases.
- `data-dialogues.js` — 72 cartoon-listening dialogues.
- `data-spoken-01.js` … `data-spoken-05.js` — spoken high-frequency words (group `spoken`).
- `data-level-primary-01.js` — primary stage (group `primary`).
- `data-level-middle-01.js` … `data-level-middle-02.js` — middle school / zhongkao (group `middle`).
- `data-level-high-01.js` … `data-level-high-03.js` — high school / gaokao (group `high`).
- `data-level-cet-01.js` … `data-level-cet-03.js` — CET-4/6 additions (group `cet`).
- `data-level-ielts-01.js` … `data-level-ielts-03.js` — IELTS/TOEFL core (group `ielts`).
- `tests/selftest.js` — Node validation script.
- `WORDLIST.md` — data manifest (shipped + pending stages).
