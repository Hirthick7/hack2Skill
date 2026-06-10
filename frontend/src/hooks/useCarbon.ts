import { useMutation } from '@tanstack/react-query';
import { calculateCarbonFootprint } from '../services/carbon.service';
import { useCarbonStore } from '../store/carbonStore';
import { CarbonInput } from '../types';

export const useCarbon = () => {
  const setCarbonResult = useCarbonStore((state) => state.setCarbonResult);

  const calculateMutation = useMutation({
    mutationFn: (input: CarbonInput) => calculateCarbonFootprint(input),
    onSuccess: (data) => {
      setCarbonResult(data);
    },
  });

  return {
    calculate: calculateMutation.mutate,
    calculateAsync: calculateMutation.mutateAsync,
    isCalculating: calculateMutation.isPending,
    error: calculateMutation.error,
  };
};
