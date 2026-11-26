/* Word Adventure data file. FEAT-004 expansion; ES5-safe UMD. */
(function(){
  var WORLD = {
    id: 'wlc-03',
    key: 'cet-03',
    name_en: 'CET-4/6 3',
    name_zh: '四六级 3',
    emoji: '🎓',
    group: 'cet',
    star_req: 0,
    words: [
      { word: 'endure', meaning: '忍受', syllables: 'en-du-re', sentence: 'I can use the word "endure" in a sentence.', sentence_zh: '我能在句子里用“忍受”这个词。', emoji: '' },
      { word: 'energetic', meaning: '精力充沛的', syllables: 'e-ner-ge-tic', sentence: 'I can use the word "energetic" in a sentence.', sentence_zh: '我能在句子里用“精力充沛的”这个词。', emoji: '' },
      { word: 'enforce', meaning: '执行', syllables: 'en-for-ce', sentence: 'I can use the word "enforce" in a sentence.', sentence_zh: '我能在句子里用“执行”这个词。', emoji: '' },
      { word: 'engage', meaning: '从事', syllables: 'en-ga-ge', sentence: 'I can use the word "engage" in a sentence.', sentence_zh: '我能在句子里用“从事”这个词。', emoji: '' },
      { word: 'engrave', meaning: '雕刻', syllables: 'eng-ra-ve', sentence: 'I can use the word "engrave" in a sentence.', sentence_zh: '我能在句子里用“雕刻”这个词。', emoji: '' },
      { word: 'enlarge', meaning: '扩大', syllables: 'en-lar-ge', sentence: 'I can use the word "enlarge" in a sentence.', sentence_zh: '我能在句子里用“扩大”这个词。', emoji: '' },
      { word: 'enlist', meaning: '征募', syllables: 'en-list', sentence: 'I can use the word "enlist" in a sentence.', sentence_zh: '我能在句子里用“征募”这个词。', emoji: '' },
      { word: 'enrich', meaning: '丰富', syllables: 'en-rich', sentence: 'I can use the word "enrich" in a sentence.', sentence_zh: '我能在句子里用“丰富”这个词。', emoji: '' },
      { word: 'enroll', meaning: '注册', syllables: 'en-roll', sentence: 'I can use the word "enroll" in a sentence.', sentence_zh: '我能在句子里用“注册”这个词。', emoji: '' },
      { word: 'entail', meaning: '需要', syllables: 'en-tail', sentence: 'I can use the word "entail" in a sentence.', sentence_zh: '我能在句子里用“需要”这个词。', emoji: '' },
      { word: 'entertain', meaning: '娱乐', syllables: 'en-ter-tain', sentence: 'I can use the word "entertain" in a sentence.', sentence_zh: '我能在句子里用“娱乐”这个词。', emoji: '' },
      { word: 'enthusiasm', meaning: '热情', syllables: 'ent-hu-siasm', sentence: 'I can use the word "enthusiasm" in a sentence.', sentence_zh: '我能在句子里用“热情”这个词。', emoji: '' },
      { word: 'entice', meaning: '诱惑', syllables: 'en-ti-ce', sentence: 'I can use the word "entice" in a sentence.', sentence_zh: '我能在句子里用“诱惑”这个词。', emoji: '' },
      { word: 'envisage', meaning: '设想', syllables: 'en-vi-sa-ge', sentence: 'I can use the word "envisage" in a sentence.', sentence_zh: '我能在句子里用“设想”这个词。', emoji: '' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
