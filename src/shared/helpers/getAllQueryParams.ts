import { IFilterParams } from '../models/interfaces/filter';

export function getAllQueryParams(): IFilterParams {
  const params = new URLSearchParams(window.location.search);
  const queryParams: Partial<IFilterParams> = {};

  queryParams.length = parseInt(params.get('length') || '0', 10);
  queryParams.start = parseInt(params.get('start') || '0', 10);
  queryParams.order_column = params.get('order_column') || '';
  queryParams.order_direction = params.get('order_direction') || '';
  queryParams['filter_name[]'] = params.getAll('filter_name[]');
  queryParams['filter_value[]'] = params.getAll('filter_value[]');

  return queryParams as IFilterParams;
}
