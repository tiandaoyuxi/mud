import { GoogleGenAI } from "@google/genai";
import { Player, LocationData, Faction, Language, Item } from '../types';

let genAI: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!genAI) {
    if (!process.env.API_KEY) {
      console.error("API Key is missing!");
      return null;
    }
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const generateSceneDescription = async (
  player: Player,
  location: LocationData,
  faction: Faction | undefined,
  action: string,
  lang: Language
): Promise<AsyncIterable<string> | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  const prompt = `
    You are the narrator of a Wuxia MUD game.
    Language: ${lang === 'zh' ? 'Chinese (Simplified)' : 'English'}.
    
    Context:
    - Location: ${lang === 'zh' ? location.name.zh : location.name.en} (${lang === 'zh' ? location.description.zh : location.description.en})
    - Weather: ${lang === 'zh' ? location.weather.zh : location.weather.en}
    - Player: ${player.name} (${faction ? (lang === 'zh' ? faction.name.zh : faction.name.en) : 'Ronin'})
    - Action: ${action}
    - Stats: STR ${player.attributes.Strength}, LUCK ${player.attributes.Luck}.

    Task:
    Create an immersive, atmospheric scene description (max 60 words).
    Style: Jin Yong novel style.
    ${lang === 'zh' ? 'Output purely in Chinese.' : 'Output in English.'}
    Do NOT include prefixes like "Scene:".
  `;

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    async function* textIterator() {
      for await (const chunk of response) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    }

    return textIterator();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const generateEventOutcome = async (
  eventType: string,
  player: Player,
  lang: Language
): Promise<string> => {
  const ai = getAiClient();
  const errMsg = lang === 'zh' ? "天机不可泄露 (API Error)" : "The spirits are silent (API Error).";
  if (!ai) return errMsg;

  const prompt = `
    Game: Wuxia MUD.
    Action: ${eventType}.
    Language: ${lang === 'zh' ? 'Chinese' : 'English'}.
    Player Stats: Int ${player.attributes.Intelligence}, Str ${player.attributes.Strength}, Luck ${player.attributes.Luck}.
    
    Determine a 1-sentence outcome. Success depends on stats.
    If Luck > 80, something good happens.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || (lang === 'zh' ? "无事发生。" : "Nothing happens.");
  } catch (e) {
    return errMsg;
  }
};

export const generateItemDescription = async (
    item: Item,
    player: Player,
    lang: Language
): Promise<string> => {
    const ai = getAiClient();
    if (!ai) return "";

    const prompt = `
      Game: Wuxia MUD.
      Action: Player consumes/uses ${lang === 'zh' ? item.name.zh : item.name.en}.
      Language: ${lang === 'zh' ? 'Chinese' : 'English'}.
      Describe the sensation, taste, or immediate effect in 1 sentence. Jin Yong style.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "";
    } catch (e) {
        return "";
    }
}