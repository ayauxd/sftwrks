#!/usr/bin/env node
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyAltMw5iORgqNqNGz5lsjmZYGhYqOQH1k8';
const ai = new GoogleGenAI({ apiKey });

async function test() {
  console.log('Testing Gemini 2.5 Pro...');

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-pro',
      config: {
        systemInstruction: 'You are tiwa.ai, the assistant for Softworks Trading Company.',
      },
      history: []
    });

    const result = await chat.sendMessage({ message: 'What is Softworks? Reply in 2 sentences.' });
    console.log('\n✅ Response:', result.text);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
