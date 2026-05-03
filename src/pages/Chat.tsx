import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getAIResponse } from '../services/ai';
import './Chat.css';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Hello! I am your AI Election Assistant powered by Google Gemini. How can I help you understand the voting process today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await getAIResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'Sorry, I encountered an error while trying to process your request.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1 className="text-center mb-4">AI Election Assistant</h1>
      <p className="text-center mb-8 subtitle">Ask questions about voting, registration, or candidates.</p>
      
      <Card className="chat-card">
        <div className="chat-messages" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`message message-${msg.role}`}>
              {msg.content}
            </div>
          ))}
          
          {isLoading && (
            <div className="message message-ai loading">
              Thinking 
              <div className="dot-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            disabled={isLoading}
            aria-label="Ask the AI assistant a question"
          />
          <Button 
            type="submit" 
            className="chat-submit-btn"
            disabled={isLoading || !inputValue.trim()}
          >
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Chat;
