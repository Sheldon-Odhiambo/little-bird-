
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLaundryAdvice = async (prompt: string, imageData?: { data: string, mimeType: string }) => {
  try {
    const contents = imageData 
      ? { 
          parts: [
            { inlineData: imageData }, 
            { text: prompt }
          ] 
        } 
      : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `You are 'Chirpy', the AI mascot for Little Bird Laundry. 
        You provide friendly, expert advice on laundry care, stain removal, and fabric maintenance. 
        Keep your tone helpful, light, and encouraging. 
        If an image is provided, analyze the stain or fabric type and give specific care instructions.
        If asked about prices, refer the user to the 'Service Calculator' on the page. 
        Focus on answering stain removal questions or 'how to wash' specific items.`,
        temperature: 0.7,
      },
    });

    if (!response || !response.text) {
      throw new Error("Empty response from AI");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Specific error handling
    if (error.message?.includes("API_KEY")) {
      return "Chirpy's key seems to be missing! Please let the shop owner know so they can wake me up.";
    }
    if (error.message?.includes("fetch") || error.message?.includes("network")) {
      return "I'm having trouble connecting to the nest. Please check your internet connection and try chirping again!";
    }
    if (error.message?.includes("safety") || error.message?.includes("blocked")) {
      return "I can't fly there! That request seems a bit outside my laundry expertise. Try asking about a specific stain!";
    }
    
    return "Oops! My feathers are a bit ruffled right now. I'm having a small technical hiccup. Please try again or reach us via WhatsApp!";
  }
};
