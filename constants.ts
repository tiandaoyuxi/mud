import { Faction, FactionType, LocationData, Skill, AttributeType, LocalizedString, Item, Job } from './types';
import { RAW_FACTIONS, ATTR_NAMES } from './i18n';

// --- Skill Generation System ---
export const SKILLS: Record<string, Skill> = {};

RAW_FACTIONS.forEach(f => {
  // Generate Standard Skills
  f.skills.en.forEach((nameEn, index) => {
    const nameZh = f.skills.zh[index] || nameEn;
    const id = `${f.id}_std_${index}`;
    SKILLS[id] = {
      id,
      name: { en: nameEn, zh: nameZh },
      description: { 
        en: `Standard martial art of the ${f.name.en}.`, 
        zh: `${f.name.zh}的入门武学。` 
      },
      type: index > 5 ? 'Internal' : 'External', // Rough heuristic
      damageModifier: 1.0 + (index * 0.1),
      tier: 'Standard'
    };
  });

  // Generate Special Skills
  f.special.en.forEach((nameEn, index) => {
    const nameZh = f.special.zh[index] || nameEn;
    const id = `${f.id}_spec_${index}`;
    SKILLS[id] = {
      id,
      name: { en: nameEn, zh: nameZh },
      description: { 
        en: `Secret ultimate technique of the ${f.name.en}.`, 
        zh: `${f.name.zh}的镇派绝学。` 
      },
      type: 'Special',
      damageModifier: 2.0 + (index * 0.2),
      tier: 'Special'
    };
  });
});

// Add a few generic ones for new players
SKILLS['basic_punch'] = {
  id: 'basic_punch',
  name: { en: 'Basic Fist', zh: '基础长拳' },
  description: { en: 'Fundamental martial arts.', zh: '江湖入门功夫。' },
  type: 'External',
  damageModifier: 1.0,
  tier: 'Standard'
};

// --- Item Definitions ---
export const ITEMS: Record<string, Item> = {
  'rations': {
    id: 'rations',
    name: { en: 'Dried Rations', zh: '干粮' },
    description: { en: 'Simple food for travel. Restores Stamina.', zh: '旅行必备的干粮。恢复体力。' },
    type: 'consumable',
    value: 5,
    effects: { staminaRestore: 30 }
  },
  'water_skin': {
    id: 'water_skin',
    name: { en: 'Water Skin', zh: '水袋' },
    description: { en: 'Filled with fresh water. Restores Stamina.', zh: '装满清水的皮囊。恢复体力。' },
    type: 'consumable',
    value: 5,
    effects: { staminaRestore: 15 }
  },
  'healing_salve': {
    id: 'healing_salve',
    name: { en: 'Golden Sore Salve', zh: '金创药' },
    description: { en: 'Famous medicine for wounds.', zh: '江湖闻名的疗伤圣药。' },
    type: 'consumable',
    value: 50,
    effects: { hpRestore: 100 }
  },
  'iron_sword': {
    id: 'iron_sword',
    name: { en: 'Iron Sword', zh: '铁剑' },
    description: { en: 'A common sword.', zh: '一把普通的铁剑。' },
    type: 'equipment',
    value: 100,
    effects: { attrBuff: { [AttributeType.STRENGTH]: 5 } }
  },
  'mystic_pill': {
    id: 'mystic_pill',
    name: { en: 'Small Return Pill', zh: '小还丹' },
    description: { en: 'Increases internal energy.', zh: '少林秘药，助长内力。' },
    type: 'consumable',
    value: 500,
    effects: { innerBreathRestore: 50, attrBuff: { [AttributeType.INTELLIGENCE]: 2 } }
  },
  'lucky_charm': {
    id: 'lucky_charm',
    name: { en: 'Jade Amulet', zh: '玉佩' },
    description: { en: 'Brings good fortune.', zh: '据说能带来好运。' },
    type: 'misc',
    value: 200
  }
};

