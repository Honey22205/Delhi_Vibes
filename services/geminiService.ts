
import { GoogleGenAI, Type } from "@google/genai";
import { RoastResponse } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export const generateSavageRoast = async (
  input: string,
  isSavage: boolean
): Promise<RoastResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const modeInstruction = isSavage 
    ? "SAVAGE MODE IS ON: Be brutal, rude, and merciless. Burn them."
    : "SAVAGE MODE IS OFF: Be posh, politely sarcastic, and passive-aggressive.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Drama details: "${input}". ${modeInstruction}`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          poem: { type: Type.STRING, description: "A 4-line Hinglish roasted poem." },
          momMode: { type: Type.STRING, description: "A Desi Mom scolding translation." },
          judgment: { type: Type.STRING, description: "A short status like 'Major Ick'." }
        },
        required: ["poem", "momMode", "judgment"]
      }
    }
  });

  return JSON.parse(response.text) as RoastResponse;
};
