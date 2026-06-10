import React from 'react';
import { ChallengeList } from '../components/challenges/ChallengeList';

export const ChallengesPage: React.FC = () => {
  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sustainability Challenges</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Complete these practical challenges to reduce your carbon footprint and earn points.
        </p>
      </div>
      
      <ChallengeList />
    </div>
  );
};
