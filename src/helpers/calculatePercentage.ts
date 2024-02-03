export const calculatePercentage = (a: number, b: number): number => {
  const denominator = a + b;

  if (Math.abs(denominator) < Number.EPSILON) {
    return 0;
  }
  return +(100 * Math.abs((a - b) / denominator / 2)).toFixed(2);
};
