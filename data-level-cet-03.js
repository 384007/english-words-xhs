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
      { word: 'endure', meaning: '忍受', syllables: 'en-du-re', sentence: 'The soldiers had to endure the bitter cold.', sentence_zh: '士兵们不得不忍受刺骨的严寒。', emoji: '' },
      { word: 'energetic', meaning: '精力充沛的', syllables: 'e-ner-ge-tic', sentence: 'The energetic puppy ran around all day.', sentence_zh: '这只精力充沛的小狗整天跑来跑去。', emoji: '' },
      { word: 'enforce', meaning: '执行', syllables: 'en-for-ce', sentence: 'The police work hard to enforce the law.', sentence_zh: '警察努力执行法律。', emoji: '' },
      { word: 'engage', meaning: '从事', syllables: 'en-ga-ge', sentence: 'She loves to engage in lively debates.', sentence_zh: '她喜欢从事热烈的辩论。', emoji: '' },
      { word: 'engrave', meaning: '雕刻', syllables: 'eng-ra-ve', sentence: 'They will engrave her name on the cup.', sentence_zh: '他们会在奖杯上雕刻她的名字。', emoji: '' },
      { word: 'enlarge', meaning: '扩大', syllables: 'en-lar-ge', sentence: 'We plan to enlarge the small kitchen.', sentence_zh: '我们计划扩大这个小厨房。', emoji: '' },
      { word: 'enlist', meaning: '征募', syllables: 'en-list', sentence: 'He chose to enlist in the army at eighteen.', sentence_zh: '他选择在十八岁时应征入伍。', emoji: '' },
      { word: 'enrich', meaning: '丰富', syllables: 'en-rich', sentence: 'Reading can enrich your mind.', sentence_zh: '阅读能丰富你的头脑。', emoji: '' },
      { word: 'enroll', meaning: '注册', syllables: 'en-roll', sentence: 'You can enroll in the class online.', sentence_zh: '你可以在网上注册这门课。', emoji: '' },
      { word: 'entail', meaning: '需要', syllables: 'en-tail', sentence: 'This job will entail a lot of travel.', sentence_zh: '这份工作需要大量出差。', emoji: '' },
      { word: 'entertain', meaning: '娱乐', syllables: 'en-ter-tain', sentence: 'The clown came to entertain the children.', sentence_zh: '小丑来娱乐孩子们。', emoji: '' },
      { word: 'enthusiasm', meaning: '热情', syllables: 'ent-hu-siasm', sentence: 'She greeted the news with great enthusiasm.', sentence_zh: '她以极大的热情迎接这个消息。', emoji: '' },
      { word: 'entice', meaning: '诱惑', syllables: 'en-ti-ce', sentence: 'Low prices entice people into the shop.', sentence_zh: '低价诱惑人们走进商店。', emoji: '' },
      { word: 'envisage', meaning: '设想', syllables: 'en-vi-sa-ge', sentence: 'I can easily envisage a brighter future.', sentence_zh: '我能轻松地设想一个更光明的未来。', emoji: '' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
