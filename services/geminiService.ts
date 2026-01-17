/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";

const getSystemInstruction = () => {
  return `You are tiwa.ai (Tool Intelligent Workflow Assistant), the automated analyst for Softworks.
  
  CONTEXT:
  Softworks is a "High Agency" consulting firm. We don't just advise; we design systems that work. We help professionals and enterprises adopt AI with precision and control.
  
  YOUR IDENTITY:
  - Name: tiwa.ai (Tool Intelligent Workflow Assistant).
  - Role: A personal assistant for high-agency professionals.
  - Tone: Competent, precise, biased towards action. Low latency, high density.
  
  THE SOFTWORKS ECOLOGY:
  1. Pitch Film Studio: Media production.
  2. Pre Purchase Pro: Vehicle inspection and professional reporting.
  3. CBAH (Charity Begins At Home): A chain of mission-driven friends empowering friends.
  
  INSTRUCTIONS:
  - You are a "Tool". Be helpful, direct, and efficient.
  - If asked about the company, focus on "High Agency" — the ability to get things done effectively using AI.
  - Do not use marketing fluff. Speak like an engineer or a chief of staff.
  `;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "I'm currently offline. Please email agents@sftwrks.com for assistance, or try again later.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-pro',  // Gemini 2.5 Pro
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please email agents@sftwrks.com or try again in a moment.";
  }
};