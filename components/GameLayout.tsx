import React, { useState, useEffect, useRef } from 'react';
import { Player, GameLogEntry, Language, Item, Job } from '../types';
import { LOCATIONS, FACTIONS, SKILLS, JOBS } from '../constants';
import { generateSceneDescription, generateEventOutcome, generateItemDescription } from '../services/geminiService';
import { Button } from './Button';
import { MapPin, Heart, Sword, ArrowRight, Backpack, Coins, Activity, Zap, Flame, Globe, Lightbulb, Hammer } from 'lucide-react';
import { UI_TEXT, ATTR_NAMES } from '../i18n';

interface Props {
  player: Player;
  updatePlayer: (p: Player) => void;
  lang: Language;
  theme: 'light' | 'dark';
  toggleLang: () => void;
  toggleTheme: () => void;
}

export const GameLayout: React.FC<Props> = ({ player, updatePlayer, lang, theme, toggleLang, toggleTheme }) => {
  const [logs, setLogs] = useState<GameLogEntry[]>([]);
  const [currentLocationId, setCurrentLocationId] = useState<string>(player.location);
  const [sceneText, setSceneText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'actions' | 'work'>('actions');
  
  const logContainerRef = useRef<HTMLDivElement>(null);

  const currentLocation = LOCATIONS[currentLocationId] || LOCATIONS['luoyang'];
  const currentFaction = player.factionId ? FACTIONS.find(f => f.id === player.factionId) : undefined;
  const hasMerchant = currentLocation.events.includes('merchant');
  const canWork = currentLocation.events.includes('work');

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, sceneText]);

  // Initial Scene
  useEffect(() => {
    handleAction(lang === 'zh' ? '抵达' : 'Arrive', 0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocationId]);

  const addLog = (message: string, type: GameLogEntry['type'] = 'info') => {
    const entry: GameLogEntry = {
      id: Date.now().toString() + Math.random(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message,
      type
    };
    setLogs(prev => [...prev, entry]);
  };

  const handleAction = async (actionType: string, staminaCost: number = 0, isMovement = false) => {
    if (isGenerating) return;

    if (staminaCost > 0 && player.currentStamina < staminaCost) {
        addLog(UI_TEXT.notEnoughStamina[lang], 'error');
        return;
    }

    if (staminaCost > 0) {
        updatePlayer({ ...player, currentStamina: player.currentStamina - staminaCost });
    }

    if (isMovement) setSceneText('');
    
    setIsGenerating(true);
    
    if (isMovement) {
      addLog(`${UI_TEXT.movement[lang]}: ${currentLocation.name[lang]}`, 'system');
    } else {
      addLog(`${UI_TEXT.actions[lang]}: ${actionType}`, 'info');
      const outcome = await generateEventOutcome(actionType, player, lang);
      addLog(outcome, 'event');
    }

    const stream = await generateSceneDescription(
      player, 
      currentLocation, 
      currentFaction, 
      actionType,
      lang
    );

    if (stream) {
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk;
        setSceneText(prev => prev + chunk);
      }
    } else {
      setSceneText(lang === 'zh' ? "云深不知处 (连接错误)" : "The mind's eye is clouded (Connection Error).");
    }

    setIsGenerating(false);
  };

  const move = (targetId: string) => {
    if (player.currentStamina < 10) {
        addLog(UI_TEXT.notEnoughStamina[lang], 'error');
        return;
    }
    // Deduct stamina for move in updatePlayer via handleAction or directly
    // Here we update location first, then handle action deducts (or we deduct manually)
    const cost = 10;
    const newPlayer = { ...player, location: targetId, currentStamina: player.currentStamina - cost };
    updatePlayer(newPlayer);
    setCurrentLocationId(targetId);
    setViewMode('actions'); // Reset view on move
  };

  const rest = () => {
    const healAmount = Math.floor(player.maxHp * 0.2);
    const staminaAmount = Math.floor(player.maxStamina * 0.4);
    const innerAmount = Math.floor(player.maxInnerBreath * 0.1);

    updatePlayer({
      ...player,
      currentHp: Math.min(player.maxHp, player.currentHp + healAmount),
      currentStamina: Math.min(player.maxStamina, player.currentStamina + staminaAmount),
      currentInnerBreath: Math.min(player.maxInnerBreath, player.currentInnerBreath + innerAmount)
    });
    addLog(lang === 'zh' ? `打坐调息，气血+${healAmount}，体力+${staminaAmount}。` : `You meditate. HP+${healAmount}, Stamina+${staminaAmount}.`, 'info');
    // Generating scene for rest doesn't cost stamina
    handleAction(lang === 'zh' ? '打坐' : 'Meditate', 0);
  };

  const performJob = (job: Job) => {
      if (player.currentStamina < job.staminaCost) {
          addLog(UI_TEXT.notEnoughStamina[lang], 'error');
          return;
      }
      
      const attrVal = player.attributes[job.reqAttribute];
      // Simple success check: (Attribute / Req) * BaseChance
      // But let's make it simpler: Roll 0-100. If Roll < (Attr + 20), success.
      const roll = Math.random() * 100;
      const chance = attrVal + 20; // e.g. 30 str + 20 = 50% chance
      const isSuccess = roll < chance;

      let newPlayer = { ...player, currentStamina: player.currentStamina - job.staminaCost };
      
      if (isSuccess) {
          newPlayer.gold += job.goldReward;
          addLog(`${UI_TEXT.workSuccess[lang]}: ${job.name[lang]} (+${job.goldReward} Gold)`, 'gain');
      } else {
          addLog(`${UI_TEXT.workFail[lang]}: ${job.name[lang]}`, 'error');
      }
      updatePlayer(newPlayer);
  };

  // Inventory Logic
  const useItem = async (index: number) => {
    const item = player.inventory[index];
    if (!item) return;

    let newPlayer = { ...player };
    let used = false;

    if (item.type === 'consumable' && item.effects) {
       if (item.effects.hpRestore) {
         newPlayer.currentHp = Math.min(newPlayer.maxHp, newPlayer.currentHp + item.effects.hpRestore);
         used = true;
       }
       if (item.effects.staminaRestore) {
         newPlayer.currentStamina = Math.min(newPlayer.maxStamina, newPlayer.currentStamina + item.effects.staminaRestore);
         used = true;
       }
       if (item.effects.innerBreathRestore) {
         newPlayer.currentInnerBreath = Math.min(newPlayer.maxInnerBreath, newPlayer.currentInnerBreath + item.effects.innerBreathRestore);
         used = true;
       }
       if (item.effects.attrBuff) {
         for (const [key, val] of Object.entries(item.effects.attrBuff)) {
            // @ts-ignore
            newPlayer.attributes[key] += val;
         }
         used = true;
       }
    }

    if (used) {
       const newInv = [...player.inventory];
       newInv.splice(index, 1);
       newPlayer.inventory = newInv;
       updatePlayer(newPlayer);
       
       addLog(`${UI_TEXT.use[lang]}: ${item.name[lang]}`, 'item');
       const desc = await generateItemDescription(item, player, lang);
       if (desc) addLog(desc, 'narrative');
    }
  };

  const dropItem = (index: number) => {
    const item = player.inventory[index];
    const newInv = [...player.inventory];
    newInv.splice(index, 1);
    updatePlayer({ ...player, inventory: newInv });
    addLog(`${UI_TEXT.itemLost[lang]}: ${item.name[lang]}`, 'system');
  };

  const sellItem = (index: number) => {
    if (!hasMerchant) return;
    const item = player.inventory[index];
    const newInv = [...player.inventory];
    newInv.splice(index, 1);
    const goldEarned = Math.floor(item.value * 0.5); // Sell for 50% value
    updatePlayer({ 
        ...player, 
        inventory: newInv,
        gold: player.gold + goldEarned
    });
    addLog(`${UI_TEXT.sold[lang]} ${item.name[lang]} ${UI_TEXT.for[lang]} ${goldEarned} ${UI_TEXT.gold[lang]}`, 'system');
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-theme-bg text-theme-text font-mono overflow-hidden transition-colors duration-300">
      
      {/* Sidebar (Stats) */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-theme-border bg-theme-panel flex flex-col shrink-0 transition-colors duration-300">
        <div className="p-4 border-b border-theme-border">
            <h2 className="text-xl font-serif text-theme-highlight">{player.name}</h2>
            <div className="text-xs text-theme-muted uppercase tracking-widest mt-1">
                {currentFaction ? currentFaction.name[lang] : UI_TEXT.ronin[lang]}
            </div>
            <div className="mt-2 flex items-center gap-1 text-gold text-sm">
                <Coins size={14} /> {player.gold}
            </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
            {/* Bars */}
            <div className="space-y-3">
                {/* HP */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="flex items-center gap-1 text-cinnabar"><Heart size={12}/> {UI_TEXT.hp[lang]}</span>
                        <span>{player.currentHp}/{player.maxHp}</span>
                    </div>
                    <div className="w-full bg-theme-bg h-1.5 rounded-full overflow-hidden border border-theme-border">
                        <div className="bg-cinnabar h-full transition-all duration-500" style={{ width: `${(player.currentHp / player.maxHp) * 100}%` }}/>
                    </div>
                </div>
                {/* Stamina */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="flex items-center gap-1 text-yellow-600"><Zap size={12}/> {UI_TEXT.stamina[lang]}</span>
                        <span>{player.currentStamina}/{player.maxStamina}</span>
                    </div>
                    <div className="w-full bg-theme-bg h-1.5 rounded-full overflow-hidden border border-theme-border">
                        <div className="bg-yellow-600 h-full transition-all duration-500" style={{ width: `${(player.currentStamina / player.maxStamina) * 100}%` }}/>
                    </div>
                </div>
                {/* Inner Breath */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="flex items-center gap-1 text-blue-500"><Flame size={12}/> {UI_TEXT.innerBreath[lang]}</span>
                        <span>{player.currentInnerBreath}/{player.maxInnerBreath}</span>
                    </div>
                    <div className="w-full bg-theme-bg h-1.5 rounded-full overflow-hidden border border-theme-border">
                        <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(player.currentInnerBreath / player.maxInnerBreath) * 100}%` }}/>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-theme-border">
                <h3 className="text-xs uppercase text-theme-muted mb-2">{UI_TEXT.attributes[lang]}</h3>
                <div className="space-y-1 text-sm">
                    {Object.entries(player.attributes).map(([key, val]) => (
                        <div key={key} className="flex justify-between">
                            <span>{ATTR_NAMES[key][lang]}</span>
                            <span className={val >= 80 ? 'text-gold' : 'text-theme-text'}>{Math.floor(val)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-theme-border">
                <h3 className="text-xs uppercase text-theme-muted mb-2">{UI_TEXT.skills[lang]}</h3>
                <ul className="space-y-1 text-sm text-theme-muted">
                    {player.skills.map(sid => (
                        <li key={sid} className="flex items-center gap-2">
                             <Sword size={12} /> {SKILLS[sid]?.name[lang] || sid}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

      {/* Main Display */}
      <div className="flex-1 flex flex-col relative min-w-0">
        <div className="h-1/3 min-h-[200px] bg-theme-bg border-b border-theme-border p-6 flex flex-col relative overflow-hidden shrink-0 transition-colors duration-300">
            {/* Header Controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                 <button onClick={toggleTheme} className="p-1.5 border border-theme-border bg-theme-element hover:bg-theme-panel text-theme-muted hover:text-gold rounded transition-colors" title="Toggle Theme">
                   <Lightbulb size={16} />
                 </button>
                 <button onClick={toggleLang} className="flex items-center gap-1 px-2 py-1.5 border border-theme-border bg-theme-element hover:bg-theme-panel text-theme-text text-xs font-bold rounded transition-colors">
                   <Globe size={14} /> {lang === 'en' ? 'EN' : '中'}
                 </button>
            </div>

            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-theme-muted to-transparent"></div>
            <div className="z-10 w-full h-full flex flex-col justify-center items-center text-center">
                <div className="text-xs text-gold uppercase tracking-[0.2em] mb-2 flex items-center justify-center gap-2">
                    <MapPin size={12} /> {currentLocation.name[lang]} 
                    <span className="text-theme-muted">|</span> 
                    {currentLocation.weather[lang]}
                </div>
                <div className="font-serif text-lg md:text-xl leading-relaxed text-theme-highlight max-w-2xl">
                   {sceneText}
                   {isGenerating && <span className="typing-cursor ml-1"></span>}
                </div>
                <div className="mt-2 flex gap-2">
                    {hasMerchant && (
                        <span className="text-xs text-jade font-mono border border-jade/30 px-2 py-1 rounded bg-jade/5">
                            {UI_TEXT.merchantHere[lang]}
                        </span>
                    )}
                    {canWork && (
                        <span className="text-xs text-blue-400 font-mono border border-blue-400/30 px-2 py-1 rounded bg-blue-400/5">
                            {UI_TEXT.cityActivity[lang]}
                        </span>
                    )}
                </div>
            </div>
        </div>

        <div ref={logContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-theme-bg scroll-smooth custom-scrollbar transition-colors duration-300">
            {logs.length === 0 && <div className="text-center text-theme-muted mt-10">{UI_TEXT.logStart[lang]}</div>}
            {logs.map((log) => (
                <div key={log.id} className={`text-sm md:text-base border-l-2 pl-3 py-1 ${
                    log.type === 'combat' ? 'border-cinnabar text-theme-text' :
                    log.type === 'event' ? 'border-gold text-theme-highlight' :
                    log.type === 'item' ? 'border-jade text-theme-text' :
                    log.type === 'gain' ? 'border-gold text-gold' :
                    log.type === 'error' ? 'border-red-500 text-red-500' :
                    log.type === 'narrative' ? 'border-theme-muted text-theme-muted italic' :
                    log.type === 'system' ? 'border-theme-muted text-theme-muted italic text-xs' :
                    'border-theme-border text-theme-muted'
                }`}>
                    <span className="text-xs text-theme-muted mr-2 font-mono">[{log.timestamp}]</span>
                    {log.message}
                </div>
            ))}
        </div>
      </div>

      {/* Right Sidebar (Actions & Inventory) */}
      <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-theme-border bg-theme-panel flex flex-col shrink-0 transition-colors duration-300">
         
         {/* Actions Header */}
         <div className="p-3 bg-theme-bg/50 border-b border-theme-border flex justify-between items-center h-10">
            <h3 className="text-xs uppercase text-theme-muted font-bold">
                {viewMode === 'actions' ? UI_TEXT.actions[lang] : UI_TEXT.work[lang]}
            </h3>
            {viewMode === 'work' && (
                <button onClick={() => setViewMode('actions')} className="text-xs text-theme-muted hover:text-theme-highlight flex items-center gap-1">
                   {UI_TEXT.back[lang]}
                </button>
            )}
         </div>

         {/* Actions View */}
         {viewMode === 'actions' && (
             <div className="p-4 border-b border-theme-border">
                <div className="grid grid-cols-1 gap-2 mb-4">
                    {currentLocation.connectedTo.map(locId => {
                        const loc = LOCATIONS[locId];
                        if (!loc) return null;
                        return (
                            <Button 
                                key={locId} 
                                onClick={() => move(locId)}
                                disabled={isGenerating}
                                variant="secondary"
                                className="text-left flex justify-between items-center text-sm py-1.5"
                            >
                                <span>{loc.name[lang]}</span>
                                <span className="text-xs text-theme-muted">-10 SP</span>
                            </Button>
                        );
                    })}
                </div>

                <div className="space-y-2">
                    <Button fullWidth onClick={() => handleAction(lang === 'zh' ? '探索' : 'Explore', 15)} disabled={isGenerating}>
                        {UI_TEXT.explore[lang]} <span className="text-xs opacity-60 ml-1">-15 SP</span>
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                        <Button fullWidth onClick={() => handleAction(lang === 'zh' ? '练功' : 'Practice', 20)} disabled={isGenerating}>
                            {UI_TEXT.practice[lang]} <span className="text-xs opacity-60 ml-1">-20</span>
                        </Button>
                        <Button fullWidth onClick={rest} disabled={isGenerating} variant="ghost" className="border border-theme-border">
                            {UI_TEXT.meditate[lang]}
                        </Button>
                    </div>
                    {canWork && (
                        <Button fullWidth onClick={() => setViewMode('work')} variant="secondary" className="border-blue-500/30 text-blue-500 hover:text-blue-400">
                             <Hammer size={14} className="mr-2 inline"/> {UI_TEXT.work[lang]}
                        </Button>
                    )}
                </div>
             </div>
         )}

         {/* Work View */}
         {viewMode === 'work' && (
             <div className="p-4 border-b border-theme-border overflow-y-auto max-h-[300px] custom-scrollbar space-y-2">
                 {JOBS.map(job => (
                     <div key={job.id} className="border border-theme-border bg-theme-bg p-2 rounded hover:border-gold transition-colors">
                         <div className="flex justify-between items-start mb-1">
                             <div className="font-bold text-sm text-theme-highlight">{job.name[lang]}</div>
                             <div className="text-gold text-xs font-mono">+{job.goldReward}G</div>
                         </div>
                         <p className="text-xs text-theme-muted mb-2">{job.description[lang]}</p>
                         <div className="flex justify-between items-center text-xs text-theme-muted">
                             <span>Req: {ATTR_NAMES[job.reqAttribute][lang]} {job.reqValue}</span>
                             <button 
                                onClick={() => performJob(job)}
                                className="px-2 py-1 bg-theme-element border border-theme-border hover:bg-theme-panel hover:text-gold transition-colors rounded"
                             >
                                {UI_TEXT.work[lang]} (-{job.staminaCost} SP)
                             </button>
                         </div>
                     </div>
                 ))}
             </div>
         )}

         {/* Inventory Section */}
         <div className="flex-1 flex flex-col min-h-0">
             <div className="p-3 bg-theme-bg/50 border-b border-theme-border flex justify-between items-center">
                 <h3 className="text-xs uppercase text-theme-muted font-bold flex items-center gap-2">
                    <Backpack size={14} /> {UI_TEXT.inventory[lang]} ({player.inventory.length})
                 </h3>
             </div>
             
             <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                 {player.inventory.length === 0 ? (
                     <div className="text-center text-theme-muted text-sm py-4">{UI_TEXT.emptyInventory[lang]}</div>
                 ) : (
                     <div className="space-y-2">
                         {player.inventory.map((item, idx) => (
                             <div key={idx + item.id} className="bg-theme-bg border border-theme-border p-2 rounded">
                                 <div className="flex justify-between items-start mb-1">
                                     <span className="text-theme-text font-bold text-sm">{item.name[lang]}</span>
                                     <span className="text-theme-muted text-xs">{item.type}</span>
                                 </div>
                                 <p className="text-theme-muted text-xs mb-2">{item.description[lang]}</p>
                                 <div className="flex gap-1 justify-end">
                                     {item.type === 'consumable' && (
                                         <button 
                                            onClick={() => useItem(idx)}
                                            className="text-xs bg-theme-element hover:bg-theme-panel text-theme-text px-2 py-0.5 rounded border border-theme-border transition-colors"
                                         >
                                             {UI_TEXT.use[lang]}
                                         </button>
                                     )}
                                     {hasMerchant && (
                                         <button 
                                            onClick={() => sellItem(idx)}
                                            className="text-xs bg-theme-element hover:bg-gold hover:text-ink-900 text-gold px-2 py-0.5 rounded border border-theme-border transition-colors"
                                         >
                                             {UI_TEXT.sell[lang]}
                                         </button>
                                     )}
                                     <button 
                                        onClick={() => dropItem(idx)}
                                        className="text-xs bg-theme-element hover:bg-red-900 text-theme-muted hover:text-white px-2 py-0.5 rounded border border-theme-border transition-colors"
                                     >
                                         {UI_TEXT.drop[lang]}
                                     </button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 )}
             </div>
         </div>

      </div>
    </div>
  );
};