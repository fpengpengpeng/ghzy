import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: The API key must be provided via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGemini = async (question: string, context: string) => {
  try {
    const modelId = 'gemini-3-flash-preview';
    
    let systemInstruction = `你是一位专业的生物学教授，擅长用通俗易懂但科学严谨的语言解释光合作用。
    你的回答应该侧重于植物生理学机制。
    请使用中文回答。
    当前的上下文是：${context}。
    如果用户问关于原初反应、光反应、暗反应、C3/C4/CAM的区别，请详细解释。`;

    if (context === 'comparison') {
        systemInstruction += " 特别注意对比生态适应性、解剖结构（如花环结构）和酶的区别（Rubisco vs PEPC）。";
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "抱歉，我现在无法回答这个问题。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 助手暂时离线，请检查您的 API Key 或网络连接。";
  }
};