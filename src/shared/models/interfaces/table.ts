export interface ITableResponseData<T> {
  recordsFiltered: number;
  recordsTotal: number;
  data: T[];
}
