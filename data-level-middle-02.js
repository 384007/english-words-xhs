/* Word Adventure data file. FEAT-004 expansion; ES5-safe UMD. */
(function(){
  var WORLD = {
    id: 'wlm-02',
    key: 'middle-02',
    name_en: 'Middle School 2',
    name_zh: '初中中考 2',
    emoji: '📗',
    group: 'middle',
    star_req: 0,
    words: [
      { word: 'equal', meaning: '平等的', syllables: 'e-qual', sentence: 'I can use the word "equal" in a sentence.', sentence_zh: '我能在句子里用“平等的”这个词。', emoji: '' },
      { word: 'escape', meaning: '逃跑', syllables: 'es-ca-pe', sentence: 'I can use the word "escape" in a sentence.', sentence_zh: '我能在句子里用“逃跑”这个词。', emoji: '' },
      { word: 'evidence', meaning: '证据', syllables: 'e-vi-den-ce', sentence: 'I can use the word "evidence" in a sentence.', sentence_zh: '我能在句子里用“证据”这个词。', emoji: '' },
      { word: 'exact', meaning: '精确的', syllables: 'e-xact', sentence: 'I can use the word "exact" in a sentence.', sentence_zh: '我能在句子里用“精确的”这个词。', emoji: '' },
      { word: 'examine', meaning: '检查', syllables: 'e-xa-mi-ne', sentence: 'I can use the word "examine" in a sentence.', sentence_zh: '我能在句子里用“检查”这个词。', emoji: '' },
      { word: 'excellent', meaning: '极好的', syllables: 'ex-cel-lent', sentence: 'I can use the word "excellent" in a sentence.', sentence_zh: '我能在句子里用“极好的”这个词。', emoji: '' },
      { word: 'excite', meaning: '使兴奋', syllables: 'ex-ci-te', sentence: 'I can use the word "excite" in a sentence.', sentence_zh: '我能在句子里用“使兴奋”这个词。', emoji: '' },
      { word: 'exist', meaning: '存在', syllables: 'e-xist', sentence: 'I can use the word "exist" in a sentence.', sentence_zh: '我能在句子里用“存在”这个词。', emoji: '' },
      { word: 'expand', meaning: '扩张', syllables: 'ex-pand', sentence: 'I can use the word "expand" in a sentence.', sentence_zh: '我能在句子里用“扩张”这个词。', emoji: '' },
      { word: 'expect', meaning: '期待', syllables: 'ex-pect', sentence: 'I can use the word "expect" in a sentence.', sentence_zh: '我能在句子里用“期待”这个词。', emoji: '' },
      { word: 'expense', meaning: '费用', syllables: 'ex-pen-se', sentence: 'I can use the word "expense" in a sentence.', sentence_zh: '我能在句子里用“费用”这个词。', emoji: '' },
      { word: 'experiment', meaning: '实验', syllables: 'ex-pe-ri-ment', sentence: 'I can use the word "experiment" in a sentence.', sentence_zh: '我能在句子里用“实验”这个词。', emoji: '' },
      { word: 'express', meaning: '表达', syllables: 'exp-ress', sentence: 'I can use the word "express" in a sentence.', sentence_zh: '我能在句子里用“表达”这个词。', emoji: '' },
      { word: 'extra', meaning: '额外的', syllables: 'ext-ra', sentence: 'I can use the word "extra" in a sentence.', sentence_zh: '我能在句子里用“额外的”这个词。', emoji: '' },
      { word: 'extreme', meaning: '极端的', syllables: 'ext-re-me', sentence: 'I can use the word "extreme" in a sentence.', sentence_zh: '我能在句子里用“极端的”这个词。', emoji: '' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
