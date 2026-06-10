import React from 'react';
import { ChatInterface } from '../components/assistant/ChatInterface';

export const AssistantPage: React.FC = () => {
  return (
    <div className="py-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Get personalized recommendations and ask questions about sustainability.
        </p>
      </div>
      
      <ChatInterface />
    </div>
  );
};
