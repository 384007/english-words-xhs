/* Word Adventure data file. FEAT-004 expansion; ES5-safe UMD. */
(function(){
  var WORLD = {
    id: 'ws-05',
    key: 'spoken-05',
    name_en: 'Spoken Core 5',
    name_zh: '高频口语 5',
    emoji: '🗣️',
    group: 'spoken',
    star_req: 0,
    words: [
      { word: 'cost', meaning: '费用', syllables: 'cost', sentence: 'I can use the word "cost" in a sentence.', sentence_zh: '我能在句子里用“费用”这个词。', emoji: '' },
      { word: 'price', meaning: '价格', syllables: 'p-ri-ce', sentence: 'I can use the word "price" in a sentence.', sentence_zh: '我能在句子里用“价格”这个词。', emoji: '' },
      { word: 'coin', meaning: '硬币', syllables: 'coin', sentence: 'I can use the word "coin" in a sentence.', sentence_zh: '我能在句子里用“硬币”这个词。', emoji: '' },
      { word: 'screen', meaning: '屏幕', syllables: 'sc-reen', sentence: 'I can use the word "screen" in a sentence.', sentence_zh: '我能在句子里用“屏幕”这个词。', emoji: '' },
      { word: 'battery', meaning: '电池', syllables: 'bat-te-ry', sentence: 'I can use the word "battery" in a sentence.', sentence_zh: '我能在句子里用“电池”这个词。', emoji: '' },
      { word: 'charger', meaning: '充电器', syllables: 'c-har-ger', sentence: 'I can use the word "charger" in a sentence.', sentence_zh: '我能在句子里用“充电器”这个词。', emoji: '' },
      { word: 'torch', meaning: '手电筒', syllables: 'torch', sentence: 'I can use the word "torch" in a sentence.', sentence_zh: '我能在句子里用“手电筒”这个词。', emoji: '' },
      { word: 'comb', meaning: '梳子', syllables: 'comb', sentence: 'I can use the word "comb" in a sentence.', sentence_zh: '我能在句子里用“梳子”这个词。', emoji: '' },
      { word: 'box', meaning: '盒子', syllables: 'box', sentence: 'I can use the word "box" in a sentence.', sentence_zh: '我能在句子里用“盒子”这个词。', emoji: '' },
      { word: 'tin', meaning: '锡罐', syllables: 'tin', sentence: 'I can use the word "tin" in a sentence.', sentence_zh: '我能在句子里用“锡罐”这个词。', emoji: '' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
