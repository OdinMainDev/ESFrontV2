import { useEffect, useState } from 'react';
import { ITableResponseData } from '../models/interface';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { casinosTableHeader } from '../constants/table';
import { TableHeader, TablePagination } from '@/features/Table';
import { getTableApi } from '../api/tablesApi';
import { casinoListApi } from '../api/casinoListApi';
import { ICasino } from '@/shared/models/interfaces/casinos';
import { Form } from 'react-bootstrap';
import { format } from 'date-fns/format';

const CasinoTable = () => {
  const [tableData, setTableData] = useState<ITableResponseData<ICasino> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const tableHeader = casinosTableHeader;

  const getData = async (filterParams: IFilterParams) => {
    setTableData(await getTableApi<ICasino>(casinoListApi(), filterParams));
  };

  useEffect(() => {
    if (!Number(searchParams.get('length'))) {
      setSearchParams({
        length: 10,
        start: 0,
        order_direction: 'asc',
        order_column: tableHeader[0].value,
      } as unknown as URLSearchParamsInit);
    }
  }, []);

  useEffect(() => {
    if (Number(searchParams.get('length'))) {
      const filter = {
        length: Number(searchParams.get('length')) || 10,
        start: Number(searchParams.get('start')),
        order_direction: searchParams.get('order_direction') || 'asc',
        order_column: searchParams.get('order_column') || tableHeader[0].value,
      };
      void getData(filter);
    }
  }, [searchParams]);

  return (
    <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
      <div>
        <div className="scrollbar ms-n1 ps-1">
          <table className="table">
            <TableHeader tableHeader={tableHeader} />
            <tbody>
              {tableData &&
                tableData.data.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4">
                      <span>{item.name}</span>
                    </td>
                    <td className="ps-4">
                      <div className="flex">
                        <Form.Check type="checkbox" checked={item.is_enabled} disabled />
                        <span>{item.is_enabled}</span>
                      </div>
                    </td>
                    <td className="ps-4">
                      <span>{item.token}</span>
                    </td>
                    <td className="ps-4">
                      <span>{format(item.created_at, 'dd MMMM yyyy, HH:mm')}</span>
                    </td>
                    <td>
                      <span>
                        <FontAwesomeIcon size="lg" className="cursor-pointer" icon={faEdit} />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <TablePagination recordsTotal={tableData?.recordsTotal ?? 0} />
      </div>
    </div>
  );
};

export default CasinoTable;