// --- Job Definitions ---
export const JOBS: Job[] = [
  {
    id: 'porter',
    name: { en: 'Dock Porter', zh: '码头搬运工' },
    description: { en: 'Carry heavy cargo at the docks. Requires Strength.', zh: '在码头搬运沉重的货物。需要力量。' },
    reqAttribute: AttributeType.STRENGTH,
    reqValue: 20,
    staminaCost: 30,
    goldReward: 15,
    difficulty: 20
  },
  {
    id: 'waiter',
    name: { en: 'Teahouse Waiter', zh: '茶馆跑堂' },
    description: { en: 'Serve customers quickly. Requires Agility.', zh: '在茶馆招呼客人，手脚要快。需要敏捷。' },
    reqAttribute: AttributeType.AGILITY,
    reqValue: 20,
    staminaCost: 20,
    goldReward: 12,
    difficulty: 30
  },
  {
    id: 'scribe',
    name: { en: 'Street Scribe', zh: '代写书信' },
    description: { en: 'Write letters for the illiterate. Requires Intelligence.', zh: '为不识字的人代写书信。需要悟性。' },
    reqAttribute: AttributeType.INTELLIGENCE,
    reqValue: 40,
    staminaCost: 15,
    goldReward: 25,
    difficulty: 50
  },
  {
    id: 'blacksmith_assistant',
    name: { en: 'Smithy Assistant', zh: '铁匠帮工' },
    description: { en: 'Hammer iron at the forge. Hard labor.', zh: '在铁匠铺抡大锤。极耗体力。' },
    reqAttribute: AttributeType.STRENGTH,
    reqValue: 50,
    staminaCost: 50,
    goldReward: 40,
    difficulty: 60
  },
  {
    id: 'guard',
    name: { en: 'Caravan Guard', zh: '商队护卫' },
    description: { en: 'Protect merchants from thugs. Requires Strength & Agility.', zh: '保护商队免受地痞骚扰。' },
    reqAttribute: AttributeType.STRENGTH,
    reqValue: 60,
    staminaCost: 40,
    goldReward: 50,
    difficulty: 70
  }
];


// --- Faction Generation ---
export const FACTIONS: Faction[] = RAW_FACTIONS.map(f => ({
  id: f.id,
  name: f.name,
  type: f.type,
  description: { 
    en: `A well known ${f.type} faction.`, 
    zh: `江湖闻名的${f.type === FactionType.ORTHODOX ? '名门正派' : f.type === FactionType.EVIL ? '邪门歪道' : '中立帮派'}。` 
  },
  requirements: f.req,
  standardSkills: f.skills.en.map((_, i) => `${f.id}_std_${i}`),
  specialSkills: f.special.en.map((_, i) => `${f.id}_spec_${i}`),
  internalAffinity: {}, // Simplified for now
}));

// --- Locations & Events ---
export const LOCATIONS: Record<string, LocationData> = {
  'luoyang': {
    id: 'luoyang', name: { en: 'Luoyang City', zh: '洛阳城' },
    description: { en: 'A bustling ancient capital filled with merchants and warriors.', zh: '繁华的古都，商贾云集，侠客往来。' },
    type: 'City', connectedTo: ['shaolin_gate', 'forest', 'huashan'],
    weather: { en: 'Sunny', zh: '晴朗' },
    events: ['tournament', 'merchant', 'work']
  },
  'shaolin_gate': {
    id: 'shaolin_gate', name: { en: 'Shaolin Gate', zh: '少林山门' },
    description: { en: 'The majestic entrance to the supreme temple.', zh: '庄严的佛门圣地入口。' },
    type: 'Sect', connectedTo: ['luoyang', 'forest'],
    weather: { en: 'Cloudy', zh: '多云' },
    events: ['worship', 'sparring']
  },
  'forest': {
    id: 'forest', name: { en: 'Wild Forest', zh: '荒野密林' },
    description: { en: 'Dangerous woods where bandits lurk.', zh: '盗匪出没的危险丛林。' },
    type: 'Wild', connectedTo: ['luoyang', 'shaolin_gate', 'black_wind'],
    weather: { en: 'Foggy', zh: '大雾' },
    events: ['beast_attack', 'herb_gathering']
  },
  'black_wind': {
    id: 'black_wind', name: { en: 'Black Wind Fortress', zh: '黑风寨' },
    description: { en: 'A fortified bandit stronghold.', zh: '易守难攻的强盗窝点。' },
    type: 'Evil', connectedTo: ['forest'],
    weather: { en: 'Dark', zh: '阴森' },
    events: ['bandit_ambush']
  },
  'huashan': {
    id: 'huashan', name: { en: 'Mt. Huashan', zh: '华山' },
    description: { en: 'Precipitous cliffs and sharp peaks.', zh: '奇险天下第一山。' },
    type: 'Sect', connectedTo: ['luoyang'],
    weather: { en: 'Windy', zh: '狂风' },
    events: ['sword_trial']
  }
};