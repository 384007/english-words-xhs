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
      { word: 'gullible', meaning: '易受骗的', syllables: 'gul-lib-le', sentence: 'He is so gullible that he believed the obvious scam.', sentence_zh: '他太容易受骗了，竟然相信了那个明显的骗局。', emoji: '' },
      { word: 'hackneyed', meaning: '陈腐的', syllables: 'hack-neyed', sentence: 'The speech was full of hackneyed phrases that bored everyone.', sentence_zh: '那场演讲满是陈腐的套话，让所有人都感到乏味。', emoji: '' },
      { word: 'haphazard', meaning: '杂乱的', syllables: 'hap-ha-zard', sentence: 'The files were stored in a haphazard way, so nothing was easy to find.', sentence_zh: '这些文件存放得杂乱无章，所以什么都很难找到。', emoji: '' },
      { word: 'harangue', meaning: '长篇大论', syllables: 'ha-ran-gue', sentence: 'The manager began a long harangue about being late to work.', sentence_zh: '经理开始就上班迟到的问题发表长篇大论。', emoji: '' },
      { word: 'harbinger', meaning: '预兆', syllables: 'har-bin-ger', sentence: 'The cold wind was a harbinger of the coming winter.', sentence_zh: '那阵冷风是冬天即将到来的预兆。', emoji: '' },
      { word: 'haughty', meaning: '傲慢的', syllables: 'haugh-ty', sentence: 'Her haughty manner made her seem unfriendly to new colleagues.', sentence_zh: '她那傲慢的态度让新同事觉得她不友好。', emoji: '' },
      { word: 'heedless', meaning: '不留心的', syllables: 'heed-less', sentence: 'He drove on, heedless of the warning signs by the road.', sentence_zh: '他继续开着车，丝毫不留心路边的警示标志。', emoji: '' },
      { word: 'heresy', meaning: '异端', syllables: 'he-re-sy', sentence: 'In the past, questioning the church was treated as heresy.', sentence_zh: '在过去，质疑教会被视为异端。', emoji: '' },
      { word: 'hiatus', meaning: '间断', syllables: 'hia-tus', sentence: 'The band returned to the stage after a two-year hiatus.', sentence_zh: '乐队在中断两年后重返舞台。', emoji: '' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
