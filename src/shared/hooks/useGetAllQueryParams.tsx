import { useSearchParams } from 'react-router-dom';
import { IFilterParams } from '../models/interfaces/filter';

export function useGetAllQueryParams() {
  const [searchParams] = useSearchParams();
  const getAllQuery = (order_column?: string): IFilterParams => {
    const queryParams = {
      length: searchParams.get('length') || '10',
      start: searchParams.get('start') || '0',
      order_column: searchParams.get('order_column') || order_column || '',
      order_direction: searchParams.get('order_direction') || 'asc',
      'filter_name[]': searchParams.getAll('filter_name[]') || [],
      'filter_value[]': searchParams.getAll('filter_value[]') || [],
    };
    return queryParams as unknown as IFilterParams;
  };

  return { getAllQuery };
}
