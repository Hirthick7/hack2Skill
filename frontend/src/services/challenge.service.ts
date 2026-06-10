import api from './api';
import { Challenge } from '../types';

export const fetchChallenges = async (): Promise<Challenge[]> => {
  const response = await api.get('/challenges');
  return response.data.data;
};

export const markChallengeCompleted = async (id: string): Promise<Challenge> => {
  const response = await api.post(`/challenges/${id}/complete`);
  return response.data.data;
};
