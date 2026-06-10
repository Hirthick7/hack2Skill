import google.generativeai as genai
import logging
from config.env import env

logger = logging.getLogger(__name__)

genai.configure(api_key=env.GEMINI_API_KEY)

SYSTEM_PROMPT = """You are the EcoTrack AI Assistant, an expert in sustainability and carbon footprint reduction.
Your role is to help users understand their carbon footprint, answer their questions, and provide actionable, practical recommendations.

If context data is provided about the user's carbon footprint, use it to personalize your recommendations.
Specifically:
- Notice their highest emission category.
- Highlight specific areas where they can improve.
- Provide actionable, realistic steps (e.g., carpooling, LED lights, plant-based meals).
- Keep your tone encouraging, professional, and informative.
- DO NOT use emojis.
- Format your response in plain text with Markdown bullet points and bold text where appropriate.

If the user asks a question unrelated to sustainability, politely redirect them back to the topic."""

def generate_ai_response(message: str, context: dict = None) -> str:
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        full_prompt = SYSTEM_PROMPT + '\n\n'
        
        if context and context.get('carbonResult'):
            cr = context['carbonResult']
            full_prompt += f"""USER CONTEXT:
Total Emissions: {cr.get('totalEmissionsKgCO2')} kg CO2/year
Overall Score: {cr.get('overallScore')}/100
Highest Category: {str(cr.get('highestEmissionCategory', '')).upper()}

Category Breakdown:
- Transport: {cr.get('categories', {}).get('transportation', {}).get('emissionsKgCO2')} kg ({cr.get('categories', {}).get('transportation', {}).get('percentage')}%) - Score: {cr.get('categories', {}).get('transportation', {}).get('score')}
- Energy: {cr.get('categories', {}).get('energy', {}).get('emissionsKgCO2')} kg ({cr.get('categories', {}).get('energy', {}).get('percentage')}%) - Score: {cr.get('categories', {}).get('energy', {}).get('score')}
- Food: {cr.get('categories', {}).get('food', {}).get('emissionsKgCO2')} kg ({cr.get('categories', {}).get('food', {}).get('percentage')}%) - Score: {cr.get('categories', {}).get('food', {}).get('score')}
- Waste: {cr.get('categories', {}).get('waste', {}).get('emissionsKgCO2')} kg ({cr.get('categories', {}).get('waste', {}).get('percentage')}%) - Score: {cr.get('categories', {}).get('waste', {}).get('score')}

Please refer to this context when answering the user's question, especially if they ask for advice on how to improve.
\n\n"""

        full_prompt += f"USER MESSAGE: {message}\n\nASSISTANT:"
        
        response = model.generate_content(full_prompt)
        return response.text
    except Exception as e:
        logger.error(f"Gemini API Error: {str(e)}")
        raise Exception("Failed to generate response from AI")
