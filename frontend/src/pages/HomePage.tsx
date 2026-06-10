import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in px-4">
      <div className="relative mb-8 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-green-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <img 
          src="/src/assets/svg/carbon-leaf.svg" 
          alt="EcoTrack Leaf" 
          className="relative w-32 h-32 md:w-48 md:h-48 text-brand-600 dark:text-brand-400"
        />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
        Track Your Impact. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-green-600">
          Save the Planet.
        </span>
      </h1>
      
      <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
        EcoTrack AI helps you calculate, understand, and reduce your carbon footprint with personalized, AI-driven recommendations.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={() => navigate('/calculator')}>
          Calculate My Footprint
        </Button>
        <Button variant="secondary" size="lg" onClick={() => navigate('/assistant')}>
          Talk to AI Assistant
        </Button>
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-gray-500 dark:text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <img src="/src/assets/svg/transportation.svg" className="w-8 h-8 opacity-75" alt="" aria-hidden />
          <span className="text-sm font-medium">Transportation</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src="/src/assets/svg/renewable-energy.svg" className="w-8 h-8 opacity-75" alt="" aria-hidden />
          <span className="text-sm font-medium">Energy</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src="/src/assets/svg/food-impact.svg" className="w-8 h-8 opacity-75" alt="" aria-hidden />
          <span className="text-sm font-medium">Food</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src="/src/assets/svg/recycling.svg" className="w-8 h-8 opacity-75" alt="" aria-hidden />
          <span className="text-sm font-medium">Waste</span>
        </div>
      </div>
    </div>
  );
};
