export interface Dataset {
  label: string;
  data: (number | undefined)[] | undefined;
  backgroundColor: string[];
}

export interface ChartDataType {
  labels: (string | undefined)[] | undefined;
  datasets: Dataset[];
}
