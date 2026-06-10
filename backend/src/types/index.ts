export interface CarbonInput {
  transportation: {
    carDistanceKm: number; // monthly
    publicTransportKm: number; // monthly
    flightHours: number; // yearly
  };
  energy: {
    electricityKwh: number; // monthly
    acUsageHours: number; // daily
  };
  food: {
    dietType: 'vegan' | 'vegetarian' | 'pescatarian' | 'mixed' | 'meat-heavy';
  };
  waste: {
    recyclingHabit: 'always' | 'sometimes' | 'rarely' | 'never';
    wasteGenerationKg: number; // weekly
  };
}

export interface CategoryResult {
  emissionsKgCO2: number;
  percentage: number;
  score: number; // 0-100 for this category
}

export interface CarbonResult {
  totalEmissionsKgCO2: number;
  overallScore: number; // 0-100
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

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}
