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
      { word: 'cost', meaning: '费用', syllables: 'cost', sentence: 'How much does the ticket cost?', sentence_zh: '这张票多少钱？', emoji: '' },
      { word: 'price', meaning: '价格', syllables: 'p-ri-ce', sentence: 'The price is a bit too high for me.', sentence_zh: '这个价格对我来说有点太高了。', emoji: '' },
      { word: 'coin', meaning: '硬币', syllables: 'coin', sentence: 'I found a shiny coin on the ground.', sentence_zh: '我在地上发现了一枚闪亮的硬币。', emoji: '' },
      { word: 'screen', meaning: '屏幕', syllables: 'sc-reen', sentence: 'My phone screen just cracked.', sentence_zh: '我的手机屏幕刚裂了。', emoji: '' },
      { word: 'battery', meaning: '电池', syllables: 'bat-te-ry', sentence: 'My phone battery is almost dead.', sentence_zh: '我的手机电池快没电了。', emoji: '' },
      { word: 'charger', meaning: '充电器', syllables: 'c-har-ger', sentence: 'Can I borrow your charger for a minute?', sentence_zh: '我能借用一下你的充电器吗？', emoji: '' },
      { word: 'torch', meaning: '手电筒', syllables: 'torch', sentence: 'Bring a torch, it is dark in there.', sentence_zh: '带个手电筒吧，里面很黑。', emoji: '' },
      { word: 'comb', meaning: '梳子', syllables: 'comb', sentence: 'Can I borrow your comb for a second?', sentence_zh: '我能借一下你的梳子吗？', emoji: '' },
      { word: 'box', meaning: '盒子', syllables: 'box', sentence: 'Just put the books in this box.', sentence_zh: '把书放进这个盒子里就行。', emoji: '' },
      { word: 'tin', meaning: '锡罐', syllables: 'tin', sentence: 'There are some biscuits in that tin.', sentence_zh: '那个锡罐里有一些饼干。', emoji: '' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
