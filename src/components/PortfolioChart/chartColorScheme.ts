export interface Dataset {
  label: string;
  data: (number | undefined)[];
  backgroundColor: string[];
}

export interface ChartDataType {
  labels: (string | undefined)[];
  datasets: Dataset[];
}
