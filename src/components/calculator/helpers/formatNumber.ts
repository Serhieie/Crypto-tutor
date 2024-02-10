export function formatNumber(compitation: number): string {
  const numStr: string = compitation.toString();

  if (numStr.includes(".")) {
    const [integerPart, decimalPart]: string[] = numStr.split(".");
    if (decimalPart.length > 6) {
      return parseFloat(compitation.toFixed(6)).toString();
    } else {
      return numStr;
    }
  } else {
    if (numStr.length > 8) {
      return parseFloat(compitation.toFixed(8)).toString();
    } else {
      return numStr;
    }
  }
}
