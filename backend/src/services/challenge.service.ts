import { Challenge } from '../types';

// In-memory challenge store for the hackathon (easily translatable to MongoDB schema)
let challenges: Challenge[] = [
  {
    id: 'c1',
    title: 'Public Transit Pioneer',
    description: 'Use public transportation instead of driving for at least 3 days this week.',
    difficulty: 'medium',
    category: 'transportation',
    points: 50,
    completed: false
  },
  {
    id: 'c2',
    title: 'Lights Out',
    description: 'Ensure all unnecessary lights and standby appliances are turned off before bed for a week.',
    difficulty: 'easy',
    category: 'energy',
    points: 20,
    completed: false
  },
  {
    id: 'c3',
    title: 'Plant-Based Day',
    description: 'Eat entirely plant-based meals for one full day.',
    difficulty: 'easy',
    category: 'food',
    points: 30,
    completed: false
  },
  {
    id: 'c4',
    title: 'Zero Waste Weekend',
    description: 'Produce zero single-use plastic waste for an entire weekend.',
    difficulty: 'hard',
    category: 'waste',
    points: 100,
    completed: false
  }
];

export const getChallenges = async (): Promise<Challenge[]> => {
  return [...challenges];
};

export const completeChallenge = async (id: string): Promise<Challenge | null> => {
  const challengeIndex = challenges.findIndex(c => c.id === id);
  if (challengeIndex === -1) {
    return null;
  }

  challenges[challengeIndex].completed = true;
  return challenges[challengeIndex];
};
