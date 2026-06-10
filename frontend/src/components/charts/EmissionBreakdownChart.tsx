import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryResult } from '../../types';

interface ChartProps {
  data: {
    transportation: CategoryResult;
    energy: CategoryResult;
    food: CategoryResult;
    waste: CategoryResult;
  };
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export const EmissionBreakdownChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Transportation', value: data.transportation.emissionsKgCO2 },
    { name: 'Energy', value: data.energy.emissionsKgCO2 },
    { name: 'Food', value: data.food.emissionsKgCO2 },
    { name: 'Waste', value: data.waste.emissionsKgCO2 },
  ].filter(item => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value} kg CO₂`, 'Emissions']}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};
