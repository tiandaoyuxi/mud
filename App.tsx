import React, { useState } from 'react';
import { CharacterCreation } from './components/CharacterCreation';
import { GameLayout } from './components/GameLayout';
import { Player, Language } from './types';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [lang, setLang] = useState<Language>('zh'); // Default to Chinese for Wuxia flavor
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const hasApiKey = !!process.env.API_KEY;

  if (!hasApiKey) {
      return (
          <div className="h-screen w-screen bg-ink-900 text-stone-300 flex items-center justify-center p-4">
              <div className="max-w-md text-center border border-red-900 bg-red-900/10 p-8">
                  <h1 className="text-2xl font-serif text-cinnabar mb-4">Configuration Error</h1>
                  <p>Missing <code>API_KEY</code> environment variable.</p>
              </div>
          </div>
      )
  }

  return (
    <div className={`antialiased min-h-screen selection:bg-gold selection:text-ink-900 font-serif relative ${theme === 'light' ? 'theme-light' : ''}`}>
      <div className="bg-theme-bg text-theme-text min-h-screen transition-colors duration-300">
        {!player ? (
          <CharacterCreation 
            onComplete={setPlayer} 
            lang={lang} 
            theme={theme}
            toggleLang={toggleLang}
            toggleTheme={toggleTheme}
          />
        ) : (
          <GameLayout 
            player={player} 
            updatePlayer={setPlayer} 
            lang={lang}
            theme={theme}
            toggleLang={toggleLang}
            toggleTheme={toggleTheme}
          />
        )}
      </div>
    </div>
  );
};

export default App;