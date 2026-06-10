export const formatCO2 = (kg: number): string => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} tons CO₂`;
  }
  return `${Math.round(kg)} kg CO₂`;
};

export const formatScore = (score: number): string => {
  return `${Math.round(score)} / 100`;
};
