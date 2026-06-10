import { calculateCarbon } from '../src/services/carbon.service';
import { CarbonInput } from '../src/types';

describe('Carbon Service Engine', () => {
  const mockInput: CarbonInput = {
    transportation: { carDistanceKm: 100, publicTransportKm: 50, flightHours: 0 },
    energy: { electricityKwh: 200, acUsageHours: 2 },
    food: { dietType: 'vegetarian' },
    waste: { recyclingHabit: 'always', wasteGenerationKg: 5 }
  };

  it('calculates total emissions correctly', () => {
    const result = calculateCarbon(mockInput);
    
    expect(result.totalEmissionsKgCO2).toBeGreaterThan(0);
    expect(result.overallScore).toBeGreaterThanOrEqual(0);
    expect(result.overallScore).toBeLessThanOrEqual(100);
    
    // Check categories exist
    expect(result.categories.transportation).toBeDefined();
    expect(result.categories.energy).toBeDefined();
    expect(result.categories.food).toBeDefined();
    expect(result.categories.waste).toBeDefined();
  });

  it('meat-heavy diet produces more emissions than vegan', () => {
    const veganInput = { ...mockInput, food: { dietType: 'vegan' as const } };
    const meatInput = { ...mockInput, food: { dietType: 'meat-heavy' as const } };
    
    const veganResult = calculateCarbon(veganInput);
    const meatResult = calculateCarbon(meatInput);

    expect(meatResult.categories.food.emissionsKgCO2).toBeGreaterThan(veganResult.categories.food.emissionsKgCO2);
  });
  
  it('recycling always produces less waste emissions than never', () => {
    const alwaysRecycle = { ...mockInput, waste: { wasteGenerationKg: 10, recyclingHabit: 'always' as const } };
    const neverRecycle = { ...mockInput, waste: { wasteGenerationKg: 10, recyclingHabit: 'never' as const } };
    
    const alwaysResult = calculateCarbon(alwaysRecycle);
    const neverResult = calculateCarbon(neverRecycle);

    expect(alwaysResult.categories.waste.emissionsKgCO2).toBeLessThan(neverResult.categories.waste.emissionsKgCO2);
  });
});
