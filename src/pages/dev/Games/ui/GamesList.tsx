import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { IGame } from '@/shared/models/interfaces/games';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { gamesTableColumns } from '../constants';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { Table, getTableApi } from '@/features/Table';
import { DocumentExport } from '@/features/DocumentExport';
import { FilterButton } from '@/features/FilterModal';
import { format, fromUnixTime } from 'date-fns';
import { gamesFilterApi, gamesListApi } from '@/shared/api/dev/gamesApi';

const GamesList = () => {
  const [tableData, setTableData] = useState<ITableResponseData<IGame> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const tableColumns = gamesTableColumns;

  const getData = async (filterParams: IFilterParams) => {
    const data = await getTableApi<IGame>(gamesListApi(), filterParams);
    if (data?.data) {
      setTableData({
        ...data,
        data:
          data.data.map((item) => ({
            ...item,
            created_at: format(fromUnixTime(Number(item.created_at)), 'dd MMMM yyyy, HH:mm'),
          })) || [],
      });
    }
  };

  useEffect(() => {
    if (!Number(searchParams.get('length'))) {
      setSearchParams({
        length: 10,
        start: 0,
        order_direction: 'asc',
        order_column: tableColumns[0].value,
      } as unknown as URLSearchParamsInit);
    }
  }, []);

  useEffect(() => {
    if (Number(searchParams.get('length'))) {
      const filter = {
        length: Number(searchParams.get('length')) || 10,
        start: Number(searchParams.get('start')),
        order_direction: searchParams.get('order_direction') || 'asc',
        order_column: searchParams.get('order_column') || tableColumns[0].value,
      };
      void getData(filter);
    }
  }, [searchParams]);

  return (
    <ContentLayout title="Игры">
      <div className="flex justify-between mb-3">
        <div className="flex">
          <DocumentExport
            fileName="Games_Table"
            data={tableData?.data ?? []}
            headers={tableColumns.filter((item) => item.export)}
          />
        </div>

        <FilterButton url={gamesFilterApi()} />
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={tableData?.data || []}
        recordsTotal={tableData?.recordsTotal ?? 0}
      />
    </ContentLayout>
  );
};

export default GamesList;
