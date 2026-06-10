import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '../services/ai.service';
import { useCarbonStore } from '../store/carbonStore';

export const useAI = () => {
  const { carbonResult, addChatMessage } = useCarbonStore();

  const chatMutation = useMutation({
    mutationFn: (message: string) => sendChatMessage(message, { carbonResult }),
    onSuccess: (reply) => {
      addChatMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toISOString()
      });
    },
  });

  const sendMessage = async (message: string) => {
    // Add user message to state immediately
    addChatMessage({
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });

    // Then trigger mutation
    await chatMutation.mutateAsync(message);
  };

  return {
    sendMessage,
    isSending: chatMutation.isPending,
    error: chatMutation.error,
  };
};
