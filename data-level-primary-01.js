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
      { word: 'canteen', meaning: '食堂', syllables: 'can-teen', sentence: 'We have lunch in the school canteen.', sentence_zh: '我们在学校食堂吃午饭。', emoji: '🍱' },
      { word: 'March', meaning: '三月', syllables: 'march', sentence: 'My birthday is in March.', sentence_zh: '我的生日在三月。', emoji: '🗓️' },
      { word: 'April', meaning: '四月', syllables: 'ap-ril', sentence: 'It often rains in April.', sentence_zh: '四月经常下雨。', emoji: '🗓️' },
      { word: 'June', meaning: '六月', syllables: 'ju-ne', sentence: 'School ends in June.', sentence_zh: '学校在六月放假。', emoji: '🗓️' },
      { word: 'July', meaning: '七月', syllables: 'ju-ly', sentence: 'The weather is hot in July.', sentence_zh: '七月天气很热。', emoji: '🗓️' },
      { word: 'August', meaning: '八月', syllables: 'au-gust', sentence: 'We go to the beach in August.', sentence_zh: '我们在八月去海边。', emoji: '🗓️' },
      { word: 'September', meaning: '九月', syllables: 'sep-tem-ber', sentence: 'A new school year starts in September.', sentence_zh: '新学年在九月开始。', emoji: '🗓️' },
      { word: 'October', meaning: '十月', syllables: 'oc-to-ber', sentence: 'The leaves turn red in October.', sentence_zh: '十月树叶变红了。', emoji: '🗓️' },
      { word: 'November', meaning: '十一月', syllables: 'no-vem-ber', sentence: 'The days get colder in November.', sentence_zh: '十一月天气变得更冷。', emoji: '🗓️' },
      { word: 'December', meaning: '十二月', syllables: 'de-cem-ber', sentence: 'We celebrate the new year at the end of December.', sentence_zh: '我们在十二月底庆祝新年。', emoji: '🗓️' },
      { word: 'supper', meaning: '晚饭', syllables: 'sup-per', sentence: 'We eat supper together at seven.', sentence_zh: '我们七点一起吃晚饭。', emoji: '🍲' },
      { word: 'ice cream', meaning: '冰淇淋', syllables: 'i-ce c-ream', sentence: 'I love to eat ice cream in summer.', sentence_zh: '我喜欢在夏天吃冰淇淋。', emoji: '🍦' },
      { word: 'computer', meaning: '电脑', syllables: 'com-pu-ter', sentence: 'My brother plays games on the computer.', sentence_zh: '我哥哥在电脑上玩游戏。', emoji: '💻' },
      { word: 'radio', meaning: '收音机', syllables: 'ra-dio', sentence: 'My grandpa listens to the radio every morning.', sentence_zh: '我爷爷每天早上听收音机。', emoji: '📻' },
      { word: 'camera', meaning: '相机', syllables: 'ca-me-ra', sentence: 'She took a photo with her new camera.', sentence_zh: '她用新相机拍了一张照片。', emoji: '📷' },
      { word: 'flag', meaning: '旗帜', syllables: 'f-lag', sentence: 'The red flag is flying in the wind.', sentence_zh: '红旗在风中飘扬。', emoji: '🚩' },
      { word: 'bicycle', meaning: '自行车', syllables: 'bi-cyc-le', sentence: 'I ride my bicycle to school.', sentence_zh: '我骑自行车去上学。', emoji: '🚲' },
      { word: 'fairy', meaning: '仙女', syllables: 'fai-ry', sentence: 'The fairy has a pair of shiny wings.', sentence_zh: '那个仙女有一对闪亮的翅膀。', emoji: '🧚' },
      { word: 'dwarf', meaning: '矮人', syllables: 'd-warf', sentence: 'The little dwarf lives in the forest.', sentence_zh: '那个小矮人住在森林里。', emoji: '🧔' },
      { word: 'hero', meaning: '英雄', syllables: 'he-ro', sentence: 'The brave hero saved the town.', sentence_zh: '勇敢的英雄拯救了这座城镇。', emoji: '🦸' },
      { word: 'monster', meaning: '怪物', syllables: 'mons-ter', sentence: 'The monster in the story is big and green.', sentence_zh: '故事里的怪物又大又绿。', emoji: '👾' },
      { word: 'ghost', meaning: '幽灵', syllables: 'g-host', sentence: 'The children told a scary ghost story.', sentence_zh: '孩子们讲了一个吓人的幽灵故事。', emoji: '👻' },
      { word: 'alien', meaning: '外星人', syllables: 'a-lien', sentence: 'The movie is about an alien from space.', sentence_zh: '这部电影讲的是一个来自太空的外星人。', emoji: '👽' },
      { word: 'circus', meaning: '马戏团', syllables: 'cir-cus', sentence: 'We watched the clowns at the circus.', sentence_zh: '我们在马戏团看了小丑表演。', emoji: '🎪' },
      { word: 'magic', meaning: '魔法', syllables: 'ma-gic', sentence: 'The wizard used magic to open the door.', sentence_zh: '巫师用魔法打开了门。', emoji: '✨' },
      { word: 'picnic', meaning: '野餐', syllables: 'pic-nic', sentence: 'We had a picnic in the park on Sunday.', sentence_zh: '我们周日在公园野餐。', emoji: '🧺' },
      { word: 'treasure', meaning: '宝藏', syllables: 't-rea-su-re', sentence: 'The pirates dug up the hidden treasure.', sentence_zh: '海盗们挖出了藏起来的宝藏。', emoji: '💎' },
      { word: 'stranger', meaning: '陌生人', syllables: 'st-ran-ger', sentence: 'Do not talk to a stranger on the street.', sentence_zh: '不要和街上的陌生人说话。', emoji: '🧍' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
