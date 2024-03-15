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
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/hooks/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterButton } from '@/features/FilterModal';
import { currenciesFilterApi } from '../api/currenciesApi';
import { DocumentExport } from '@/features/DocumentExport';
import { fromUnixTime, format } from 'date-fns';

const CasinoList = () => {
  const [tableData, setTableData] = useState<ITableResponseData<ICurrencies> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const tableHeader = currenciesTableHeader;
  const router = useRouter();

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
        'filter_name[]': searchParams.getAll('filter_name[]') || [],
        'filter_value[]': searchParams.getAll('filter_value[]') || [],
      };
      void getData(filter);
    }
  }, [searchParams]);

  return (
    <ContentLayout title="Список валют">
      <div className="flex justify-between mb-3">
        <div className="flex">
          <Button
            variant="primary"
            className="mr-[10px]"
            startIcon={<FontAwesomeIcon icon={faPlus} className="me-2" />}
            onClick={() => router.push('currencies/add')}
          >
            Добавить валюту
          </Button>
          <DocumentExport
            fileName="Currencies_Table"
            data={
              tableData?.data.map((item) => ({
                ...item,
                created_at: format(fromUnixTime(item.created_at), 'dd MMMM yyyy, HH:mm'),
              })) ?? []
            }
            headers={currenciesTableHeader.slice(0, -1)}
          />
        </div>

        <FilterButton url={currenciesFilterApi()} />
      </div>
      <CurrenciesTable tableData={tableData} tableHeader={currenciesTableHeader} />
    </ContentLayout>
  );
};

export default CasinoList;
