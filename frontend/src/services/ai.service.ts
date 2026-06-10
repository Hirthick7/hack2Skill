import api from './api';
import { CarbonResult } from '../types';

export const sendChatMessage = async (message: string, context?: { carbonResult: CarbonResult | null }): Promise<string> => {
  const response = await api.post('/ai/chat', { message, context });
  return response.data.data.reply;
};
