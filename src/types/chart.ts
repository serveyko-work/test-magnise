export interface IDataset {
  label: string,
  data: Array<string>,
  backgroundColor: Array<string>
}

export interface IChartData {
  labels?: Array<string>,
  datasets?: Array<IDataset>
}