EMISSION_FACTORS = {
    'car_km': 0.192,
    'public_transport_km': 0.041,
    'flight_hour': 250,
    'electricity_kwh': 0.85,
    'ac_hour': 1.5,
}

DIET_MULTIPLIERS = {
    'vegan': 1000,
    'vegetarian': 1500,
    'pescatarian': 1700,
    'mixed': 2500,
    'meat-heavy': 3300,
}

RECYCLING_MULTIPLIERS = {
    'always': 0.5,
    'sometimes': 0.75,
    'rarely': 0.9,
    'never': 1.0,
}

def calculate_carbon(input_data: dict) -> dict:
    transport_data = input_data.get('transportation', {})
    energy_data = input_data.get('energy', {})
    food_data = input_data.get('food', {})
    waste_data = input_data.get('waste', {})

    # 1. Calculate Transportation Emissions (Yearly)
    transport_emissions = (
        (transport_data.get('carDistanceKm', 0) * 12 * EMISSION_FACTORS['car_km']) +
        (transport_data.get('publicTransportKm', 0) * 12 * EMISSION_FACTORS['public_transport_km']) +
        (transport_data.get('flightHours', 0) * EMISSION_FACTORS['flight_hour'])
    )

    # 2. Calculate Energy Emissions (Yearly)
    energy_emissions = (
        (energy_data.get('electricityKwh', 0) * 12 * EMISSION_FACTORS['electricity_kwh']) +
        (energy_data.get('acUsageHours', 0) * 365 * EMISSION_FACTORS['ac_hour'])
    )

    # 3. Calculate Food Emissions (Yearly)
    diet_type = food_data.get('dietType', 'mixed')
    food_emissions = DIET_MULTIPLIERS.get(diet_type, DIET_MULTIPLIERS['mixed'])

    # 4. Calculate Waste Emissions (Yearly)
    waste_generation = waste_data.get('wasteGenerationKg', 0)
    recycling_habit = waste_data.get('recyclingHabit', 'never')
    base_waste_emissions = waste_generation * 52 * 0.5
    waste_emissions = base_waste_emissions * RECYCLING_MULTIPLIERS.get(recycling_habit, 1.0)

    total_emissions = transport_emissions + energy_emissions + food_emissions + waste_emissions

    def get_percentage(value):
        return (value / total_emissions) * 100 if total_emissions > 0 else 0

    max_transport = 10000
    max_energy = 8000
    max_food = 4000
    max_waste = 2000

    def calculate_score(emissions, max_val):
        score = 100 - ((emissions / max_val) * 100)
        return max(0, min(100, round(score)))

    transport_score = calculate_score(transport_emissions, max_transport)
    energy_score = calculate_score(energy_emissions, max_energy)
    food_score = calculate_score(food_emissions, max_food)
    waste_score = calculate_score(waste_emissions, max_waste)

    overall_score = round((transport_score * 0.35) + (energy_score * 0.35) + (food_score * 0.20) + (waste_score * 0.10))

    categories_map = {
        'transportation': transport_emissions,
        'energy': energy_emissions,
        'food': food_emissions,
        'waste': waste_emissions
    }

    highest_category = max(categories_map, key=categories_map.get)

    return {
        'totalEmissionsKgCO2': round(total_emissions),
        'overallScore': overall_score,
        'highestEmissionCategory': highest_category,
        'categories': {
            'transportation': {
                'emissionsKgCO2': round(transport_emissions),
                'percentage': round(get_percentage(transport_emissions)),
                'score': transport_score
            },
            'energy': {
                'emissionsKgCO2': round(energy_emissions),
                'percentage': round(get_percentage(energy_emissions)),
                'score': energy_score
            },
            'food': {
                'emissionsKgCO2': round(food_emissions),
                'percentage': round(get_percentage(food_emissions)),
                'score': food_score
            },
            'waste': {
                'emissionsKgCO2': round(waste_emissions),
                'percentage': round(get_percentage(waste_emissions)),
                'score': waste_score
            }
        }
    }
