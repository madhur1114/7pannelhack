
import { GoogleGenAI, Type } from "@google/genai";
import { WingoRecord, PredictionResult } from "../types";

// The API key is handled externally and injected into process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getWingoPrediction = async (history: WingoRecord[]): Promise<PredictionResult> => {
  const prompt = `Act as a world-class probability analyst for the WINGO lottery. 
  History Data: ${history.map(h => `[Issue:${h.issue}, Num:${h.number}, Size:${h.size}]`).join(', ')}.
  
  Predict the outcome of the NEXT issue. 
  Rules: Small (0-4), Big (5-9). Colors: Red (0,2,4,6,8), Green (1,3,5,7,9).
  
  Return a JSON object with:
  - nextIssue: String (incremental from history)
  - prediction: { size: "Big"|"Small", numbers: [two numbers], color: "Red"|"Green", confidence: percentage }
  - analysis: A high-level technical explanation of the "Quantum Pattern" found in the sequence.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          nextIssue: { type: Type.STRING },
          prediction: {
            type: Type.OBJECT,
            properties: {
              size: { type: Type.STRING, enum: ['Big', 'Small'] },
              numbers: { type: Type.ARRAY, items: { type: Type.NUMBER } },
              color: { type: Type.STRING, enum: ['Red', 'Green'] },
              confidence: { type: Type.NUMBER }
            },
            required: ['size', 'numbers', 'color', 'confidence']
          },
          analysis: { type: Type.STRING }
        },
        required: ['nextIssue', 'prediction', 'analysis']
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const chatWithAssistant = async (message: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
    config: {
      systemInstruction: 'You are the Quantum WINGO Fusion Assistant. You specialize in statistical lottery analysis, Martingale strategies, and pattern recognition. Provide high-level technical insights and always remind users to play responsibly.',
    }
  });
  return response.text;
};

export const analyzeGameScreen = async (base64Image: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: 'Analyze this WINGO game screenshot. Extract the current trend, last 5 results if visible, and provide an immediate strategic recommendation based on the visual flow.' }
      ]
    }
  });
  return response.text;
};
