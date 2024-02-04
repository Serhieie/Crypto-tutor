export const calculateProfitPercentage = (
  initialInvestment: number,
  currentInvestment: number
): number => {
  const profit = currentInvestment - initialInvestment;

  if (initialInvestment === 0) {
    return 0;
  }

  return +(100 * (profit / initialInvestment)).toFixed(2);
};
