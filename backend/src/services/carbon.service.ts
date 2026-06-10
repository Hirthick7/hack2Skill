import { CarbonInput, CarbonResult } from '../types';

// Constants for emission factors (simplified for calculation purposes)
const EMISSION_FACTORS = {
  car_km: 0.192, // kg CO2 per km
  public_transport_km: 0.041, // kg CO2 per km
  flight_hour: 250, // kg CO2 per hour of flight
  electricity_kwh: 0.85, // kg CO2 per kWh (depends on grid, using average)
  ac_hour: 1.5, // kg CO2 per hour of AC
};

const DIET_MULTIPLIERS: Record<string, number> = {
  vegan: 1000, // kg CO2 per year
  vegetarian: 1500,
  pescatarian: 1700,
  mixed: 2500,
  'meat-heavy': 3300,
};

const RECYCLING_MULTIPLIERS: Record<string, number> = {
  always: 0.5, // 50% reduction
  sometimes: 0.75,
  rarely: 0.9,
  never: 1.0,
};

export const calculateCarbon = (input: CarbonInput): CarbonResult => {
  // 1. Calculate Transportation Emissions (Yearly)
  const transportEmissions = 
    (input.transportation.carDistanceKm * 12 * EMISSION_FACTORS.car_km) +
    (input.transportation.publicTransportKm * 12 * EMISSION_FACTORS.public_transport_km) +
    (input.transportation.flightHours * EMISSION_FACTORS.flight_hour);

  // 2. Calculate Energy Emissions (Yearly)
  const energyEmissions = 
    (input.energy.electricityKwh * 12 * EMISSION_FACTORS.electricity_kwh) +
    (input.energy.acUsageHours * 365 * EMISSION_FACTORS.ac_hour);

  // 3. Calculate Food Emissions (Yearly)
  const foodEmissions = DIET_MULTIPLIERS[input.food.dietType] || DIET_MULTIPLIERS.mixed;

  // 4. Calculate Waste Emissions (Yearly)
  // Base waste emission factor roughly 0.5 kg CO2 per kg of waste
  const baseWasteEmissions = input.waste.wasteGenerationKg * 52 * 0.5;
  const wasteEmissions = baseWasteEmissions * (RECYCLING_MULTIPLIERS[input.waste.recyclingHabit] || 1.0);

  const totalEmissionsKgCO2 = transportEmissions + energyEmissions + foodEmissions + wasteEmissions;

  // Determine percentages
  const getPercentage = (value: number) => totalEmissionsKgCO2 > 0 ? (value / totalEmissionsKgCO2) * 100 : 0;

  // Calculate scores (0-100, 100 is best)
  // Arbitrary baseline for max emissions per category to map to 0 score
  const maxTransport = 10000;
  const maxEnergy = 8000;
  const maxFood = 4000;
  const maxWaste = 2000;

  const calculateScore = (emissions: number, max: number) => {
    const score = 100 - ((emissions / max) * 100);
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const transportScore = calculateScore(transportEmissions, maxTransport);
  const energyScore = calculateScore(energyEmissions, maxEnergy);
  const foodScore = calculateScore(foodEmissions, maxFood);
  const wasteScore = calculateScore(wasteEmissions, maxWaste);

  const overallScore = Math.round((transportScore * 0.35) + (energyScore * 0.35) + (foodScore * 0.20) + (wasteScore * 0.10));

  // Determine highest emission category
  const categoriesMap = {
    transportation: transportEmissions,
    energy: energyEmissions,
    food: foodEmissions,
    waste: wasteEmissions
  };

  const highestEmissionCategory = Object.keys(categoriesMap).reduce((a, b) => 
    categoriesMap[a as keyof typeof categoriesMap] > categoriesMap[b as keyof typeof categoriesMap] ? a : b
  ) as 'transportation' | 'energy' | 'food' | 'waste';

  return {
    totalEmissionsKgCO2: Math.round(totalEmissionsKgCO2),
    overallScore,
    highestEmissionCategory,
    categories: {
      transportation: {
        emissionsKgCO2: Math.round(transportEmissions),
        percentage: Math.round(getPercentage(transportEmissions)),
        score: transportScore
      },
      energy: {
        emissionsKgCO2: Math.round(energyEmissions),
        percentage: Math.round(getPercentage(energyEmissions)),
        score: energyScore
      },
      food: {
        emissionsKgCO2: Math.round(foodEmissions),
        percentage: Math.round(getPercentage(foodEmissions)),
        score: foodScore
      },
      waste: {
        emissionsKgCO2: Math.round(wasteEmissions),
        percentage: Math.round(getPercentage(wasteEmissions)),
        score: wasteScore
      }
    }
  };
};
