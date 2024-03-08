import { GamesTable } from '@/widgets/Table';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { IGame } from '@/shared/models/interfaces/games';
import { getTableApi } from '@/widgets/Table/api/tablesApi';
import { gamesListApi } from '@/widgets/Table/api/gamesListApi';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { gamesTableHeader } from '../constants/games';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { TableFilter } from '@/features/Table';

const GamesList = () => {
  const [data, setData] = useState<ITableResponseData<IGame> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getData = async (filterParams: IFilterParams) => {
    setData(await getTableApi<IGame>(gamesListApi(), filterParams));
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
    <ContentLayout title="Игры">
      <TableFilter<IGame> data={data?.data ?? null} />
      <GamesTable tableData={data} tableHeader={gamesTableHeader} />
    </ContentLayout>
  );
};

export default GamesList;
