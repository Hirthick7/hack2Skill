import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalculatorForm } from '../components/calculator/CalculatorForm';
import { ResultsPanel } from '../components/calculator/ResultsPanel';

export const CalculatorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');

  return (
    <div className="py-6">
      {view === 'results' ? <ResultsPanel /> : <CalculatorForm />}
    </div>
  );
};
