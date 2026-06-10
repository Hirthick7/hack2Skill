import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchChallenges, markChallengeCompleted } from '../services/challenge.service';

export const useChallenges = () => {
  const queryClient = useQueryClient();

  const { data: challenges = [], isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
  });

  const completeMutation = useMutation({
    mutationFn: markChallengeCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });

  return {
    challenges,
    isLoading,
    error,
    completeChallenge: completeMutation.mutate,
    isCompleting: completeMutation.isPending,
  };
};
