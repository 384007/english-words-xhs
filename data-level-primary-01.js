/* Word Adventure data file. FEAT-004 expansion; ES5-safe UMD. */
(function(){
  var WORLD = {
    id: 'wlp-01',
    key: 'primary-01',
    name_en: 'Primary 1',
    name_zh: '小学 1',
    emoji: '🎒',
    group: 'primary',
    star_req: 0,
    words: [
      { word: 'canteen', meaning: '食堂', syllables: 'can-teen', sentence: 'I can use the word "canteen" in a sentence.', sentence_zh: '我能在句子里用“食堂”这个词。', emoji: '🍱' },
      { word: 'March', meaning: '三月', syllables: 'march', sentence: 'I can use the word "March" in a sentence.', sentence_zh: '我能在句子里用“三月”这个词。', emoji: '🗓️' },
      { word: 'April', meaning: '四月', syllables: 'ap-ril', sentence: 'I can use the word "April" in a sentence.', sentence_zh: '我能在句子里用“四月”这个词。', emoji: '🗓️' },
      { word: 'June', meaning: '六月', syllables: 'ju-ne', sentence: 'I can use the word "June" in a sentence.', sentence_zh: '我能在句子里用“六月”这个词。', emoji: '🗓️' },
      { word: 'July', meaning: '七月', syllables: 'ju-ly', sentence: 'I can use the word "July" in a sentence.', sentence_zh: '我能在句子里用“七月”这个词。', emoji: '🗓️' },
      { word: 'August', meaning: '八月', syllables: 'au-gust', sentence: 'I can use the word "August" in a sentence.', sentence_zh: '我能在句子里用“八月”这个词。', emoji: '🗓️' },
      { word: 'September', meaning: '九月', syllables: 'sep-tem-ber', sentence: 'I can use the word "September" in a sentence.', sentence_zh: '我能在句子里用“九月”这个词。', emoji: '🗓️' },
      { word: 'October', meaning: '十月', syllables: 'oc-to-ber', sentence: 'I can use the word "October" in a sentence.', sentence_zh: '我能在句子里用“十月”这个词。', emoji: '🗓️' },
      { word: 'November', meaning: '十一月', syllables: 'no-vem-ber', sentence: 'I can use the word "November" in a sentence.', sentence_zh: '我能在句子里用“十一月”这个词。', emoji: '🗓️' },
      { word: 'December', meaning: '十二月', syllables: 'de-cem-ber', sentence: 'I can use the word "December" in a sentence.', sentence_zh: '我能在句子里用“十二月”这个词。', emoji: '🗓️' },
      { word: 'supper', meaning: '晚饭', syllables: 'sup-per', sentence: 'I can use the word "supper" in a sentence.', sentence_zh: '我能在句子里用“晚饭”这个词。', emoji: '🍲' },
      { word: 'ice cream', meaning: '冰淇淋', syllables: 'i-ce c-ream', sentence: 'I can use the word "ice cream" in a sentence.', sentence_zh: '我能在句子里用“冰淇淋”这个词。', emoji: '🍦' },
      { word: 'computer', meaning: '电脑', syllables: 'com-pu-ter', sentence: 'I can use the word "computer" in a sentence.', sentence_zh: '我能在句子里用“电脑”这个词。', emoji: '💻' },
      { word: 'radio', meaning: '收音机', syllables: 'ra-dio', sentence: 'I can use the word "radio" in a sentence.', sentence_zh: '我能在句子里用“收音机”这个词。', emoji: '📻' },
      { word: 'camera', meaning: '相机', syllables: 'ca-me-ra', sentence: 'I can use the word "camera" in a sentence.', sentence_zh: '我能在句子里用“相机”这个词。', emoji: '📷' },
      { word: 'flag', meaning: '旗帜', syllables: 'f-lag', sentence: 'I can use the word "flag" in a sentence.', sentence_zh: '我能在句子里用“旗帜”这个词。', emoji: '🚩' },
      { word: 'bicycle', meaning: '自行车', syllables: 'bi-cyc-le', sentence: 'I can use the word "bicycle" in a sentence.', sentence_zh: '我能在句子里用“自行车”这个词。', emoji: '🚲' },
      { word: 'fairy', meaning: '仙女', syllables: 'fai-ry', sentence: 'I can use the word "fairy" in a sentence.', sentence_zh: '我能在句子里用“仙女”这个词。', emoji: '🧚' },
      { word: 'dwarf', meaning: '矮人', syllables: 'd-warf', sentence: 'I can use the word "dwarf" in a sentence.', sentence_zh: '我能在句子里用“矮人”这个词。', emoji: '🧔' },
      { word: 'hero', meaning: '英雄', syllables: 'he-ro', sentence: 'I can use the word "hero" in a sentence.', sentence_zh: '我能在句子里用“英雄”这个词。', emoji: '🦸' },
      { word: 'monster', meaning: '怪物', syllables: 'mons-ter', sentence: 'I can use the word "monster" in a sentence.', sentence_zh: '我能在句子里用“怪物”这个词。', emoji: '👾' },
      { word: 'ghost', meaning: '幽灵', syllables: 'g-host', sentence: 'I can use the word "ghost" in a sentence.', sentence_zh: '我能在句子里用“幽灵”这个词。', emoji: '👻' },
      { word: 'alien', meaning: '外星人', syllables: 'a-lien', sentence: 'I can use the word "alien" in a sentence.', sentence_zh: '我能在句子里用“外星人”这个词。', emoji: '👽' },
      { word: 'circus', meaning: '马戏团', syllables: 'cir-cus', sentence: 'I can use the word "circus" in a sentence.', sentence_zh: '我能在句子里用“马戏团”这个词。', emoji: '🎪' },
      { word: 'magic', meaning: '魔法', syllables: 'ma-gic', sentence: 'I can use the word "magic" in a sentence.', sentence_zh: '我能在句子里用“魔法”这个词。', emoji: '✨' },
      { word: 'picnic', meaning: '野餐', syllables: 'pic-nic', sentence: 'I can use the word "picnic" in a sentence.', sentence_zh: '我能在句子里用“野餐”这个词。', emoji: '🧺' },
      { word: 'treasure', meaning: '宝藏', syllables: 't-rea-su-re', sentence: 'I can use the word "treasure" in a sentence.', sentence_zh: '我能在句子里用“宝藏”这个词。', emoji: '💎' },
      { word: 'stranger', meaning: '陌生人', syllables: 'st-ran-ger', sentence: 'I can use the word "stranger" in a sentence.', sentence_zh: '我能在句子里用“陌生人”这个词。', emoji: '🧍' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
