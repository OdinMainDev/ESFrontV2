import classNames from 'classnames';
import { ITableColumns } from '../models/table';
import { useEffect, useState } from 'react';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { useGetAllQueryParams } from '@/shared/hooks/useGetAllQueryParams';

interface IProps {
  tableColumns: ITableColumns[];
}
const TableHeader = ({ tableColumns }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAllQuery } = useGetAllQueryParams();
  const [filterParams, setFilterParams] = useState<IFilterParams>(getAllQuery());

  useEffect(() => {
    setFilterParams(getAllQuery());
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
        {tableColumns.map((item) => (
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
