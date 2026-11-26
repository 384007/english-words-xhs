/* Word Adventure cartoon-listening dialogues. ES5-safe UMD. Original scripts. */
(function(){
  var DIALOGUES = {
    'animals': [
    {
      id: 'animals-d1', title_en: 'At the Zoo', title_zh: '在动物园',
      lines: [
        { s: 'Lee', en: 'Look! A big lion!', zh: '看！一只大狮子！' },
        { s: 'Mia', en: 'Wow, it has a golden mane.', zh: '哇，它有金色的鬃毛。' },
        { s: 'Lee', en: 'Let us see the panda next.', zh: '我们接下来去看熊猫吧。' }
      ],
      questions: [
        { q: '他们先看到了什么动物？', opts: ['🦁', '🐼', '🐘', '🐒'], a: 0 },
        { q: '接下来他们想看什么？', opts: ['🐼', '🦁', '🐯', '🐻'], a: 0 }
      ]
    },
    {
      id: 'animals-d2', title_en: 'The Hungry Cat', title_zh: '饿了的猫',
      lines: [
        { s: 'Cat', en: 'Meow, I am so hungry.', zh: '喵，我好饿。' },
        { s: 'Sam', en: 'Here is some fish for you.', zh: '给你一些鱼。' },
        { s: 'Cat', en: 'Thank you! Yummy!', zh: '谢谢你！真好吃！' }
      ],
      questions: [
        { q: '猫感觉怎么样？', opts: ['😋', '😴', '😢', '😠'], a: 0 },
        { q: '山姆给了猫什么？', opts: ['🐟', '🥛', '🍖', '🥕'], a: 0 }
      ]
    },
    {
      id: 'animals-d3', title_en: 'Race in the Field', title_zh: '田野赛跑',
      lines: [
        { s: 'Rabbit', en: 'Let us race to the tree!', zh: '我们比赛跑到树那边！' },
        { s: 'Turtle', en: 'I am slow, but I will try.', zh: '我很慢，但我会努力。' },
        { s: 'Rabbit', en: 'Ready, set, go!', zh: '预备，开始，跑！' }
      ],
      questions: [
        { q: '谁跑得慢？', opts: ['🐢', '🐰', '🦊', '🐑'], a: 0 },
        { q: '他们比赛跑到哪里？', opts: ['🌳', '🏠', '🌊', '⛰️'], a: 0 }
      ]
    }
    ],
    'birds': [
    {
      id: 'birds-d1', title_en: 'Morning Song', title_zh: '清晨的歌',
      lines: [
        { s: 'Bird', en: 'Tweet tweet, good morning!', zh: '啾啾，早上好！' },
        { s: 'Ben', en: 'What a lovely song!', zh: '多好听的歌啊！' }
      ],
      questions: [
        { q: '是什么在唱歌？', opts: ['🐦', '🐝', '🐸', '🐱'], a: 0 },
        { q: '现在是一天中的什么时候？', opts: ['🌅', '🌙', '🌆', '⭐'], a: 0 }
      ]
    },
    {
      id: 'birds-d2', title_en: 'The Busy Bee', title_zh: '忙碌的蜜蜂',
      lines: [
        { s: 'Bee', en: 'Buzz! I need sweet nectar.', zh: '嗡！我需要甜甜的花蜜。' },
        { s: 'Flower', en: 'Come to me, little bee.', zh: '来我这里吧，小蜜蜂。' },
        { s: 'Bee', en: 'Thank you for the honey!', zh: '谢谢你的蜂蜜！' }
      ],
      questions: [
        { q: '蜜蜂想要什么？', opts: ['🌸', '🍖', '💧', '🧊'], a: 0 },
        { q: '谁在说话？', opts: ['🐝', '🦋', '🐞', '🕷️'], a: 0 }
      ]
    },
    {
      id: 'birds-d3', title_en: 'Catch the Butterfly', title_zh: '追蝴蝶',
      lines: [
        { s: 'Lily', en: 'Look at that butterfly!', zh: '看那只蝴蝶！' },
        { s: 'Tom', en: 'It has pretty wings.', zh: '它有漂亮的翅膀。' },
        { s: 'Lily', en: 'Do not touch it, let it fly.', zh: '别碰它，让它飞吧。' }
      ],
      questions: [
        { q: '他们看到了什么？', opts: ['🦋', '🐛', '🐜', '🐝'], a: 0 },
        { q: '莉莉想让蝴蝶怎样？', opts: ['🕊️', '🧺', '🏠', '😴'], a: 0 }
      ]
    }
    ],
    'sea': [
    {
      id: 'sea-d1', title_en: 'Under the Sea', title_zh: '在海底',
      lines: [
        { s: 'Fish', en: 'Hello, I live in the sea.', zh: '你好，我住在海里。' },
        { s: 'Crab', en: 'I walk on the sand.', zh: '我在沙子上走。' }
      ],
      questions: [
        { q: '谁在沙子上走？', opts: ['🦀', '🐟', '🐙', '🐳'], a: 0 },
        { q: '鱼住在哪里？', opts: ['🌊', '🏠', '🌳', '⛰️'], a: 0 }
      ]
    },
    {
      id: 'sea-d2', title_en: 'The Big Whale', title_zh: '大鲸鱼',
      lines: [
        { s: 'Kid', en: 'Wow, the whale is huge!', zh: '哇，鲸鱼好大！' },
        { s: 'Whale', en: 'I am the biggest animal.', zh: '我是最大的动物。' },
        { s: 'Kid', en: 'Can you splash the water?', zh: '你能溅起水花吗？' }
      ],
      questions: [
        { q: '谁是最大的动物？', opts: ['🐳', '🦈', '🐬', '🐠'], a: 0 },
        { q: '孩子想看什么？', opts: ['💦', '🔥', '❄️', '🍃'], a: 0 }
      ]
    },
    {
      id: 'sea-d3', title_en: 'Starfish Friends', title_zh: '海星朋友',
      lines: [
        { s: 'Star', en: 'I have five arms!', zh: '我有五条腕！' },
        { s: 'Shell', en: 'I keep a shiny pearl.', zh: '我藏着一颗闪亮的珍珠。' }
      ],
      questions: [
        { q: '海星有几条腕？', opts: ['5️⃣', '3️⃣', '8️⃣', '🔟'], a: 0 },
        { q: '贝壳里有什么？', opts: ['🫧', '🐟', '🪨', '🌊'], a: 0 }
      ]
    }
    ],
    'fruits': [
    {
      id: 'fruits-d1', title_en: 'Fruit Shop', title_zh: '水果店',
      lines: [
        { s: 'Boy', en: 'I want a red apple, please.', zh: '我想要一个红苹果，谢谢。' },
        { s: 'Shopkeeper', en: 'Here you go. It is sweet.', zh: '给你。它很甜。' }
      ],
      questions: [
        { q: '男孩想买什么？', opts: ['🍎', '🍌', '🍇', '🍊'], a: 0 },
        { q: '那个水果尝起来怎样？', opts: ['🍬', '🍋', '🧂', '🌶️'], a: 0 }
      ]
    },
    {
      id: 'fruits-d2', title_en: 'Sharing Grapes', title_zh: '分享葡萄',
      lines: [
        { s: 'Ann', en: 'Let us share these grapes.', zh: '我们分享这串葡萄吧。' },
        { s: 'Ken', en: 'Thank you, I love grapes.', zh: '谢谢，我爱吃葡萄。' }
      ],
      questions: [
        { q: '他们在分享什么？', opts: ['🍇', '🍉', '🍓', '🍑'], a: 0 },
        { q: '肯觉得怎么样？', opts: ['😄', '😢', '😠', '😴'], a: 0 }
      ]
    },
    {
      id: 'fruits-d3', title_en: 'Making Juice', title_zh: '榨果汁',
      lines: [
        { s: 'Mom', en: 'Let us make orange juice.', zh: '我们来做橙汁吧。' },
        { s: 'Kid', en: 'Yummy! I am thirsty.', zh: '好喝！我渴了。' }
      ],
      questions: [
        { q: '他们做的是什么果汁？', opts: ['🍊', '🍎', '🍇', '🍓'], a: 0 },
        { q: '孩子感觉怎样？', opts: ['🥤', '🍽️', '😴', '🥶'], a: 0 }
      ]
    }
    ],
    'vegetables': [
    {
      id: 'veg-d1', title_en: 'In the Garden', title_zh: '在菜园',
      lines: [
        { s: 'Grandpa', en: 'Help me pull the carrot.', zh: '帮我拔胡萝卜。' },
        { s: 'Kid', en: 'It is big and orange!', zh: '它又大又橙！' }
      ],
      questions: [
        { q: '他们在拔什么？', opts: ['🥕', '🥔', '🍅', '🌽'], a: 0 },
        { q: '这是在哪里？', opts: ['🌱', '🏠', '🏫', '🏖️'], a: 0 }
      ]
    },
    {
      id: 'veg-d2', title_en: 'The Spicy Pepper', title_zh: '辣辣的辣椒',
      lines: [
        { s: 'Kid', en: 'What is this red thing?', zh: '这个红色的东西是什么？' },
        { s: 'Mom', en: 'It is a pepper. It is spicy!', zh: '是辣椒。很辣哦！' }
      ],
      questions: [
        { q: '那个红色的东西是什么？', opts: ['🌶️', '🍓', '🍅', '🍎'], a: 0 },
        { q: '它尝起来怎样？', opts: ['🔥', '🍬', '🧊', '💧'], a: 0 }
      ]
    },
    {
      id: 'veg-d3', title_en: 'Making Salad', title_zh: '做沙拉',
      lines: [
        { s: 'Dad', en: 'Let us wash the lettuce.', zh: '我们来洗生菜吧。' },
        { s: 'Kid', en: 'Now we add a tomato.', zh: '现在我们加一个番茄。' }
      ],
      questions: [
        { q: '他们先洗什么？', opts: ['🥬', '🥕', '🧅', '🥔'], a: 0 },
        { q: '他们在做什么？', opts: ['🥗', '🍜', '🍰', '🍕'], a: 0 }
      ]
    }
    ],
    'food': [
    {
      id: 'food-d1', title_en: 'Breakfast Time', title_zh: '早餐时间',
      lines: [
        { s: 'Mom', en: 'Breakfast is ready!', zh: '早饭好了！' },
        { s: 'Kid', en: 'I want bread and milk.', zh: '我想要面包和牛奶。' }
      ],
      questions: [
        { q: '现在是哪一餐？', opts: ['🍳', '🍱', '🍲', '🍿'], a: 0 },
        { q: '孩子想喝什么？', opts: ['🥛', '☕', '🧃', '🥤'], a: 0 }
      ]
    },
    {
      id: 'food-d2', title_en: 'Ice Cream Day', title_zh: '冰淇淋日',
      lines: [
        { s: 'Kid', en: 'Can I have ice cream?', zh: '我能吃冰淇淋吗？' },
        { s: 'Dad', en: 'Sure, it is cold and sweet.', zh: '当然，它又冷又甜。' }
      ],
      questions: [
        { q: '孩子想吃什么？', opts: ['🍦', '🍔', '🍟', '🍜'], a: 0 },
        { q: '冰淇淋是什么味道？', opts: ['🍬', '🍋', '🌶️', '🧂'], a: 0 }
      ]
    },
    {
      id: 'food-d3', title_en: 'At the Table', title_zh: '在餐桌上',
      lines: [
        { s: 'Kid', en: 'I use chopsticks to eat.', zh: '我用筷子吃饭。' },
        { s: 'Mom', en: 'Good! Eat your rice.', zh: '很好！把饭吃了。' }
      ],
      questions: [
        { q: '孩子用什么吃饭？', opts: ['🥢', '🥄', '🍴', '🔪'], a: 0 },
        { q: '孩子在吃什么？', opts: ['🍚', '🍜', '🍞', '🥗'], a: 0 }
      ]
    }
    ],
    'colors': [
    {
      id: 'colors-d1', title_en: 'The Rainbow', title_zh: '彩虹',
      lines: [
        { s: 'Kid', en: 'Look at the rainbow!', zh: '看彩虹！' },
        { s: 'Mom', en: 'It has many colors.', zh: '它有很多颜色。' }
      ],
      questions: [
        { q: '他们看到了什么？', opts: ['🌈', '☁️', '⭐', '🌙'], a: 0 },
        { q: '彩虹有多少颜色？', opts: ['🎨', '1️⃣', '⚫', '⚪'], a: 0 }
      ]
    },
    {
      id: 'colors-d2', title_en: 'Drawing Shapes', title_zh: '画形状',
      lines: [
        { s: 'Kid', en: 'I draw a red circle.', zh: '我画一个红色的圆。' },
        { s: 'Teacher', en: 'Now draw a blue square.', zh: '现在画一个蓝色的正方形。' }
      ],
      questions: [
        { q: '孩子先画了什么形状？', opts: ['⭕', '🟥', '🔺', '⭐'], a: 0 },
        { q: '接下来画什么颜色？', opts: ['🔵', '🔴', '🟡', '🟢'], a: 0 }
      ]
    },
    {
      id: 'colors-d3', title_en: 'My Favorite Color', title_zh: '我最喜欢的颜色',
      lines: [
        { s: 'Ann', en: 'My favorite color is pink.', zh: '我最喜欢的颜色是粉色。' },
        { s: 'Ben', en: 'I like green like the grass.', zh: '我喜欢像草一样的绿色。' }
      ],
      questions: [
        { q: '安最喜欢什么颜色？', opts: ['🌸', '🟢', '🔵', '⚫'], a: 0 },
        { q: '本喜欢什么颜色？', opts: ['🟢', '🔴', '🟡', '🟣'], a: 0 }
      ]
    }
    ],
    'numbers': [
    {
      id: 'num-d1', title_en: 'Counting Apples', title_zh: '数苹果',
      lines: [
        { s: 'Kid', en: 'One, two, three apples.', zh: '一个、两个、三个苹果。' },
        { s: 'Mom', en: 'Good counting! Three apples.', zh: '数得好！三个苹果。' }
      ],
      questions: [
        { q: '一共有几个苹果？', opts: ['3️⃣', '1️⃣', '5️⃣', '8️⃣'], a: 0 },
        { q: '他们在数什么？', opts: ['🍎', '🍊', '🍌', '🍇'], a: 0 }
      ]
    },
    {
      id: 'num-d2', title_en: 'What Time Is It', title_zh: '几点了',
      lines: [
        { s: 'Kid', en: 'What time is it, Dad?', zh: '爸爸，几点了？' },
        { s: 'Dad', en: 'It is time for bed.', zh: '该睡觉了。' }
      ],
      questions: [
        { q: '现在该做什么了？', opts: ['🛏️', '🍽️', '🏫', '🎮'], a: 0 },
        { q: '孩子在问什么？', opts: ['⏰', '🌈', '🍎', '🐶'], a: 0 }
      ]
    },
    {
      id: 'num-d3', title_en: 'Days of the Week', title_zh: '星期',
      lines: [
        { s: 'Teacher', en: 'Today is Monday.', zh: '今天是星期一。' },
        { s: 'Kid', en: 'Tomorrow is Tuesday!', zh: '明天是星期二！' }
      ],
      questions: [
        { q: '今天是星期几？', opts: ['📅', '🌈', '🎂', '⛄'], a: 0 },
        { q: '他们在学什么？', opts: ['📆', '🔢', '🎨', '🎵'], a: 0 }
      ]
    }
    ],
    'body': [
    {
      id: 'body-d1', title_en: 'Touch Your Nose', title_zh: '摸摸鼻子',
      lines: [
        { s: 'Teacher', en: 'Touch your nose!', zh: '摸摸你的鼻子！' },
        { s: 'Kid', en: 'Now I touch my ears.', zh: '现在我摸我的耳朵。' }
      ],
      questions: [
        { q: '先摸哪里？', opts: ['👃', '👂', '👁️', '👄'], a: 0 },
        { q: '然后摸哪里？', opts: ['👂', '👃', '🦶', '✋'], a: 0 }
      ]
    },
    {
      id: 'body-d2', title_en: 'Wash Your Hands', title_zh: '洗手',
      lines: [
        { s: 'Mom', en: 'Wash your hands before lunch.', zh: '午饭前洗手。' },
        { s: 'Kid', en: 'Okay, I use soap.', zh: '好的，我用肥皂。' }
      ],
      questions: [
        { q: '妈妈让孩子做什么？', opts: ['🧼', '😴', '🏃', '🎨'], a: 0 },
        { q: '午饭前要做什么？', opts: ['🧼', '🍽️', '🛏️', '📺'], a: 0 }
      ]
    },
    {
      id: 'body-d3', title_en: 'I Can Jump', title_zh: '我会跳',
      lines: [
        { s: 'Kid', en: 'Look, I can jump high!', zh: '看，我能跳得很高！' },
        { s: 'Dad', en: 'Great! Use your legs.', zh: '太棒了！用你的腿。' }
      ],
      questions: [
        { q: '孩子在做什么？', opts: ['🤸', '😴', '🍴', '📖'], a: 0 },
        { q: '跳跃用身体的哪部分？', opts: ['🦵', '👂', '👃', '👁️'], a: 0 }
      ]
    }
    ],
    'family': [
    {
      id: 'fam-d1', title_en: 'My Family', title_zh: '我的家人',
      lines: [
        { s: 'Kid', en: 'This is my mom and dad.', zh: '这是我的妈妈和爸爸。' },
        { s: 'Friend', en: 'You have a nice family.', zh: '你有一个很好的家庭。' }
      ],
      questions: [
        { q: '孩子在介绍谁？', opts: ['👨‍👩‍👧‍👦', '🐶', '🏠', '🎒'], a: 0 },
        { q: '朋友觉得怎样？', opts: ['😊', '😠', '😢', '😴'], a: 0 }
      ]
    },
    {
      id: 'fam-d2', title_en: 'Grandma Visits', title_zh: '奶奶来访',
      lines: [
        { s: 'Grandma', en: 'I baked cookies for you.', zh: '我给你烤了饼干。' },
        { s: 'Kid', en: 'Thank you, Grandma! I love you.', zh: '谢谢奶奶！我爱你。' }
      ],
      questions: [
        { q: '奶奶带来了什么？', opts: ['🍪', '🍎', '🎈', '📚'], a: 0 },
        { q: '孩子对谁说话？', opts: ['👵', '👴', '👶', '👧'], a: 0 }
      ]
    },
    {
      id: 'fam-d3', title_en: 'Helping Mom', title_zh: '帮妈妈',
      lines: [
        { s: 'Kid', en: 'Mom, can I help you cook?', zh: '妈妈，我能帮你做饭吗？' },
        { s: 'Mom', en: 'Yes, thank you, dear.', zh: '可以，谢谢你，亲爱的。' }
      ],
      questions: [
        { q: '孩子想帮忙做什么？', opts: ['🍳', '🧹', '📚', '🎨'], a: 0 },
        { q: '妈妈的回答是？', opts: ['👍', '👎', '🤷', '😴'], a: 0 }
      ]
    }
    ],
    'clothes': [
    {
      id: 'clo-d1', title_en: 'Getting Dressed', title_zh: '穿衣服',
      lines: [
        { s: 'Kid', en: 'I put on my blue shirt.', zh: '我穿上蓝色的衬衫。' },
        { s: 'Mom', en: 'Do not forget your socks.', zh: '别忘了穿袜子。' }
      ],
      questions: [
        { q: '孩子穿的是什么？', opts: ['👕', '👖', '🧥', '👟'], a: 0 },
        { q: '妈妈提醒要穿什么？', opts: ['🧦', '👒', '🧤', '🧣'], a: 0 }
      ]
    },
    {
      id: 'clo-d2', title_en: 'A Rainy Day', title_zh: '下雨天',
      lines: [
        { s: 'Mom', en: 'It is raining. Take your umbrella.', zh: '下雨了，带上你的雨伞。' },
        { s: 'Kid', en: 'I wear my boots too.', zh: '我也穿上我的靴子。' }
      ],
      questions: [
        { q: '天气怎么样？', opts: ['🌧️', '☀️', '❄️', '🌈'], a: 0 },
        { q: '孩子拿了什么？', opts: ['☂️', '🧢', '🕶️', '👜'], a: 0 }
      ]
    },
    {
      id: 'clo-d3', title_en: 'Winter Clothes', title_zh: '冬天的衣服',
      lines: [
        { s: 'Kid', en: 'It is cold outside.', zh: '外面很冷。' },
        { s: 'Mom', en: 'Wear your warm scarf.', zh: '戴上你暖和的围巾。' }
      ],
      questions: [
        { q: '外面天气怎样？', opts: ['🥶', '🥵', '🌈', '🌞'], a: 0 },
        { q: '妈妈让孩子戴什么？', opts: ['🧣', '👟', '👓', '👜'], a: 0 }
      ]
    }
    ],
    'transport': [
    {
      id: 'tra-d1', title_en: 'Going to School', title_zh: '去上学',
      lines: [
        { s: 'Kid', en: 'I take the bus to school.', zh: '我坐公交车上学。' },
        { s: 'Mom', en: 'The bus is coming. Hurry up!', zh: '公交车来了，快点！' }
      ],
      questions: [
        { q: '孩子怎么去上学？', opts: ['🚌', '🚗', '🚲', '✈️'], a: 0 },
        { q: '妈妈让孩子怎样？', opts: ['⏰', '😴', '🍽️', '📺'], a: 0 }
      ]
    },
    {
      id: 'tra-d2', title_en: 'On the Train', title_zh: '在火车上',
      lines: [
        { s: 'Kid', en: 'The train goes very fast!', zh: '火车开得很快！' },
        { s: 'Dad', en: 'Hold the rail and sit down.', zh: '扶好扶手，坐下。' }
      ],
      questions: [
        { q: '他们在坐什么？', opts: ['🚆', '🚌', '🚕', '🚢'], a: 0 },
        { q: '火车怎么样？', opts: ['💨', '🐢', '🛑', '😴'], a: 0 }
      ]
    },
    {
      id: 'tra-d3', title_en: 'The Airplane', title_zh: '飞机',
      lines: [
        { s: 'Kid', en: 'Look, a plane in the sky!', zh: '看，天上有一架飞机！' },
        { s: 'Dad', en: 'It flies very high.', zh: '它飞得很高。' }
      ],
      questions: [
        { q: '他们看到了什么？', opts: ['✈️', '🚗', '🚢', '🚲'], a: 0 },
        { q: '飞机在哪里？', opts: ['☁️', '🌊', '🛣️', '🏠'], a: 0 }
      ]
    }
    ],
    'school': [
    {
      id: 'sch-d1', title_en: 'In the Classroom', title_zh: '在教室',
      lines: [
        { s: 'Teacher', en: 'Open your book, please.', zh: '请打开你们的书。' },
        { s: 'Kid', en: 'I have my pen ready.', zh: '我的笔准备好了。' }
      ],
      questions: [
        { q: '老师让学生做什么？', opts: ['📖', '😴', '🍽️', '🎮'], a: 0 },
        { q: '孩子准备好了什么？', opts: ['🖊️', '🍎', '⚽', '🎒'], a: 0 }
      ]
    },
    {
      id: 'sch-d2', title_en: 'Lost Eraser', title_zh: '丢了橡皮',
      lines: [
        { s: 'Kid', en: 'I cannot find my eraser.', zh: '我找不到我的橡皮。' },
        { s: 'Friend', en: 'Here, you can use mine.', zh: '给，你可以用我的。' }
      ],
      questions: [
        { q: '孩子丢了什么？', opts: ['🧽', '✏️', '📏', '📒'], a: 0 },
        { q: '朋友做了什么？', opts: ['🤝', '😠', '🏃', '😴'], a: 0 }
      ]
    },
    {
      id: 'sch-d3', title_en: 'Art Class', title_zh: '美术课',
      lines: [
        { s: 'Teacher', en: 'Today we draw with crayons.', zh: '今天我们用蜡笔画画。' },
        { s: 'Kid', en: 'I draw a happy sun.', zh: '我画一个开心的太阳。' }
      ],
      questions: [
        { q: '今天的课是什么？', opts: ['🎨', '🔢', '🎵', '⚽'], a: 0 },
        { q: '孩子画了什么？', opts: ['☀️', '🌙', '⭐', '☁️'], a: 0 }
      ]
    }
    ],
    'jobs': [
    {
      id: 'job-d1', title_en: 'At the Hospital', title_zh: '在医院',
      lines: [
        { s: 'Kid', en: 'The doctor helps sick people.', zh: '医生帮助病人。' },
        { s: 'Doctor', en: 'Open wide, say ah.', zh: '张大嘴，说啊。' }
      ],
      questions: [
        { q: '谁帮助病人？', opts: ['🧑‍⚕️', '👮', '👨‍🌾', '🧑‍🍳'], a: 0 },
        { q: '这是在哪里？', opts: ['🏥', '🏫', '🏪', '🏦'], a: 0 }
      ]
    },
    {
      id: 'job-d2', title_en: 'The Firefighter', title_zh: '消防员',
      lines: [
        { s: 'Kid', en: 'What does a firefighter do?', zh: '消防员做什么？' },
        { s: 'Dad', en: 'A firefighter puts out fires.', zh: '消防员灭火。' }
      ],
      questions: [
        { q: '消防员做什么？', opts: ['🔥', '🍳', '📚', '🎨'], a: 0 },
        { q: '谁在回答问题？', opts: ['👨', '👧', '👩', '👶'], a: 0 }
      ]
    },
    {
      id: 'job-d3', title_en: 'When I Grow Up', title_zh: '我长大后',
      lines: [
        { s: 'Kid', en: 'I want to be a pilot.', zh: '我想当飞行员。' },
        { s: 'Teacher', en: 'Great! You will fly planes.', zh: '太好了！你会驾驶飞机。' }
      ],
      questions: [
        { q: '孩子想做什么工作？', opts: ['🧑‍✈️', '🧑‍🍳', '👮', '🧑‍🏫'], a: 0 },
        { q: '飞行员驾驶什么？', opts: ['✈️', '🚗', '🚢', '🚲'], a: 0 }
      ]
    }
    ],
    'household': [
    {
      id: 'hou-d1', title_en: 'Clean Up Time', title_zh: '收拾时间',
      lines: [
        { s: 'Mom', en: 'Let us clean up the room.', zh: '我们来收拾房间吧。' },
        { s: 'Kid', en: 'I put my toys away.', zh: '我把玩具收好。' }
      ],
      questions: [
        { q: '他们在做什么？', opts: ['🧹', '🍽️', '😴', '🎮'], a: 0 },
        { q: '孩子收起了什么？', opts: ['🧸', '📚', '👕', '🥄'], a: 0 }
      ]
    },
    {
      id: 'hou-d2', title_en: 'Turn Off the Light', title_zh: '关灯',
      lines: [
        { s: 'Dad', en: 'It is bedtime. Turn off the light.', zh: '该睡觉了，关灯吧。' },
        { s: 'Kid', en: 'Good night, Dad.', zh: '晚安，爸爸。' }
      ],
      questions: [
        { q: '现在是什么时间？', opts: ['🌙', '🌅', '☀️', '🌆'], a: 0 },
        { q: '孩子要关什么？', opts: ['💡', '🚪', '🪟', '📺'], a: 0 }
      ]
    },
    {
      id: 'hou-d3', title_en: 'The Cozy Sofa', title_zh: '舒服的沙发',
      lines: [
        { s: 'Kid', en: 'I like to sit on the sofa.', zh: '我喜欢坐在沙发上。' },
        { s: 'Mom', en: 'It is soft and comfortable.', zh: '它又软又舒服。' }
      ],
      questions: [
        { q: '孩子喜欢坐在哪里？', opts: ['🛋️', '🪑', '🛏️', '🚪'], a: 0 },
        { q: '沙发怎么样？', opts: ['😌', '😠', '😢', '🥶'], a: 0 }
      ]
    }
    ],
    'kitchenware': [
    {
      id: 'kit-d1', title_en: 'Making Soup', title_zh: '煮汤',
      lines: [
        { s: 'Mom', en: 'I stir the soup with a spoon.', zh: '我用勺子搅汤。' },
        { s: 'Kid', en: 'It smells so good!', zh: '闻起来真香！' }
      ],
      questions: [
        { q: '妈妈用什么搅汤？', opts: ['🥄', '🍴', '🔪', '🥢'], a: 0 },
        { q: '孩子觉得汤怎样？', opts: ['😋', '🤢', '😴', '😠'], a: 0 }
      ]
    },
    {
      id: 'kit-d2', title_en: 'Careful, It Is Hot', title_zh: '小心烫',
      lines: [
        { s: 'Mom', en: 'Do not touch the pot. It is hot.', zh: '别碰锅，很烫。' },
        { s: 'Kid', en: 'Okay, I will wait.', zh: '好的，我等一下。' }
      ],
      questions: [
        { q: '什么东西很烫？', opts: ['🍲', '🧊', '🥛', '🍞'], a: 0 },
        { q: '孩子会怎么做？', opts: ['⏳', '🏃', '😴', '🎮'], a: 0 }
      ]
    },
    {
      id: 'kit-d3', title_en: 'Baking Cookies', title_zh: '烤饼干',
      lines: [
        { s: 'Kid', en: 'Let us bake cookies!', zh: '我们来烤饼干吧！' },
        { s: 'Mom', en: 'Put them in the oven.', zh: '把它们放进烤箱。' }
      ],
      questions: [
        { q: '他们在做什么？', opts: ['🍪', '🍜', '🥗', '🍕'], a: 0 },
        { q: '饼干放进哪里？', opts: ['🔥', '🧊', '🚰', '🗑️'], a: 0 }
      ]
    }
    ],
    'nature': [
    {
      id: 'nat-d1', title_en: 'A Sunny Day', title_zh: '晴天',
      lines: [
        { s: 'Kid', en: 'The sun is bright today.', zh: '今天太阳很明亮。' },
        { s: 'Mom', en: 'Let us go to the park.', zh: '我们去公园吧。' }
      ],
      questions: [
        { q: '今天天气怎样？', opts: ['☀️', '🌧️', '❄️', '🌫️'], a: 0 },
        { q: '他们要去哪里？', opts: ['🏞️', '🏫', '🏥', '🏪'], a: 0 }
      ]
    },
    {
      id: 'nat-d2', title_en: 'After the Rain', title_zh: '雨后',
      lines: [
        { s: 'Kid', en: 'Look, a rainbow!', zh: '看，彩虹！' },
        { s: 'Dad', en: 'It came after the rain.', zh: '它在雨后出现了。' }
      ],
      questions: [
        { q: '孩子看到了什么？', opts: ['🌈', '⛄', '🔥', '🌊'], a: 0 },
        { q: '彩虹什么时候出现？', opts: ['🌧️', '☀️', '🌙', '❄️'], a: 0 }
      ]
    },
    {
      id: 'nat-d3', title_en: 'Climbing the Hill', title_zh: '爬山',
      lines: [
        { s: 'Kid', en: 'The mountain is so tall!', zh: '这座山好高！' },
        { s: 'Dad', en: 'Let us climb to the top.', zh: '我们爬到山顶吧。' }
      ],
      questions: [
        { q: '他们在看什么？', opts: ['⛰️', '🌊', '🏜️', '🌳'], a: 0 },
        { q: '他们想爬到哪里？', opts: ['🔝', '🏠', '🌊', '🕳️'], a: 0 }
      ]
    }
    ],
    'places': [
    {
      id: 'pla-d1', title_en: 'At the Park', title_zh: '在公园',
      lines: [
        { s: 'Kid', en: 'Can we go to the park?', zh: '我们能去公园吗？' },
        { s: 'Mom', en: 'Yes, we can play there.', zh: '可以，我们可以在那里玩。' }
      ],
      questions: [
        { q: '孩子想去哪里？', opts: ['🏞️', '🏥', '🏦', '🏢'], a: 0 },
        { q: '妈妈怎么回答？', opts: ['👍', '👎', '🤷', '😴'], a: 0 }
      ]
    },
    {
      id: 'pla-d2', title_en: 'At the Library', title_zh: '在图书馆',
      lines: [
        { s: 'Kid', en: 'I want to borrow a book.', zh: '我想借一本书。' },
        { s: 'Librarian', en: 'Please be quiet here.', zh: '这里请保持安静。' }
      ],
      questions: [
        { q: '这是在哪里？', opts: ['📚', '🏖️', '🏪', '🎡'], a: 0 },
        { q: '图书馆里要怎样？', opts: ['🤫', '🔊', '🏃', '🎵'], a: 0 }
      ]
    },
    {
      id: 'pla-d3', title_en: 'The Supermarket', title_zh: '超市',
      lines: [
        { s: 'Mom', en: 'We buy food at the supermarket.', zh: '我们在超市买食物。' },
        { s: 'Kid', en: 'I push the cart.', zh: '我来推购物车。' }
      ],
      questions: [
        { q: '他们在哪里买食物？', opts: ['🛒', '🏥', '🏫', '🏦'], a: 0 },
        { q: '孩子推的是什么？', opts: ['🛒', '🚲', '🛴', '🧳'], a: 0 }
      ]
    }
    ],
    'verbs': [
    {
      id: 'ver-d1', title_en: 'Let Us Run', title_zh: '我们跑吧',
      lines: [
        { s: 'Kid', en: 'Let us run to the gate!', zh: '我们跑到大门那边！' },
        { s: 'Friend', en: 'Ready, set, go!', zh: '预备，开始，跑！' }
      ],
      questions: [
        { q: '他们要做什么？', opts: ['🏃', '😴', '🍽️', '📖'], a: 0 },
        { q: '他们跑到哪里？', opts: ['🚪', '🌊', '🌳', '🏠'], a: 0 }
      ]
    },
    {
      id: 'ver-d2', title_en: 'Catch the Ball', title_zh: '接球',
      lines: [
        { s: 'Kid', en: 'Throw the ball to me!', zh: '把球扔给我！' },
        { s: 'Friend', en: 'Okay, catch it!', zh: '好的，接住！' }
      ],
      questions: [
        { q: '第一个孩子想让对方做什么？', opts: ['🤾', '😴', '🍴', '📚'], a: 0 },
        { q: '他们在玩什么？', opts: ['⚽', '🎨', '🎵', '🧩'], a: 0 }
      ]
    },
    {
      id: 'ver-d3', title_en: 'Jump and Dance', title_zh: '跳跃和跳舞',
      lines: [
        { s: 'Kid', en: 'I can jump and dance!', zh: '我能又跳又舞！' },
        { s: 'Mom', en: 'You move so well.', zh: '你动得真好。' }
      ],
      questions: [
        { q: '孩子在做什么？', opts: ['💃', '😴', '🍽️', '📺'], a: 0 },
        { q: '妈妈觉得怎样？', opts: ['😊', '😠', '😢', '😴'], a: 0 }
      ]
    }
    ],
    'feelings': [
    {
      id: 'fee-d1', title_en: 'I Am Happy', title_zh: '我很开心',
      lines: [
        { s: 'Kid', en: 'I am so happy today!', zh: '我今天好开心！' },
        { s: 'Mom', en: 'Your smile is lovely.', zh: '你的笑容真可爱。' }
      ],
      questions: [
        { q: '孩子的心情如何？', opts: ['😄', '😢', '😠', '😨'], a: 0 },
        { q: '妈妈在夸什么？', opts: ['😊', '👟', '🎒', '🍎'], a: 0 }
      ]
    },
    {
      id: 'fee-d2', title_en: 'Do Not Be Scared', title_zh: '别害怕',
      lines: [
        { s: 'Kid', en: 'I am scared of the dark.', zh: '我害怕黑暗。' },
        { s: 'Dad', en: 'Do not worry, I am here.', zh: '别担心，我在这里。' }
      ],
      questions: [
        { q: '孩子害怕什么？', opts: ['🌑', '🌈', '☀️', '🌊'], a: 0 },
        { q: '爸爸让孩子怎样？', opts: ['😌', '😠', '🏃', '😴'], a: 0 }
      ]
    },
    {
      id: 'fee-d3', title_en: 'Cheer Up', title_zh: '振作起来',
      lines: [
        { s: 'Kid', en: 'I feel sad today.', zh: '我今天很难过。' },
        { s: 'Friend', en: 'Cheer up, let us play!', zh: '振作起来，我们去玩吧！' }
      ],
      questions: [
        { q: '孩子的心情如何？', opts: ['😢', '😄', '😠', '😴'], a: 0 },
        { q: '朋友想做什么？', opts: ['🎈', '😴', '📚', '🍽️'], a: 0 }
      ]
    }
    ],
    'sports': [
    {
      id: 'spo-d1', title_en: 'Soccer Game', title_zh: '足球比赛',
      lines: [
        { s: 'Kid', en: 'I kick the ball into the goal!', zh: '我把球踢进球门！' },
        { s: 'Coach', en: 'Great goal! Well done.', zh: '好球！做得好。' }
      ],
      questions: [
        { q: '他们在玩什么运动？', opts: ['⚽', '🏀', '🎾', '🏐'], a: 0 },
        { q: '教练觉得怎样？', opts: ['👏', '😠', '😴', '🤷'], a: 0 }
      ]
    },
    {
      id: 'spo-d2', title_en: 'At the Pool', title_zh: '在泳池',
      lines: [
        { s: 'Kid', en: 'I can swim now!', zh: '我现在会游泳了！' },
        { s: 'Dad', en: 'You are doing great.', zh: '你做得很好。' }
      ],
      questions: [
        { q: '孩子学会了什么？', opts: ['🏊', '🏃', '🚴', '⛷️'], a: 0 },
        { q: '这是在哪里？', opts: ['🏊', '🏟️', '🎾', '🏐'], a: 0 }
      ]
    },
    {
      id: 'spo-d3', title_en: 'The Big Race', title_zh: '大赛跑',
      lines: [
        { s: 'Kid', en: 'I want to win the race.', zh: '我想赢得赛跑。' },
        { s: 'Coach', en: 'Run fast and do your best!', zh: '跑快点，尽力而为！' }
      ],
      questions: [
        { q: '孩子想做什么？', opts: ['🏆', '😴', '🍽️', '📺'], a: 0 },
        { q: '教练让孩子怎样？', opts: ['💨', '🐢', '🛑', '😴'], a: 0 }
      ]
    }
    ],
    'toys': [
    {
      id: 'toy-d1', title_en: 'My Teddy Bear', title_zh: '我的泰迪熊',
      lines: [
        { s: 'Kid', en: 'I hug my teddy bear.', zh: '我抱着我的泰迪熊。' },
        { s: 'Mom', en: 'It is soft and cute.', zh: '它又软又可爱。' }
      ],
      questions: [
        { q: '孩子抱着什么？', opts: ['🧸', '⚽', '🪁', '🚗'], a: 0 },
        { q: '泰迪熊怎么样？', opts: ['😊', '😠', '🥶', '😢'], a: 0 }
      ]
    },
    {
      id: 'toy-d2', title_en: 'Flying a Kite', title_zh: '放风筝',
      lines: [
        { s: 'Kid', en: 'Look, my kite flies high!', zh: '看，我的风筝飞得很高！' },
        { s: 'Dad', en: 'The wind helps it go up.', zh: '风帮它飞起来。' }
      ],
      questions: [
        { q: '孩子在玩什么？', opts: ['🪁', '🧩', '🎲', '🪀'], a: 0 },
        { q: '什么帮风筝飞起来？', opts: ['💨', '💧', '🔥', '🌙'], a: 0 }
      ]
    },
    {
      id: 'toy-d3', title_en: 'Playing Music', title_zh: '演奏音乐',
      lines: [
        { s: 'Kid', en: 'I play the drum.', zh: '我打鼓。' },
        { s: 'Friend', en: 'I play the guitar!', zh: '我弹吉他！' }
      ],
      questions: [
        { q: '第一个孩子演奏什么？', opts: ['🥁', '🎸', '🎹', '🎺'], a: 0 },
        { q: '朋友演奏什么？', opts: ['🎸', '🥁', '🎻', '🎷'], a: 0 }
      ]
    }
    ],
    'festivals': [
    {
      id: 'fes-d1', title_en: 'Birthday Party', title_zh: '生日派对',
      lines: [
        { s: 'Kid', en: 'Happy birthday to you!', zh: '祝你生日快乐！' },
        { s: 'Friend', en: 'Thank you! Let us eat cake.', zh: '谢谢！我们来吃蛋糕吧。' }
      ],
      questions: [
        { q: '这是什么场合？', opts: ['🎂', '🎄', '🎃', '🧧'], a: 0 },
        { q: '他们要吃什么？', opts: ['🎂', '🍕', '🍜', '🥗'], a: 0 }
      ]
    },
    {
      id: 'fes-d2', title_en: 'New Year', title_zh: '新年',
      lines: [
        { s: 'Kid', en: 'Happy new year, Grandma!', zh: '奶奶，新年快乐！' },
        { s: 'Grandma', en: 'Here is your lucky money.', zh: '这是给你的压岁钱。' }
      ],
      questions: [
        { q: '他们在庆祝什么？', opts: ['🧧', '🎃', '🦃', '🥚'], a: 0 },
        { q: '奶奶给了什么？', opts: ['🧧', '🍪', '🎈', '📚'], a: 0 }
      ]
    },
    {
      id: 'fes-d3', title_en: 'The Fireworks', title_zh: '烟花',
      lines: [
        { s: 'Kid', en: 'Look at the fireworks!', zh: '看烟花！' },
        { s: 'Dad', en: 'They are so bright and colorful.', zh: '它们又明亮又多彩。' }
      ],
      questions: [
        { q: '他们在看什么？', opts: ['🎆', '🌈', '⭐', '🌙'], a: 0 },
        { q: '烟花怎么样？', opts: ['✨', '🌑', '🧊', '💧'], a: 0 }
      ]
    }
    ],
    'adjectives': [
    {
      id: 'adj-d1', title_en: 'Big and Small', title_zh: '大和小',
      lines: [
        { s: 'Kid', en: 'The elephant is big.', zh: '大象很大。' },
        { s: 'Friend', en: 'The ant is small.', zh: '蚂蚁很小。' }
      ],
      questions: [
        { q: '什么动物很大？', opts: ['🐘', '🐜', '🐭', '🐱'], a: 0 },
        { q: '什么动物很小？', opts: ['🐜', '🐘', '🐻', '🦁'], a: 0 }
      ]
    },
    {
      id: 'adj-d2', title_en: 'Fast and Slow', title_zh: '快和慢',
      lines: [
        { s: 'Kid', en: 'The car is fast.', zh: '汽车很快。' },
        { s: 'Friend', en: 'The turtle is slow.', zh: '乌龟很慢。' }
      ],
      questions: [
        { q: '什么东西很快？', opts: ['🚗', '🐢', '🐌', '🚶'], a: 0 },
        { q: '什么东西很慢？', opts: ['🐢', '🚗', '✈️', '🚀'], a: 0 }
      ]
    },
    {
      id: 'adj-d3', title_en: 'Hot and Cold', title_zh: '热和冷',
      lines: [
        { s: 'Kid', en: 'The soup is hot.', zh: '汤很热。' },
        { s: 'Mom', en: 'The ice is cold.', zh: '冰很冷。' }
      ],
      questions: [
        { q: '什么东西很热？', opts: ['🍲', '🧊', '❄️', '🥛'], a: 0 },
        { q: '什么东西很冷？', opts: ['🧊', '🔥', '🍲', '☀️'], a: 0 }
      ]
    }
    ]
  };
  var root = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.DIALOGUES) { root.DIALOGUES = {}; }
  for (var k in DIALOGUES) { if (DIALOGUES.hasOwnProperty(k)) { root.DIALOGUES[k] = DIALOGUES[k]; } }
  if (typeof module !== 'undefined' && module.exports) { module.exports = DIALOGUES; }
})();
