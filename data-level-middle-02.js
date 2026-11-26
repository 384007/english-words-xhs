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
      { word: 'equal', meaning: '平等的', syllables: 'e-qual', sentence: 'All students should have equal chances to learn.', sentence_zh: '所有学生都应该有平等的学习机会。', emoji: '' },
      { word: 'escape', meaning: '逃跑', syllables: 'es-ca-pe', sentence: 'The thief tried to escape from the police.', sentence_zh: '小偷试图从警察那里逃跑。', emoji: '' },
      { word: 'evidence', meaning: '证据', syllables: 'e-vi-den-ce', sentence: 'The police found clear evidence at the scene.', sentence_zh: '警察在现场找到了明确的证据。', emoji: '' },
      { word: 'exact', meaning: '精确的', syllables: 'e-xact', sentence: 'Can you tell me the exact time of the meeting?', sentence_zh: '你能告诉我会议的精确时间吗？', emoji: '' },
      { word: 'examine', meaning: '检查', syllables: 'e-xa-mi-ne', sentence: 'The doctor will examine your eyes today.', sentence_zh: '医生今天会检查你的眼睛。', emoji: '' },
      { word: 'excellent', meaning: '极好的', syllables: 'ex-cel-lent', sentence: 'She did an excellent job on the test.', sentence_zh: '她在考试中表现极好。', emoji: '' },
      { word: 'excite', meaning: '使兴奋', syllables: 'ex-ci-te', sentence: 'The good news will excite the whole team.', sentence_zh: '这个好消息会让整个团队兴奋。', emoji: '' },
      { word: 'exist', meaning: '存在', syllables: 'e-xist', sentence: 'Some people believe that ghosts do not exist.', sentence_zh: '有些人相信鬼魂并不存在。', emoji: '' },
      { word: 'expand', meaning: '扩张', syllables: 'ex-pand', sentence: 'The company plans to expand its business overseas.', sentence_zh: '这家公司计划将业务扩张到海外。', emoji: '' },
      { word: 'expect', meaning: '期待', syllables: 'ex-pect', sentence: 'We expect good weather for the trip.', sentence_zh: '我们期待旅行有好天气。', emoji: '' },
      { word: 'expense', meaning: '费用', syllables: 'ex-pen-se', sentence: 'The trip was fun, but the expense was high.', sentence_zh: '这次旅行很有趣，但费用很高。', emoji: '' },
      { word: 'experiment', meaning: '实验', syllables: 'ex-pe-ri-ment', sentence: 'We did a simple experiment in science class.', sentence_zh: '我们在科学课上做了一个简单的实验。', emoji: '' },
      { word: 'express', meaning: '表达', syllables: 'exp-ress', sentence: 'She used a drawing to express her feelings.', sentence_zh: '她用一幅画来表达自己的感受。', emoji: '' },
      { word: 'extra', meaning: '额外的', syllables: 'ext-ra', sentence: 'The teacher gave us extra time to finish.', sentence_zh: '老师给了我们额外的时间去完成。', emoji: '' },
      { word: 'extreme', meaning: '极端的', syllables: 'ext-re-me', sentence: 'Climbing that mountain is an extreme sport.', sentence_zh: '攀登那座山是一项极端的运动。', emoji: '' }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.WORLDS) { root.WORLDS = []; }
  root.WORLDS.push(WORLD);
  if (typeof module !== 'undefined' && module.exports) { module.exports = WORLD; }
})();
