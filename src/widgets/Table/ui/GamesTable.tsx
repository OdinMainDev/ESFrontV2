import { useEffect, useState } from 'react';
import { gamesListApi } from '../api/gamesListApi';
import { ITableResponseData } from '../models/interface';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

import { gamesTableHeader } from '../constants/table';
import { TableHeader, TablePagination } from '@/features/Table';
import { getTableApi } from '../api/tablesApi';
import { IGame } from '@/shared/models/interfaces/games';

const GamesTable = () => {
  const [tableData, setTableData] = useState<ITableResponseData<IGame> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getData = async (filterParams: IFilterParams) => {
    setTableData(await getTableApi<IGame>(gamesListApi(), filterParams));
  };

  useEffect(() => {
    if (!Number(searchParams.get('length'))) {
      setSearchParams({
        length: 10,
        start: 0,
        order_direction: 'asc',
        order_column: gamesTableHeader[0].value,
      } as unknown as URLSearchParamsInit);
    }
  }, []);

  useEffect(() => {
    if (Number(searchParams.get('length'))) {
      const filter = {
        length: Number(searchParams.get('length')) || 10,
        start: Number(searchParams.get('start')),
        order_direction: searchParams.get('order_direction') || 'asc',
        order_column: searchParams.get('order_column') || gamesTableHeader[0].value,
      };
      void getData(filter);
    }
  }, [searchParams]);

  return (
    <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
      <div>
        <div className="scrollbar ms-n1 ps-1">
          <table className="table">
            <TableHeader tableHeader={gamesTableHeader} />
            <tbody>
              {tableData &&
                tableData.data.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4">
                      <span>{item.id}</span>
                    </td>
                    <td className="ps-4">
                      <div className="flex">
                        <img src={item.image} className="h-[50px] mr-[10px]" />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="ps-4">
                      <span>{item.game_provider}</span>
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

export default GamesTable;
