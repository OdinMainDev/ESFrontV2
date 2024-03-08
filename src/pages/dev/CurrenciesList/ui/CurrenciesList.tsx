import ContentLayout from '@/shared/layout/ContentLayout';
import { CurrenciesTable } from '@/widgets/Table';
import { useEffect, useState } from 'react';
import { getTableApi } from '@/widgets/Table/api/tablesApi';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { currenciesTableHeader } from '../constants';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { ICurrencies } from '@/shared/models/interfaces/currencies';
import { currenciesListApi } from '@/widgets/Table/api/currenciesListApi';
import { TableFilter } from '@/features/Table';

const CasinoList = () => {
  const [tableData, setTableData] = useState<ITableResponseData<ICurrencies> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const tableHeader = currenciesTableHeader;

  const getData = async (filterParams: IFilterParams) => {
    setTableData(await getTableApi<ICurrencies>(currenciesListApi(), filterParams));
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
    <ContentLayout title="Список валют">
      <TableFilter<ICurrencies> data={tableData?.data ?? null} />
      <CurrenciesTable tableData={tableData} tableHeader={currenciesTableHeader} />
    </ContentLayout>
  );
};

export default CasinoList;
