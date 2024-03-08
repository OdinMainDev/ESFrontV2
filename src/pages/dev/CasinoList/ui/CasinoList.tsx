import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { getTableApi } from '@/widgets/Table/api/tablesApi';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { ICasino } from '@/shared/models/interfaces/casinos';
import { casinosTableHeader } from '../constants';
import { casinoListApi } from '@/widgets/Table/api/casinoListApi';
import { CasinoTable } from '@/widgets/Table';
import { TableFilter } from '@/features/Table';

const CasinoList = () => {
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
    <ContentLayout title="Список казино">
      <TableFilter<ICasino> data={tableData?.data ?? null} />
      <CasinoTable tableData={tableData} tableHeader={tableHeader} />
    </ContentLayout>
  );
};

export default CasinoList;
