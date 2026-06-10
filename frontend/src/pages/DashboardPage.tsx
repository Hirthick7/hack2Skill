import React from 'react';
import { useCarbonStore } from '../store/carbonStore';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { formatCO2 } from '../utils/formatters';

export const DashboardPage: React.FC = () => {
  const { carbonResult } = useCarbonStore();
  const navigate = useNavigate();

  if (!carbonResult) {
    return (
      <Card className="text-center py-12 max-w-2xl mx-auto mt-12">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">No data available</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Complete the calculator to populate your dashboard.</p>
        <Button onClick={() => navigate('/calculator')}>Start Calculator</Button>
      </Card>
    );
  }

  // Mock comparison data vs average user (usually would come from backend)
  const comparisonData = [
    {
      name: 'Transportation',
      You: carbonResult.categories.transportation.emissionsKgCO2,
      Average: 4600,
    },
    {
      name: 'Energy',
      You: carbonResult.categories.energy.emissionsKgCO2,
      Average: 3200,
    },
    {
      name: 'Food',
      You: carbonResult.categories.food.emissionsKgCO2,
      Average: 2500,
    },
    {
      name: 'Waste',
      You: carbonResult.categories.waste.emissionsKgCO2,
      Average: 650,
    },
  ];

  return (
    <div className="py-6 space-y-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Compare your emissions and track progress over time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-brand-600 text-white dark:bg-brand-800 border-none">
          <h3 className="text-brand-100 mb-2">Total Footprint</h3>
          <p className="text-4xl font-bold">{formatCO2(carbonResult.totalEmissionsKgCO2)}</p>
          <p className="text-sm text-brand-200 mt-2">per year</p>
        </Card>
        
        <Card>
          <h3 className="text-gray-500 dark:text-gray-400 mb-2">Sustainability Score</h3>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">{carbonResult.overallScore}/100</p>
          <p className="text-sm text-gray-500 mt-2">Top {(100 - carbonResult.overallScore + 10)}% of users</p>
        </Card>

        <Card>
          <h3 className="text-gray-500 dark:text-gray-400 mb-2">Challenges Completed</h3>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">0</p>
          <p className="text-sm text-brand-600 dark:text-brand-400 mt-2 cursor-pointer hover:underline" onClick={() => navigate('/challenges')}>View challenges &rarr;</p>
        </Card>
      </div>

      <Card>
        <CardHeader title="Comparison vs Average User" subtitle="Annual emissions in kg CO₂" />
        <div className="h-96 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <RechartsTooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="You" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Average" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
