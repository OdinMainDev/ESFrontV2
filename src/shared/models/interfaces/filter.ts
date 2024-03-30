export interface IFilterParams {
  length: number;
  start: number;
  order_column: string;
  order_direction: string;
  'filter_name[]'?: string[];
  'filter_value[]'?: string[];
}
