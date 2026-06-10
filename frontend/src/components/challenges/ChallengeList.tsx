import React, { useState } from 'react';
import { useChallenges } from '../../hooks/useChallenges';
import { ChallengeCard } from './ChallengeCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const ChallengeList: React.FC = () => {
  const { challenges, isLoading, error, completeChallenge, isCompleting } = useChallenges();
  const [completingId, setCompletingId] = useState<string | null>(null);

  if (isLoading) {
    return <LoadingSpinner size="lg" className="my-12" />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Failed to load challenges.</div>;
  }

  const handleComplete = async (id: string) => {
    setCompletingId(id);
    try {
      await completeChallenge(id);
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {challenges.map(challenge => (
        <ChallengeCard 
          key={challenge.id} 
          challenge={challenge} 
          onComplete={handleComplete}
          isCompleting={isCompleting && completingId === challenge.id}
        />
      ))}
    </div>
  );
};
