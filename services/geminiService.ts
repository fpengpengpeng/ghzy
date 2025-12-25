import { GoogleGenAI } from "@google/genai";

// Lazy initialization of Gemini Client
// This prevents the app from crashing at startup if process.env.API_KEY is undefined
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key is missing. AI features will be disabled.");
      return null;
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const askGemini = async (question: string, context: string) => {
  try {
    const client = getAiClient();
    if (!client) {
      return "请在环境中配置 API_KEY 以使用 AI 导师功能。";
    }

    const modelId = 'gemini-3-flash-preview';
    
    let systemInstruction = `你是一位专业的生物学教授，擅长用通俗易懂但科学严谨的语言解释光合作用。
    你的回答应该侧重于植物生理学机制。
    请使用中文回答。
    当前的上下文是：${context}。
    如果用户问关于原初反应、光反应、暗反应、C3/C4/CAM的区别，请详细解释。`;

    if (context === 'comparison') {
        systemInstruction += " 特别注意对比生态适应性、解剖结构（如花环结构）和酶的区别（Rubisco vs PEPC）。";
    }

    const response = await client.models.generateContent({
      model: modelId,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "抱歉，我现在无法回答这个问题。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 助手遇到问题，请检查网络连接或 API Key 配额。";
  }
};