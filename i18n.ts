import { LocalizedString, FactionType, AttributeType } from './types';

// UI Translations
export const UI_TEXT = {
  enterName: { en: "Wanderer's Name", zh: "侠客姓名" },
  startJourney: { en: "Enter Jianghu", zh: "踏入江湖" },
  reroll: { en: "Reroll Fate", zh: "逆天改命" },
  attributes: { en: "Attributes", zh: "属性" },
  totalAttributes: { en: "Total Roll", zh: "属性总和" },
  skills: { en: "Martial Arts", zh: "武学" },
  correctionPoints: { en: "Correction Points", zh: "修正点数" },
  movement: { en: "Movement", zh: "移动" },
  actions: { en: "Actions", zh: "行动" },
  explore: { en: "Explore", zh: "探索" },
  practice: { en: "Practice", zh: "修炼" },
  meditate: { en: "Meditate", zh: "打坐" },
  work: { en: "Work", zh: "打工" },
  back: { en: "Back", zh: "返回" },
  logStart: { en: "The story begins...", zh: "江湖路远，故事由此开始……" },
  currentLoc: { en: "Location", zh: "当前位置" },
  faction: { en: "Faction", zh: "门派" },
  ronin: { en: "Wandering Ronin", zh: "无门无派" },
  hp: { en: "HP", zh: "气血" },
  stamina: { en: "Stamina", zh: "体力" },
  innerBreath: { en: "Inner Breath", zh: "内力" },
  inventory: { en: "Inventory", zh: "行囊" },
  gold: { en: "Gold", zh: "银两" },
  use: { en: "Use", zh: "使用" },
  drop: { en: "Drop", zh: "丢弃" },
  sell: { en: "Sell", zh: "出售" },
  merchantHere: { en: "Merchant Available", zh: "商贩在此" },
  cityActivity: { en: "City Activities", zh: "城市活动" },
  emptyInventory: { en: "Empty", zh: "空空如也" },
  itemGained: { en: "Obtained", zh: "获得" },
  itemLost: { en: "Lost", zh: "失去" },
  sold: { en: "Sold", zh: "售出" },
  for: { en: "for", zh: "获得" },
  notEnoughStamina: { en: "Exhausted (Low Stamina)", zh: "体力不支，无法行动" },
  workSuccess: { en: "Work Complete", zh: "打工完成" },
  workFail: { en: "Work Failed", zh: "搞砸了差事" },
};

// Attribute Translations
export const ATTR_NAMES: Record<string, LocalizedString> = {
  [AttributeType.INTELLIGENCE]: { en: "Intelligence", zh: "悟性" },
  [AttributeType.STRENGTH]: { en: "Strength", zh: "力量" },
  [AttributeType.AGILITY]: { en: "Agility", zh: "敏捷" },
  [AttributeType.CHIVALRY]: { en: "Chivalry", zh: "侠义" },
  [AttributeType.LIFESPAN]: { en: "Lifespan", zh: "寿命" },
  [AttributeType.LUCK]: { en: "Luck", zh: "福源" },
};

