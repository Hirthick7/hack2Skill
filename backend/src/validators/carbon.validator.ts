import { z } from 'zod';

export const calculateCarbonSchema = z.object({
  body: z.object({
    transportation: z.object({
      carDistanceKm: z.number().min(0, 'Car distance cannot be negative'),
      publicTransportKm: z.number().min(0, 'Public transport distance cannot be negative'),
      flightHours: z.number().min(0, 'Flight hours cannot be negative'),
    }),
    energy: z.object({
      electricityKwh: z.number().min(0, 'Electricity usage cannot be negative'),
      acUsageHours: z.number().min(0, 'AC usage cannot be negative').max(24, 'AC usage cannot exceed 24 hours per day'),
    }),
    food: z.object({
      dietType: z.enum(['vegan', 'vegetarian', 'pescatarian', 'mixed', 'meat-heavy']),
    }),
    waste: z.object({
      recyclingHabit: z.enum(['always', 'sometimes', 'rarely', 'never']),
      wasteGenerationKg: z.number().min(0, 'Waste generation cannot be negative'),
    }),
  }),
});
