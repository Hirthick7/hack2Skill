import React from 'react';
import { Challenge } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CheckCircle, Circle } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  onComplete: (id: string) => void;
  isCompleting: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onComplete, isCompleting }) => {
  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger',
  } as const;

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 ${challenge.completed ? 'opacity-75 bg-gray-50 dark:bg-dark-bg' : 'hover:shadow-md hover:-translate-y-1'}`}>
      {challenge.completed && (
        <div className="absolute top-0 right-0 p-4">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
      )}
      
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            <Badge variant={difficultyColors[challenge.difficulty]} className="capitalize">
              {challenge.difficulty}
            </Badge>
            <Badge variant="primary" className="capitalize">
              {challenge.category}
            </Badge>
            <Badge variant="neutral">
              {challenge.points} pts
            </Badge>
          </div>
          <h3 className={`text-lg font-bold mb-2 ${challenge.completed ? 'text-gray-500 line-through dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
            {challenge.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {challenge.description}
          </p>
        </div>
        
        <div className="mt-auto pt-4">
          <Button 
            variant={challenge.completed ? 'secondary' : 'primary'}
            className="w-full"
            disabled={challenge.completed || isCompleting}
            onClick={() => onComplete(challenge.id)}
            isLoading={isCompleting}
          >
            {challenge.completed ? 'Completed' : 'Mark Complete'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