// Raw Data for Factions to be processed in constants.ts
export const RAW_FACTIONS = [
  // --- ORTHODOX (正派) ---
  {
    id: "shaolin", name: { en: "Shaolin", zh: "少林" }, type: FactionType.ORTHODOX,
    skills: { en: ["Arhat Fist", "Shaolin Staff", "Shaolin Sword", "Shaolin Palm", "Prajna Palm", "Taming Tiger Fist", "Muscle Change Classic", "Zen Meditation"], zh: ["罗汉拳", "少林棍", "少林剑", "少林掌", "般若掌", "伏虎拳", "易筋经", "禅定法"] },
    special: { en: ["Diamond Body", "Dharma Secret", "Yi Jin Jing Ultimate", "Void Fist"], zh: ["金刚不坏神功", "达摩秘法", "易筋经奥义", "空空拳"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 50, [AttributeType.AGILITY]: 40, [AttributeType.CHIVALRY]: 70 }
  },
  {
    id: "wudang", name: { en: "Wudang", zh: "武当" }, type: FactionType.ORTHODOX,
    skills: { en: ["Taiji Fist", "Taiji Sword", "Sword Intent", "Universe Shift", "Wudang Sword", "Inner Breath", "Cloud Hands", "Lightness Step"], zh: ["太极拳", "太极剑", "剑意掌法", "乾坤大挪移", "武当剑法", "内功心法", "云手", "轻身术"] },
    special: { en: ["Purple Cloud Divine Art", "Universe Sword", "Taiji Spirit", "Vertical Sword Qi"], zh: ["紫霞神功", "乾坤无极剑", "太极神意", "剑气纵横"] },
    req: { [AttributeType.INTELLIGENCE]: 65, [AttributeType.STRENGTH]: 40, [AttributeType.AGILITY]: 55, [AttributeType.CHIVALRY]: 65 }
  },
  {
    id: "huashan", name: { en: "Huashan", zh: "华山" }, type: FactionType.ORTHODOX,
    skills: { en: ["Huashan Sword", "Sword Qi", "Huashan Fist", "Snow Treading", "Fast Sword", "Cloud Step", "Palm Intent", "Willow Wind"], zh: ["华山剑法", "剑气纵横", "华山拳", "踏雪无痕", "快剑术", "轻功步法", "剑意掌", "回风拂柳"] },
    special: { en: ["Purple Mist Sword", "Spirit Snake", "Emotionless Art", "Wind Rider"], zh: ["紫霞神剑", "灵蛇剑意", "绝情神功", "踏剑惊风"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 45, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 60 }
  },
  {
    id: "emei", name: { en: "Emei", zh: "峨眉" }, type: FactionType.ORTHODOX,
    skills: { en: ["Emei Sword", "Emei Palm", "Light Step", "Sword Intent", "Soft Palm", "Maiden Heart", "Inner Cultivation", "Cloud Hands"], zh: ["峨眉剑法", "峨眉掌法", "轻功步法", "剑意掌", "柔情掌", "女儿心法", "内功修炼", "云手"] },
    special: { en: ["Nine Yin Claw", "Emei Ultimate", "Rainbow Qi", "Shadowless Palm"], zh: ["九阴白骨爪", "峨眉绝学", "剑气如虹", "无影掌"] },
    req: { [AttributeType.INTELLIGENCE]: 65, [AttributeType.STRENGTH]: 40, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 65 }
  },
  {
    id: "kongtong", name: { en: "Kongtong", zh: "崆峒" }, type: FactionType.ORTHODOX,
    skills: { en: ["Kongtong Sword", "Kongtong Fist", "Light Body", "Sword Palm", "Cloud Step", "Grappling", "Mountain Splitting", "Iron Palm"], zh: ["崆峒剑法", "崆峒拳", "轻身术", "剑意掌法", "云步", "擒拿手", "开山掌", "铁砂掌"] },
    special: { en: ["Seven Injuries Fist", "Big Dipper Palm", "Sky Breaking Sword", "Shadow Hand"], zh: ["七伤拳", "天罡掌", "剑破苍穹", "无影手"] },
    req: { [AttributeType.INTELLIGENCE]: 55, [AttributeType.STRENGTH]: 50, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 65 }
  },
  {
    id: "quanzhen", name: { en: "Quanzhen", zh: "全真" }, type: FactionType.ORTHODOX,
    skills: { en: ["Quanzhen Sword", "Taoist Heart", "Light Step", "Sword Palm Union", "Cloud Hands", "Universe Palm", "Taiji Fist", "Dantian Breath"], zh: ["全真剑法", "内功心法", "轻功步法", "剑掌合一", "云手", "乾坤掌", "太极拳", "丹田修炼"] },
    special: { en: ["Golden Light Art", "Inner Dan Art", "Sword Ultimate", "Nine Heavens Art"], zh: ["金光神功", "内丹心法", "剑道绝学", "九天神功"] },
    req: { [AttributeType.INTELLIGENCE]: 65, [AttributeType.STRENGTH]: 40, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 65 }
  },
  {
    id: "beggars", name: { en: "Beggars' Sect", zh: "丐帮" }, type: FactionType.ORTHODOX,
    skills: { en: ["Dragon Subduing Palm", "Dog Beating Staff", "Light Step", "Staff Intent", "Fist Art", "Step Training", "Palm Art", "Breathing"], zh: ["降龙十八掌", "打狗棒法", "轻功步法", "棍意", "拳法", "步法", "掌法", "呼吸法"] },
    special: { en: ["Dog Beating Ultimate", "Invincible Dragon", "Spirit Monkey Staff", "Hundred Transformations"], zh: ["打狗棒奥义", "降龙无敌掌", "灵猴棍法", "神行百变"] },
    req: { [AttributeType.INTELLIGENCE]: 55, [AttributeType.STRENGTH]: 55, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 70 }
  },
  {
    id: "qingcheng", name: { en: "Qingcheng", zh: "青城" }, type: FactionType.ORTHODOX,
    skills: { en: ["Qingcheng Sword", "Sword Heart", "Green Cloud Palm", "Light Step", "Sword Dance", "Palm Intent", "Inner Force", "Soft Power"], zh: ["青城剑法", "剑意心法", "青云掌", "轻功步法", "剑舞", "掌意", "内力心法", "柔劲术"] },
    special: { en: ["Dragon Soaring Sword", "Green Cloud Ultimate", "Thousand Miles Trace", "Big Dipper Heart"], zh: ["龙腾剑法", "青云绝学", "万里无踪", "天罡心法"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 45, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 60 }
  },
  {
    id: "kunlun", name: { en: "Kunlun", zh: "昆仑" }, type: FactionType.ORTHODOX,
    skills: { en: ["Kunlun Sword", "Snow Palm", "High Step", "Silent Fist", "Frost Breath", "Mountain Kick", "Dual Sword", "Ice Heart"], zh: ["昆仑剑法", "落雪掌", "高山步", "无声拳", "寒冰气", "昆仑腿", "两仪剑", "冰心诀"] },
    special: { en: ["Three Sages Sword", "Zither Heart", "Chaos Opening", "Kunlun Miracle"], zh: ["三圣剑", "琴心剑胆", "混沌初开", "昆仑神迹"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 50, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 60 }
  },
  {
    id: "tianlong", name: { en: "Tianlong Temple", zh: "天龙寺" }, type: FactionType.ORTHODOX,
    skills: { en: ["Finger Sword", "Monk Fist", "Golden Light", "Zen Step", "Lion Roar", "Finger Strike", "Staff Defense", "Meditation"], zh: ["一阳指", "罗汉拳", "金光罩", "禅步", "狮子吼", "指力", "护法棍", "枯荣禅"] },
    special: { en: ["Six Vein Sword", "Kurong Divine Art", "Imperial Finger", "Dragon Roar"], zh: ["六脉神剑", "枯荣神功", "一阳指极意", "天龙吟"] },
    req: { [AttributeType.INTELLIGENCE]: 70, [AttributeType.STRENGTH]: 40, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 65 }
  },
  {
    id: "hengshan_n", name: { en: "North Hengshan", zh: "北恒山" }, type: FactionType.ORTHODOX,
    skills: { en: ["Hengshan Sword", "Iron Bone", "Endurance Breath", "Mountain Step", "Solid Palm", "Defense Stance", "Sword Wall", "Inner Force"], zh: ["恒山剑法", "铁骨功", "龟息法", "登山步", "开山掌", "铁壁势", "剑盾", "混元功"] },
    special: { en: ["Indestructible", "Moving Mountain", "Sword Barrier", "Eternal Peak"], zh: ["金刚不坏", "移山填海", "万剑归宗", "恒山绝顶"] },
    req: { [AttributeType.INTELLIGENCE]: 50, [AttributeType.STRENGTH]: 65, [AttributeType.AGILITY]: 40, [AttributeType.CHIVALRY]: 60 }
  },
  {
    id: "hengshan_s", name: { en: "South Hengshan", zh: "南衡山" }, type: FactionType.ORTHODOX,
    skills: { en: ["Cloud Sword", "Mist Step", "Illusion Palm", "Ghost Strike", "Fast Stab", "Soft Breath", "Confusing Move", "Hidden Dagger"], zh: ["云雾剑", "烟雨步", "幻影掌", "鬼影刺", "快刺", "柔息", "迷踪", "藏锋"] },
    special: { en: ["Thousand Illusion", "Mist Dragon", "Sorrowful Sword", "Rain Flower"], zh: ["千幻剑", "云龙九现", "潇湘夜雨", "落花神剑"] },
    req: { [AttributeType.INTELLIGENCE]: 65, [AttributeType.STRENGTH]: 35, [AttributeType.AGILITY]: 65, [AttributeType.CHIVALRY]: 60 }
  },

  // --- EVIL (邪派) ---
  {
    id: "demonic_cult", name: { en: "Demonic Cult", zh: "魔教" }, type: FactionType.EVIL,
    skills: { en: ["Poison Palm", "Black Wind Blade", "Shadow Step", "Snake Fist", "Poison Needle", "Phantom Step", "Gale Fist", "Night Walk"], zh: ["毒掌", "黑风刀法", "暗影步法", "蛇行拳", "毒针术", "幻影步", "狂风拳", "夜行术"] },
    special: { en: ["Myriad Poison Palm", "Ghost Trace", "Soul Blade", "Heaven Demon Art"], zh: ["万毒神掌", "鬼影迷踪", "阴魂刀意", "天魔奥义"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 50, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 10 }
  },
  {
    id: "blood_blade", name: { en: "Blood Blade Sect", zh: "血刀门" }, type: FactionType.EVIL,
    skills: { en: ["Blood Blade Art", "Blood Shadow Palm", "Blood Edge Sword", "Shadow Step", "Poison Hand", "Blood Rain Fist", "Swift Step", "Night Walk"], zh: ["血刀大法", "血影掌", "血刃剑法", "暗影步", "毒手", "血雨拳", "迅影步", "夜行步"] },
    special: { en: ["Blood Sea Art", "Blood Shadow God Palm", "Blade Intent", "Blood Soul"], zh: ["血海魔功", "血影神掌", "刀意纵横", "血魂奥义"] },
    req: { [AttributeType.INTELLIGENCE]: 55, [AttributeType.STRENGTH]: 60, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 5 }
  },
  {
    id: "baituo", name: { en: "White Camel Mtn", zh: "白驼山" }, type: FactionType.EVIL,
    skills: { en: ["White Camel Palm", "Snake Fist", "Dark Weapon", "Light Step", "Eagle Claw", "Poison Needle", "Toad Style", "Claw Fist"], zh: ["白驼毒掌", "毒蛇拳法", "暗器术", "轻功步法", "鹰爪手", "毒针术", "蛤蟆功", "鹰爪拳"] },
    special: { en: ["Myriad Snake Art", "Poison Cloud", "White Camel Ultimate", "Snake Movement"], zh: ["万毒蛇神功", "毒云掌法", "白驼绝学", "蛇行奥义"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 50, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 5 }
  },
  {
    id: "black_cliff", name: { en: "Black Cliff", zh: "黑木崖" }, type: FactionType.EVIL,
    skills: { en: ["Black Wood Sword", "Shadow Palm", "Ghost Step", "Poison Hand", "Needle Art", "Killer Fist", "Step Training", "Lightness"], zh: ["黑木剑法", "阴影掌", "鬼影步法", "毒手", "暗器术", "杀气拳", "步法训练", "轻功"] },
    special: { en: ["Demon Sword Ultimate", "Ghost Trace", "Black Wood Art", "Sky Breaking Step"], zh: ["魔剑奥义", "鬼影无踪", "黑木神功", "步破苍穹"] },
    req: { [AttributeType.INTELLIGENCE]: 55, [AttributeType.STRENGTH]: 55, [AttributeType.AGILITY]: 55, [AttributeType.CHIVALRY]: 10 }
  },
  {
    id: "star_constellation", name: { en: "Star Sect", zh: "星宿派" }, type: FactionType.EVIL,
    skills: { en: ["Rotting Corpse Palm", "Star Staff", "Poison Fire", "Flattery Art", "Throwing Needle", "Cloud Step", "Toxic Breath", "Bug Summon"], zh: ["腐尸毒掌", "星宿杖法", "毒火攻心", "拍马功", "飞针术", "青云步", "化功法", "唤虫术"] },
    special: { en: ["Life Dissolving Art", "Old Freak's Magic", "Green Wood", "Infinite Poison"], zh: ["化功大法", "老仙法力", "神木王鼎", "无尽毒功"] },
    req: { [AttributeType.INTELLIGENCE]: 50, [AttributeType.STRENGTH]: 40, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 5 }
  },
  {
    id: "sun_moon", name: { en: "Sun Moon Cult", zh: "日月神教" }, type: FactionType.EVIL,
    skills: { en: ["Sun Moon Blade", "Absorbing Art", "Shadow Stitch", "Fast Move", "Vampire Strike", "Chaos Walk", "Twin Ring", "Dark Force"], zh: ["日月刀法", "吸星法", "穿针引线", "极速", "吸血击", "乱步", "双环手", "暗劲"] },
    special: { en: ["Star Absorbing Great Art", "Undefeatable East", "Sunflower Manual", "Needle Storm"], zh: ["吸星大法", "东方不败", "葵花宝典", "暴雨梨花"] },
    req: { [AttributeType.INTELLIGENCE]: 70, [AttributeType.STRENGTH]: 50, [AttributeType.AGILITY]: 70, [AttributeType.CHIVALRY]: 10 }
  },
  {
    id: "five_poison", name: { en: "Five Poison Cult", zh: "五毒教" }, type: FactionType.EVIL,
    skills: { en: ["Whip Art", "Scorpion Kick", "Spider Web", "Centipede Jump", "Snake Bite", "Toad Breath", "Poison Mist", "Soft Step"], zh: ["软鞭法", "蝎尾腿", "蛛网阵", "百足跃", "蛇咬手", "蟾蜍息", "毒雾", "软步"] },
    special: { en: ["Five Poison Array", "Gu King Art", "Thousand Silk", "Venomous Explosion"], zh: ["五毒大阵", "蛊王神功", "千丝万缕", "万毒爆发"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 70, [AttributeType.CHIVALRY]: 10 }
  },
  {
    id: "blissful_valley", name: { en: "Blissful Valley", zh: "极乐谷" }, type: FactionType.EVIL,
    skills: { en: ["Pleasure Fist", "Illusion Dance", "Dual Dagger", "Charming Eye", "Fast Track", "Hidden Kick", "Soft Touch", "Breath Control"], zh: ["极乐拳", "幻舞", "双刺", "媚眼", "疾行", "暗腿", "柔手", "调息"] },
    special: { en: ["Ecstasy Art", "Life Taking Music", "Phantom Flash", "Heavenly Bliss"], zh: ["合欢神功", "夺命魔音", "幻影闪", "登仙极乐"] },
    req: { [AttributeType.INTELLIGENCE]: 55, [AttributeType.STRENGTH]: 40, [AttributeType.AGILITY]: 65, [AttributeType.CHIVALRY]: 15 }
  },
  {
    id: "wolf_mountain", name: { en: "Wolf Mountain", zh: "恶狼山" }, type: FactionType.EVIL,
    skills: { en: ["Wolf Claw", "Howling", "Pack Tactics", "Bite Strike", "Running Art", "Cruel Dagger", "Ambush", "Wild Strength"], zh: ["狼爪手", "啸月功", "群狼阵", "撕咬", "奔袭", "残忍匕", "伏击", "野性之力"] },
    special: { en: ["Blood Moon", "Alpha Aura", "Feral Rage", "Throat Ripper"], zh: ["血月大阵", "狼王威压", "野性狂暴", "锁喉手"] },
    req: { [AttributeType.INTELLIGENCE]: 30, [AttributeType.STRENGTH]: 70, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 5 }
  },
  {
    id: "ghost_domain", name: { en: "Ghost Domain", zh: "幽冥鬼域" }, type: FactionType.EVIL,
    skills: { en: ["Ghost Claw", "Fear Strike", "Spirit Walk", "Cold Touch", "Shadow Bind", "Night Vision", "Soul Cry", "Bone Shield"], zh: ["鬼爪", "恐吓击", "鬼步", "寒触", "影缚", "夜视", "鬼哭", "白骨盾"] },
    special: { en: ["Netherworld Art", "Resurrection (Fake)", "Soul Eater", "Nightmare Realm"], zh: ["九幽神功", "借尸还魂", "噬魂大法", "梦魇领域"] },
    req: { [AttributeType.INTELLIGENCE]: 65, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 0 }
  },
  {
    id: "iron_palm", name: { en: "Iron Palm Gang", zh: "铁掌帮" }, type: FactionType.EVIL,
    skills: { en: ["Iron Sand Palm", "River Walking", "Heavy Axe", "Water Dive", "Strong Fist", "Boat Defense", "Wet Step", "Breathing"], zh: ["铁砂掌", "水上漂", "开山斧", "潜水术", "刚拳", "舟行", "湿步", "吐纳"] },
    special: { en: ["Iron Palm Floating", "Dragon Breaking Palm", "Steel Body", "River God Wrath"], zh: ["铁掌水上漂", "摧心掌", "铁布衫", "河神怒"] },
    req: { [AttributeType.INTELLIGENCE]: 40, [AttributeType.STRENGTH]: 75, [AttributeType.AGILITY]: 40, [AttributeType.CHIVALRY]: 20 }
  },
  {
    id: "spider_cave", name: { en: "Spider Cave", zh: "盘丝洞" }, type: FactionType.EVIL,
    skills: { en: ["Silk Throw", "Web Trap", "Poison Bite", "Ceiling Walk", "Eight Leg Step", "Sticky Hand", "Cocoon Defense", "Silent Kill"], zh: ["吐丝", "结网", "毒牙", "壁虎游墙", "八步赶蝉", "粘手", "结茧", "无声杀"] },
    special: { en: ["Heaven Web", "Widow's Kiss", "Silk Cutting Art", "Queen's Command"], zh: ["天罗地网", "寡妇之吻", "断丝神功", "蛛后号令"] },
    req: { [AttributeType.INTELLIGENCE]: 65, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 75, [AttributeType.CHIVALRY]: 5 }
  },

  // --- NEUTRAL (中立) ---
  {
    id: "tang_clan", name: { en: "Tang Clan", zh: "唐门" }, type: FactionType.NEUTRAL,
    skills: { en: ["Hidden Arrow", "Poison Dart", "Mechanism Lore", "Silent Step", "Fan Art", "Quick Throw", "Smoke Bomb", "Agility Training"], zh: ["袖箭", "毒镖", "机关术", "无声步", "铁扇功", "速投", "烟雾弹", "身法训练"] },
    special: { en: ["Storm Pear Flower", "Buddha's Anger", "Hell's Invitation", "Puppet Control"], zh: ["暴雨梨花针", "佛怒唐莲", "阎王帖", "傀儡术"] },
    req: { [AttributeType.INTELLIGENCE]: 70, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 70, [AttributeType.CHIVALRY]: 40 }
  },
  {
    id: "peach_blossom", name: { en: "Peach Blossom", zh: "桃花岛" }, type: FactionType.NEUTRAL,
    skills: { en: ["Jade Flute Sword", "Finger Flick", "Orchid Hand", "Wave Step", "Music Art", "Calculation", "Flower Rain", "Mask Disguise"], zh: ["玉箫剑法", "弹指神通", "兰花拂穴手", "碧波步", "音律", "术数", "落英缤纷", "易容术"] },
    special: { en: ["Anthem of Tide", "Qimen Dunjia", "Whirlwind Kick", "Finger of Void"], zh: ["碧海潮生曲", "奇门遁甲", "旋风扫叶腿", "空明指"] },
    req: { [AttributeType.INTELLIGENCE]: 80, [AttributeType.STRENGTH]: 40, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 50 }
  },
  {
    id: "six_fan", name: { en: "Six Fan Gate", zh: "六扇门" }, type: FactionType.NEUTRAL,
    skills: { en: ["Arrest Chain", "Blade of Law", "Tracking", "Interrogation", "Eagle Eye", "Sprint", "Subdue Art", "Official Saber"], zh: ["锁链术", "公门刀法", "追踪术", "审问", "鹰眼", "疾跑", "擒拿", "官刀"] },
    special: { en: ["Imperial Warrant", "Net of Heaven", "Judge's Brush", "Execution Blade"], zh: ["御赐金牌", "天罗地网", "判官笔", "处决刀"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 55, [AttributeType.AGILITY]: 55, [AttributeType.CHIVALRY]: 60 }
  },
  {
    id: "longmen", name: { en: "Longmen Escort", zh: "龙门镖局" }, type: FactionType.NEUTRAL,
    skills: { en: ["Escort Spear", "Shield Defense", "Flag Wave", "Horse Riding", "Road Knowledge", "Bandit Talk", "Strong Arm", "Alertness"], zh: ["护镖枪法", "盾牌防守", "镖旗功", "骑术", "识途", "切口", "铁臂", "警觉"] },
    special: { en: ["Safe Passage", "Formation Break", "Iron Will", "Dragon Spear"], zh: ["平安帖", "破阵枪", "钢铁意志", "龙门神枪"] },
    req: { [AttributeType.INTELLIGENCE]: 50, [AttributeType.STRENGTH]: 65, [AttributeType.AGILITY]: 40, [AttributeType.CHIVALRY]: 55 }
  },
  {
    id: "golden_coin", name: { en: "Gold Coin Lodge", zh: "金钱帮" }, type: FactionType.NEUTRAL,
    skills: { en: ["Coin Dart", "Gold Ring", "Bribe Art", "Calculated Strike", "Heavy Hand", "Greed Eye", "Vault Protection", "Mercenary Step"], zh: ["金钱镖", "龙凤金环", "买通术", "算计击", "重手", "贪婪眼", "守库", "佣兵步"] },
    special: { en: ["Money Rules All", "Golden Armor", "Coin Storm", "Wealth Power"], zh: ["有钱能使鬼推磨", "金丝甲", "漫天花雨", "财可通神"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 50, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 30 }
  },
  {
    id: "scholar_manor", name: { en: "Scholar Manor", zh: "万卷山庄" }, type: FactionType.NEUTRAL,
    skills: { en: ["Calligraphy Sword", "Ink Splash", "Fan Defense", "Poetry Chant", "Brush Point", "Paper Cut", "Focus", "Reading"], zh: ["书法剑", "泼墨", "折扇防", "吟诗", "点睛笔", "纸刀", "专注", "读书"] },
    special: { en: ["Words as Weapons", "Painting World", "Sage's Wisdom", "Ink Dragon"], zh: ["笔伐", "画中界", "圣人言", "墨龙"] },
    req: { [AttributeType.INTELLIGENCE]: 85, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 40, [AttributeType.CHIVALRY]: 50 }
  },
  {
    id: "medicine_king", name: { en: "Medicine Valley", zh: "药王谷" }, type: FactionType.NEUTRAL,
    skills: { en: ["Herb Gathering", "Acupuncture", "Healing Palm", "Poison Resistance", "Scalpel Art", "Diagnosis", "Light Walk", "Boiling Pot"], zh: ["采药", "针灸", "回春掌", "百毒不侵", "手术刀", "望闻问切", "轻步", "药鼎"] },
    special: { en: ["Life & Death Needle", "Divine Healing", "Poison Transmutation", "Golden Elixir"], zh: ["生死符", "神农术", "化毒为药", "金丹大道"] },
    req: { [AttributeType.INTELLIGENCE]: 75, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 50, [AttributeType.CHIVALRY]: 60 }
  },
  {
    id: "heaven_sound", name: { en: "Heaven Sound", zh: "天音阁" }, type: FactionType.NEUTRAL,
    skills: { en: ["Zither Wave", "Flute Piercing", "Drum Shock", "Dance Step", "Siren Song", "Rhythm Hit", "Sound Wall", "Ear Training"], zh: ["琴波", "魔笛音", "震魂鼓", "舞步", "摄魂歌", "节拍击", "音障", "听风"] },
    special: { en: ["Eight Notes", "Shattering Scream", "Silent Melody", "Heavenly Chord"], zh: ["天龙八音", "狮子吼", "大音希声", "广陵散"] },
    req: { [AttributeType.INTELLIGENCE]: 70, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 50 }
  },
  {
    id: "divine_machine", name: { en: "Divine Machine", zh: "神机营" }, type: FactionType.NEUTRAL,
    skills: { en: ["Musket Shot", "Trap Setting", "Gear Grinding", "Flamethrower", "Mine Layer", "Calculate Arc", "Steady Aim", "Engineering"], zh: ["火铳", "布雷", "机关", "喷火", "地雷", "弹道", "瞄准", "工程"] },
    special: { en: ["Thunder Cannon", "Automated Puppet", "Rain of Fire", "Iron Fortress"], zh: ["神威大炮", "自律机兵", "火雨", "钢铁堡垒"] },
    req: { [AttributeType.INTELLIGENCE]: 80, [AttributeType.STRENGTH]: 40, [AttributeType.AGILITY]: 40, [AttributeType.CHIVALRY]: 50 }
  },
  {
    id: "drunken_inn", name: { en: "Drunken Inn", zh: "醉仙楼" }, type: FactionType.NEUTRAL,
    skills: { en: ["Drunken Step", "Cup Throw", "Wine Spit", "Staggering Hit", "Barrel Roll", "Toast", "Bottle Smash", "Alcohol Tol."], zh: ["醉步", "掷杯", "喷酒", "跌撞击", "滚桶", "敬酒", "碎瓶", "酒量"] },
    special: { en: ["Drunken Eight Immortals", "Inflammable Breath", "Sober Strike", "Godly Brew"], zh: ["醉八仙", "酒火", "醒神一击", "神仙酿"] },
    req: { [AttributeType.INTELLIGENCE]: 50, [AttributeType.STRENGTH]: 50, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 50 }
  },
  {
    id: "mystic_villa", name: { en: "Mystic Villa", zh: "迷影山庄" }, type: FactionType.NEUTRAL,
    skills: { en: ["Information Gathering", "Shadow Hide", "Rumor Spread", "Disguise", "Cipher", "Quick Ear", "Soft Dagger", "Map Reading"], zh: ["探听", "影遁", "谣言", "易容", "暗号", "顺风耳", "软剑", "读图"] },
    special: { en: ["All Knowing", "Thousand Faces", "Ghost Contract", "Truth Seeker"], zh: ["百晓生", "千面人", "鬼契", "寻真"] },
    req: { [AttributeType.INTELLIGENCE]: 75, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 40 }
  },
  {
    id: "gambler_hall", name: { en: "Gambler Hall", zh: "千王殿" }, type: FactionType.NEUTRAL,
    skills: { en: ["Dice Throw", "Card Slice", "Coin Roll", "Luck Steal", "Bluff", "Sleight Hand", "Tile Smash", "Calculate Odds"], zh: ["掷骰", "飞牌", "滚钱", "偷运", "诈术", "千手", "碎牌", "算率"] },
    special: { en: ["God of Gamblers", "Fate Twist", "Jackpot Strike", "All In"], zh: ["赌神附体", "扭转乾坤", "大满贯", "孤注一掷"] },
    req: { [AttributeType.INTELLIGENCE]: 60, [AttributeType.STRENGTH]: 30, [AttributeType.AGILITY]: 60, [AttributeType.CHIVALRY]: 30 }
  },
];