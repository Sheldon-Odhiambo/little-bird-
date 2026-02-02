
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly for initialization as per @google/genai coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLaundryAdvice = async (prompt: string, imagePart?: { data: string, mimeType: string }) => {
  try {
    const contents = imagePart 
      ? { parts: [{ text: prompt }, { inlineData: imagePart }] }
      : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: "You are Chirpy, a friendly AI laundry expert for 'Little Bird Laundry'. Provide concise, professional advice on stain removal, fabric care, and washing tips. Encourage users to use Little Bird Laundry's professional services for tough cases."
      }
    });

    // Access the .text property directly as it returns the generated string.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
