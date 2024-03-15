export interface ITableResponseData<T> {
  recordsFiltered: number;
  recordsTotal: number;
  data: T[];
}

export interface ITableHeaders {
  label: string;
  value: string;
  sort: boolean;
}
