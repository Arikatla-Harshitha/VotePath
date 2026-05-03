import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
// IMPORTANT: In a real production app, this call should happen on a backend server to hide your API key.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getAIResponse = async (message: string): Promise<string> => {
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return "Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.";
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: 'You are an Election Guide Assistant. Provide beginner-friendly, accurate, and politically neutral information about voting and elections.'
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Sorry, I am having trouble connecting to Google Gemini. Please check your internet connection or API key and try again.';
  }
};
