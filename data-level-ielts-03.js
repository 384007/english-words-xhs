/* Word Adventure data file. FEAT-004 expansion; ES5-safe UMD. */
(function(){
  var WORLD = {
    id: 'wli-03',
    key: 'ielts-03',
    name_en: 'IELTS/TOEFL 3',
    name_zh: '雅思托福 3',
    emoji: '🌍',
    group: 'ielts',
    star_req: 0,
    words: [
      { word: 'gullible', meaning: '易受骗的', syllables: 'gul-lib-le', sentence: 'I can use the word "gullible" in a sentence.', sentence_zh: '我能在句子里用“易受骗的”这个词。', emoji: '' },
      { word: 'hackneyed', meaning: '陈腐的', syllables: 'hack-neyed', sentence: 'I can use the word "hackneyed" in a sentence.', sentence_zh: '我能在句子里用“陈腐的”这个词。', emoji: '' },
      { word: 'haphazard', meaning: '杂乱的', syllables: 'hap-ha-zard', sentence: 'I can use the word "haphazard" in a sentence.', sentence_zh: '我能在句子里用“杂乱的”这个词。', emoji: '' },
      { word: 'harangue', meaning: '长篇大论', syllables: 'ha-ran-gue', sentence: 'I can use the word "harangue" in a sentence.', sentence_zh: '我能在句子里用“长篇大论”这个词。', emoji: '' },
      { word: 'harbinger', meaning: '预兆', syllables: 'har-bin-ger', sentence: 'I can use the word "harbinger" in a sentence.', sentence_zh: '我能在句子里用“预兆”这个词。', emoji: '' },
      { word: 'haughty', meaning: '傲慢的', syllables: 'haugh-ty', sentence: 'I can use the word "haughty" in a sentence.', sentence_zh: '我能在句子里用“傲慢的”这个词。', emoji: '' },
      { word: 'heedless', meaning: '不留心的', syllables: 'heed-less', sentence: 'I can use the word "heedless" in a sentence.', sentence_zh: '我能在句子里用“不留心的”这个词。', emoji: '' },
      { word: 'heresy', meaning: '异端', syllables: 'he-re-sy', sentence: 'I can use the word "heresy" in a sentence.', sentence_zh: '我能在句子里用“异端”这个词。', emoji: '' },
      { word: 'hiatus', meaning: '间断', syllables: 'hia-tus', sentence: 'I can use the word "hiatus" in a sentence.', sentence_zh: '我能在句子里用“间断”这个词。', emoji: '' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
