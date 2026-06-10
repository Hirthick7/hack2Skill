import React from 'react';
import { useCarbonStore } from '../../store/carbonStore';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { formatCO2 } from '../../utils/formatters';
import { EmissionBreakdownChart } from '../charts/EmissionBreakdownChart';
import { ScoreGauge } from '../charts/ScoreGauge';

export const ResultsPanel: React.FC = () => {
  const { carbonResult } = useCarbonStore();
  const navigate = useNavigate();

  if (!carbonResult) {
    return (
      <Card className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">No results yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Complete the calculator to see your carbon footprint.</p>
        <Button onClick={() => navigate('/calculator')}>Start Calculator</Button>
      </Card>
    );
  }

  const { totalEmissionsKgCO2, overallScore, categories, highestEmissionCategory } = carbonResult;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Results</h2>
        <Button variant="secondary" onClick={() => navigate('/calculator')}>Recalculate</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center py-8">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Total Annual Emissions</h3>
          <p className="text-4xl font-bold text-brand-600 dark:text-brand-400">{formatCO2(totalEmissionsKgCO2)}</p>
          <p className="text-sm text-gray-500 mt-2">per year</p>
        </Card>

        <Card className="flex flex-col items-center justify-center py-8">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">Sustainability Score</h3>
          <ScoreGauge score={overallScore} />
        </Card>
      </div>

      <Card>
        <CardHeader title="Emissions Breakdown" />
        <div className="h-80 w-full">
          <EmissionBreakdownChart data={categories} />
        </div>
      </Card>

      <Card className="bg-brand-50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-900 dark:text-brand-100">AI Assistant Analysis</h3>
            <p className="text-brand-700 dark:text-brand-300 mt-1">
              Your highest emission category is <span className="font-bold capitalize">{highestEmissionCategory}</span>.
              Get personalized recommendations to reduce your footprint.
            </p>
          </div>
          <Button onClick={() => navigate('/assistant')} className="shrink-0">
            Ask AI Assistant
          </Button>
        </div>
      </Card>
    </div>
  );
};
