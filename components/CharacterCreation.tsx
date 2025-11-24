import React, { useState, useEffect, useCallback } from 'react';
import { Attributes, AttributeType, Player, Language } from '../types';
import { Button } from './Button';
import { RefreshCw, ArrowRight, Lightbulb, Globe } from 'lucide-react';
import { UI_TEXT, ATTR_NAMES } from '../i18n';
import { ITEMS } from '../constants';

interface Props {
  onComplete: (player: Player) => void;
  lang: Language;
  theme: 'light' | 'dark';
  toggleLang: () => void;
  toggleTheme: () => void;
}

const TOTAL_CORRECTION_POINTS = 50;

export const CharacterCreation: React.FC<Props> = ({ onComplete, lang, theme, toggleLang, toggleTheme }) => {
  const [name, setName] = useState('');
  const [attributes, setAttributes] = useState<Attributes>({
    [AttributeType.INTELLIGENCE]: 0,
    [AttributeType.STRENGTH]: 0,
    [AttributeType.AGILITY]: 0,
    [AttributeType.CHIVALRY]: 0,
    [AttributeType.LIFESPAN]: 0,
    [AttributeType.LUCK]: 0,
  });
  const [correctionPoints, setCorrectionPoints] = useState(TOTAL_CORRECTION_POINTS);

  const rollStats = useCallback(() => {
    // Generate high variance stats, capped roughly so sum <= 550 to allow correction points
    // Max per stat 95 so user can use correction points to reach 100
    const roll = () => Math.floor(Math.random() * 85) + 10; 
    
    // Chivalry is usually 0-100, Lifespan 30-100
    setAttributes({
      [AttributeType.INTELLIGENCE]: roll(),
      [AttributeType.STRENGTH]: roll(),
      [AttributeType.AGILITY]: roll(),
      [AttributeType.CHIVALRY]: Math.floor(Math.random() * 100),
      [AttributeType.LIFESPAN]: Math.floor(Math.random() * 60) + 30,
      [AttributeType.LUCK]: Math.floor(Math.random() * 90) + 5,
    });
    setCorrectionPoints(TOTAL_CORRECTION_POINTS);
  }, []);

  useEffect(() => {
    rollStats();
  }, [rollStats]);

  const adjustStat = (attr: AttributeType, delta: number) => {
    const currentVal = attributes[attr];
    if (delta > 0 && correctionPoints <= 0) return;
    if (delta < 0 && currentVal <= 1) return;
    if (delta > 0 && currentVal >= 100) return;

    setAttributes(prev => ({ ...prev, [attr]: prev[attr] + delta }));
    setCorrectionPoints(prev => prev - delta);
  };

  const totalAttributes = Object.values(attributes).reduce((a, b) => a + b, 0);

  const handleStart = () => {
    if (!name.trim()) return;
    
    // Formula Calculation
    // HP = Strength * 2 + Lifespan
    const maxHp = attributes[AttributeType.STRENGTH] * 2 + attributes[AttributeType.LIFESPAN];
    // Stamina = Strength + Agility + 50
    const maxStamina = attributes[AttributeType.STRENGTH] + attributes[AttributeType.AGILITY] + 50;
    // Inner Breath (MP) = Intelligence * 2 + Strength
    const maxInnerBreath = attributes[AttributeType.INTELLIGENCE] * 2 + attributes[AttributeType.STRENGTH];

    const newPlayer: Player = {
      name,
      attributes,
      factionId: null,
      skills: ['basic_punch'],
      currentHp: maxHp,
      maxHp: maxHp,
      currentStamina: maxStamina,
      maxStamina: maxStamina,
      currentInnerBreath: maxInnerBreath,
      maxInnerBreath: maxInnerBreath,
      location: 'luoyang',
      inventory: [ITEMS['rations'], ITEMS['water_skin']],
      gold: 100
    };
    
    onComplete(newPlayer);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-bg p-4 font-mono transition-colors duration-300 relative">
       {/* Controls Top Right */}
       <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 border border-theme-border bg-theme-element hover:bg-theme-panel text-theme-muted hover:text-gold rounded transition-colors"
          >
            <Lightbulb size={18} />
          </button>
          <button 
            onClick={toggleLang}
            className="p-2 border border-theme-border bg-theme-element hover:bg-theme-panel text-theme-text rounded transition-colors flex items-center gap-1 text-sm font-bold"
          >
            <Globe size={18} /> {lang === 'en' ? 'EN' : '中'}
          </button>
       </div>

      <div className="max-w-2xl w-full border border-theme-border bg-theme-panel p-8 shadow-2xl relative transition-colors duration-300">
        <h1 className="text-3xl font-serif text-center text-theme-highlight mb-2">Ink & Blade</h1>
        <p className="text-center text-theme-muted mb-8 italic">
          {lang === 'en' ? '"In the chaotic world of Jianghu, fate is written in blood."' : '"江湖路远，命运多舛，皆由血书。"'}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-theme-muted mb-2 text-sm uppercase tracking-widest">{UI_TEXT.enterName[lang]}</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-theme-bg border border-theme-border text-theme-text p-3 focus:outline-none focus:border-gold placeholder-theme-muted/50 transition-colors duration-300"
              maxLength={20}
            />
          </div>

          <div className="border border-theme-border p-4 bg-theme-bg/50">
            <div className="flex justify-between items-center mb-4 border-b border-theme-border pb-2">
              <span className="text-theme-muted text-sm">{UI_TEXT.attributes[lang]}</span>
              <div className="flex gap-4 text-sm">
                 <div>
                    <span className="text-theme-muted">{UI_TEXT.totalAttributes[lang]}: </span>
                    <span className="text-theme-text font-bold">{totalAttributes}</span>
                 </div>
                <div>
                    <span className="text-theme-muted">{UI_TEXT.correctionPoints[lang]}: </span>
                    <span className={`font-bold ${correctionPoints > 0 ? 'text-gold' : 'text-theme-text'}`}>
                    {correctionPoints}
                    </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.values(AttributeType).map((attr) => (
                <div key={attr} className="flex items-center justify-between group">
                  <span className="text-theme-text">{ATTR_NAMES[attr][lang]}</span>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => adjustStat(attr, -1)}
                      className="w-6 h-6 flex items-center justify-center border border-theme-border text-theme-muted hover:text-theme-highlight bg-theme-element hover:bg-theme-panel"
                      disabled={attributes[attr] <= 1}
                    >-</button>
                    <span className={`w-8 text-center font-bold ${attributes[attr] >= 100 ? 'text-gold' : 'text-theme-highlight'}`}>
                      {attributes[attr]}
                    </span>
                    <button 
                      onClick={() => adjustStat(attr, 1)}
                      className="w-6 h-6 flex items-center justify-center border border-theme-border text-theme-muted hover:text-theme-highlight bg-theme-element hover:bg-theme-panel"
                      disabled={correctionPoints <= 0 || attributes[attr] >= 100}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Derived Stats Preview */}
            <div className="mt-4 pt-4 border-t border-theme-border grid grid-cols-3 gap-2 text-center text-xs text-theme-muted">
                 <div>
                    <div className="text-cinnabar font-bold">{UI_TEXT.hp[lang]}</div>
                    <div>{attributes[AttributeType.STRENGTH] * 2 + attributes[AttributeType.LIFESPAN]}</div>
                 </div>
                 <div>
                    <div className="text-yellow-600 font-bold">{UI_TEXT.stamina[lang]}</div>
                    <div>{attributes[AttributeType.STRENGTH] + attributes[AttributeType.AGILITY] + 50}</div>
                 </div>
                 <div>
                    <div className="text-blue-500 font-bold">{UI_TEXT.innerBreath[lang]}</div>
                    <div>{attributes[AttributeType.INTELLIGENCE] * 2 + attributes[AttributeType.STRENGTH]}</div>
                 </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button onClick={rollStats} variant="secondary" className="flex items-center gap-2">
              <RefreshCw size={16} /> {UI_TEXT.reroll[lang]}
            </Button>
            <Button 
              onClick={handleStart} 
              disabled={!name} 
              fullWidth 
              className="flex items-center justify-center gap-2"
            >
              {UI_TEXT.startJourney[lang]} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};