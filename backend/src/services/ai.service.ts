import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { CarbonResult } from '../types';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are the EcoTrack AI Assistant, an expert in sustainability and carbon footprint reduction.
Your role is to help users understand their carbon footprint, answer their questions, and provide actionable, practical recommendations.

If context data is provided about the user's carbon footprint, use it to personalize your recommendations.
Specifically:
- Notice their highest emission category.
- Highlight specific areas where they can improve.
- Provide actionable, realistic steps (e.g., carpooling, LED lights, plant-based meals).
- Keep your tone encouraging, professional, and informative.
- DO NOT use emojis.
- Format your response in plain text with Markdown bullet points and bold text where appropriate.

If the user asks a question unrelated to sustainability, politely redirect them back to the topic.`;

export const generateAIResponse = async (message: string, context?: { carbonResult: CarbonResult }): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    let fullPrompt = SYSTEM_PROMPT + '\n\n';

    if (context && context.carbonResult) {
      const cr = context.carbonResult;
      fullPrompt += `USER CONTEXT:
Total Emissions: ${cr.totalEmissionsKgCO2} kg CO2/year
Overall Score: ${cr.overallScore}/100
Highest Category: ${cr.highestEmissionCategory.toUpperCase()}

Category Breakdown:
- Transport: ${cr.categories.transportation.emissionsKgCO2} kg (${cr.categories.transportation.percentage}%) - Score: ${cr.categories.transportation.score}
- Energy: ${cr.categories.energy.emissionsKgCO2} kg (${cr.categories.energy.percentage}%) - Score: ${cr.categories.energy.score}
- Food: ${cr.categories.food.emissionsKgCO2} kg (${cr.categories.food.percentage}%) - Score: ${cr.categories.food.score}
- Waste: ${cr.categories.waste.emissionsKgCO2} kg (${cr.categories.waste.percentage}%) - Score: ${cr.categories.waste.score}

Please refer to this context when answering the user's question, especially if they ask for advice on how to improve.
\n\n`;
    }

    fullPrompt += `USER MESSAGE: ${message}\n\nASSISTANT:`;

    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();
    
    return responseText;
  } catch (error: any) {
    logger.error('Gemini API Error:', { error: error.message });
    throw new Error('Failed to generate response from AI');
  }
};
