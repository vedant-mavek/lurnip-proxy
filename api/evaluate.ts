import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { instructions, content } = req.body;

  if (!instructions || !content) {
    return res.status(400).json({ error: 'Missing instructions or content' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Assignment Instructions: ${instructions}\n\nStudent Submission: ${content}`,
      config: {
        systemInstruction: "You are a professional academic evaluator. Provide constructive, encouraging, and rigorous feedback in exactly 2 sentences. Focus on the depth of the student's understanding and any critical omissions.",
        temperature: 0.7,
      },
    });
    res.status(200).json({ data: response.text || 'Excellent effort on this submission.' });
  } catch (error: any) {
    console.error('AI Evaluation Error:', error);
    res.status(200).json({ data: 'Submission received. AI evaluation currently unavailable, but your instructor will review it shortly.' });
  }
}