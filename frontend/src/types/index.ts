export interface CarbonInput {
  transportation: {
    carDistanceKm: number;
    publicTransportKm: number;
    flightHours: number;
  };
  energy: {
    electricityKwh: number;
    acUsageHours: number;
  };
  food: {
    dietType: 'vegan' | 'vegetarian' | 'pescatarian' | 'mixed' | 'meat-heavy';
  };
  waste: {
    recyclingHabit: 'always' | 'sometimes' | 'rarely' | 'never';
    wasteGenerationKg: number;
  };
}

export interface CategoryResult {
  emissionsKgCO2: number;
  percentage: number;
  score: number;
}

export interface CarbonResult {
  totalEmissionsKgCO2: number;
  overallScore: number;
  categories: {
    transportation: CategoryResult;
    energy: CategoryResult;
    food: CategoryResult;
    waste: CategoryResult;
  };
  highestEmissionCategory: 'transportation' | 'energy' | 'food' | 'waste';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'transportation' | 'energy' | 'food' | 'waste' | 'general';
  points: number;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
