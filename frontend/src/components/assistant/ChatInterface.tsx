import React, { useState, useRef, useEffect } from 'react';
import { useCarbonStore } from '../../store/carbonStore';
import { useAI } from '../../hooks/useAI';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Send, User, Bot, AlertCircle } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { chatHistory, carbonResult } = useCarbonStore();
  const { sendMessage, isSending, error } = useAI();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const message = input;
    setInput('');
    await sendMessage(message);
  };

  return (
    <Card className="flex flex-col h-[600px] max-h-[80vh] p-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-dark-border bg-brand-50 dark:bg-brand-900/10 rounded-t-xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-brand-900 dark:text-brand-100 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            EcoTrack AI Assistant
          </h2>
          <p className="text-sm text-brand-700 dark:text-brand-300">
            Ask me anything about sustainability or your footprint.
          </p>
        </div>
        {carbonResult && (
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium bg-white dark:bg-dark-card px-2 py-1 rounded-full border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Context Active
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-bg">
        {chatHistory.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 space-y-4">
            <Bot className="h-12 w-12 text-brand-300 dark:text-brand-700" />
            <p>Hi! I'm your EcoTrack AI Assistant.</p>
            {carbonResult ? (
              <p className="text-sm">I can see your highest emissions come from <strong>{carbonResult.highestEmissionCategory}</strong>.<br/>Ask me how to reduce them!</p>
            ) : (
              <p className="text-sm">Complete the calculator first to get personalized advice, or ask me general questions!</p>
            )}
          </div>
        )}

        {chatHistory.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
            )}
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-dark-card text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-dark-border rounded-tl-sm shadow-sm'
              }`}
            >
              {/* Very basic markdown formatting for bold and lists */}
              <div className="whitespace-pre-wrap text-sm leading-relaxed" 
                   dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\*/g, '<br/>•') }} 
              />
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}
        {isSending && (
          <div className="flex gap-3 justify-start animate-pulse">
             <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border rounded-b-xl">
        {error && (
          <div className="mb-3 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            Failed to connect to AI. Please try again.
          </div>
        )}
        <div className="flex gap-2">
          <Input
            label=""
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="mb-0 flex-1"
            disabled={isSending}
            aria-label="Chat input"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isSending}
            className="mt-1 flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
