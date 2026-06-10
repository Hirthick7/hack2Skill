import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarbonStore } from '../../store/carbonStore';
import { useCarbon } from '../../hooks/useCarbon';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { DIET_LABELS, RECYCLING_LABELS } from '../../utils/emissions';

const steps = ['Transportation', 'Energy', 'Food', 'Waste'];

export const CalculatorForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { carbonInput, updateCategoryInput } = useCarbonStore();
  const { calculateAsync, isCalculating, error } = useCarbon();
  const navigate = useNavigate();

  const handleNext = () => setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((p) => Math.max(p - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      handleNext();
    } else {
      try {
        await calculateAsync(carbonInput);
        navigate('/calculator?view=results');
      } catch (err) {
        console.error('Calculation failed', err);
      }
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader 
        title="Carbon Footprint Calculator" 
        subtitle={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep]}`} 
      />

      {/* Progress Bar */}
      <div className="mb-8 bg-gray-200 dark:bg-dark-border rounded-full h-2.5">
        <div 
          className="bg-brand-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 0 && (
          <div className="animate-fade-in space-y-4">
            <Input
              label="Car travel distance (km per month)"
              type="number"
              min="0"
              value={carbonInput.transportation.carDistanceKm || ''}
              onChange={(e) => updateCategoryInput('transportation', { carDistanceKm: Number(e.target.value) })}
              required
            />
            <Input
              label="Public transport usage (km per month)"
              type="number"
              min="0"
              value={carbonInput.transportation.publicTransportKm || ''}
              onChange={(e) => updateCategoryInput('transportation', { publicTransportKm: Number(e.target.value) })}
              required
            />
            <Input
              label="Flight duration (hours per year)"
              type="number"
              min="0"
              value={carbonInput.transportation.flightHours || ''}
              onChange={(e) => updateCategoryInput('transportation', { flightHours: Number(e.target.value) })}
              required
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-fade-in space-y-4">
            <Input
              label="Electricity consumption (kWh per month)"
              type="number"
              min="0"
              value={carbonInput.energy.electricityKwh || ''}
              onChange={(e) => updateCategoryInput('energy', { electricityKwh: Number(e.target.value) })}
              required
            />
            <Input
              label="AC usage (hours per day)"
              type="number"
              min="0"
              max="24"
              value={carbonInput.energy.acUsageHours || ''}
              onChange={(e) => updateCategoryInput('energy', { acUsageHours: Number(e.target.value) })}
              required
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in space-y-4">
            <Select
              label="Diet Type"
              value={carbonInput.food.dietType}
              onChange={(e) => updateCategoryInput('food', { dietType: e.target.value as any })}
              options={Object.entries(DIET_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-fade-in space-y-4">
            <Input
              label="Waste generation (kg per week)"
              type="number"
              min="0"
              value={carbonInput.waste.wasteGenerationKg || ''}
              onChange={(e) => updateCategoryInput('waste', { wasteGenerationKg: Number(e.target.value) })}
              required
            />
            <Select
              label="Recycling Habit"
              value={carbonInput.waste.recyclingHabit}
              onChange={(e) => updateCategoryInput('waste', { recyclingHabit: e.target.value as any })}
              options={Object.entries(RECYCLING_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>
        )}

        {error && <div className="text-red-500 text-sm">Failed to calculate footprint. Please try again.</div>}

        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handlePrev} 
            disabled={currentStep === 0 || isCalculating}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isCalculating}
          >
            {currentStep === steps.length - 1 ? 'Calculate' : 'Next'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
