import classNames from 'classnames';
import { ITableHeader } from '../models/table';
import { useEffect, useState } from 'react';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

interface IProps {
  tableHeader: ITableHeader[];
}
const TableHeader = ({ tableHeader }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    length: Number(searchParams.get('length')) || 10,
    start: Number(searchParams.get('start')),
    order_direction: searchParams.get('order_direction') ?? '',
    order_column: searchParams.get('order_column') ?? '',
  });

  useEffect(() => {
    setFilterParams({
      length: Number(searchParams.get('length')) || 10,
      start: Number(searchParams.get('start')),
      order_direction: searchParams.get('order_direction') ?? '',
      order_column: searchParams.get('order_column') ?? '',
    });
  }, [searchParams]);

  const toggleFilter = (order_column: string) => {
    if (order_column === filterParams.order_column) {
      let filter = filterParams;
      if (filterParams.order_direction === 'asc') {
        filter = {
          ...filter,
          order_direction: 'desc',
        };
      }

      if (filterParams.order_direction === 'desc') {
        filter = {
          ...filter,
          order_direction: 'asc',
        };
      }
      setSearchParams(filter as unknown as URLSearchParamsInit);
    } else {
      const filter = { ...filterParams, order_column, order_direction: 'asc' };
      setSearchParams(filter as unknown as URLSearchParamsInit);
    }
  };

  return (
    <thead>
      <tr>
        {tableHeader.map((item) => (
          <th
            onClick={() => item.sort && toggleFilter(item.value)}
            key={item.value}
            className={classNames('ps-4', {
              ['sort']: item.sort,
              [filterParams.order_direction]: item.value === filterParams.order_column,
            })}
          >
            {item.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
