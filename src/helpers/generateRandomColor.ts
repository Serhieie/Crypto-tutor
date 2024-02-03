interface RandomColor {
  borderColor: string;
  backgroundColor: string;
}

export function generateRandomColor(): RandomColor {
  const getRandomValue = (): number => Math.floor(Math.random() * 256);

  const borderColor: string = `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
  const backgroundColor: string = `rgba(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()}, 0.5)`;

  return { borderColor, backgroundColor };
}
