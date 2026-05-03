export const getAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3001/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('AI API Error:', error);
    return 'Sorry, I am having trouble connecting to the AI service. Please check your internet connection and try again.';
  }
};
