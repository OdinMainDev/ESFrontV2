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
import { useTranslation } from 'react-i18next';
import { useGetAllQueryParams } from '@/shared/hooks/useGetAllQueryParams';
const GamesList = () => {
  const [tableData, setTableData] = useState<ITableResponseData<IGame> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAllQuery } = useGetAllQueryParams();
  const tableColumns = gamesTableColumns;
  const { t } = useTranslation();

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
    const filter = getAllQuery(tableColumns[0].value);
    if (Number(searchParams.get('length'))) {
      void getData(filter);
    } else {
      setSearchParams(filter as unknown as URLSearchParamsInit);
    }
  }, [searchParams]);

  return (
    <ContentLayout title={t('games')}>
      <div className="flex items-center	justify-between mb-3">
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
        recordsTotal={tableData?.recordsFiltered ?? 0}
      />
    </ContentLayout>
  );
};

export default GamesList;
