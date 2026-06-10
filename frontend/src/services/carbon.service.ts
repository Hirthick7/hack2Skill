import api from './api';
import { CarbonInput, CarbonResult } from '../types';

export const calculateCarbonFootprint = async (data: CarbonInput): Promise<CarbonResult> => {
  const response = await api.post('/carbon/calculate', data);
  return response.data.data;
};
