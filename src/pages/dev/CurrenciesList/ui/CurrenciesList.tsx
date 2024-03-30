import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { currenciesTableColumns } from '../constants';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { ICurrencies } from '@/shared/models/interfaces/currencies';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/hooks/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterButton } from '@/features/FilterModal';
import { currenciesFilterApi } from '../api/currenciesApi';
import { DocumentExport } from '@/features/DocumentExport';
import { fromUnixTime, format } from 'date-fns';
import { Table, getTableApi } from '@/features/Table';
import { currenciesListApi } from '@/shared/api/dev/currencyApi';
import { useTranslation } from 'react-i18next';
import { getAllQueryParams } from '@/shared/helpers/getAllQueryParams';

const CasinoList = () => {
  const [tableData, setTableData] = useState<ITableResponseData<ICurrencies> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const tableColumns = currenciesTableColumns;
  const router = useRouter();
  const { t } = useTranslation();

  const getData = async (filterParams: IFilterParams) => {
    const data = await getTableApi<ICurrencies>(currenciesListApi(), filterParams);
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
    if (Number(searchParams.get('length'))) {
      const filter = getAllQueryParams();
      void getData(filter);
    } else {
      setSearchParams({
        length: 10,
        start: 0,
        order_direction: 'asc',
        order_column: tableColumns[0].value,
      } as unknown as URLSearchParamsInit);
    }
  }, [searchParams]);

  return (
    <ContentLayout title={t('currencies')}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          <Button
            variant="primary"
            size="sm"
            className="mr-[10px]"
            startIcon={<FontAwesomeIcon icon={faPlus} className="me-2" />}
            onClick={() => router.push('currencies/add')}
          >
            Добавить валюту
          </Button>
          <DocumentExport
            fileName="Currencies_Table"
            data={tableData?.data ?? []}
            headers={tableColumns.filter((item) => item.export)}
          />
        </div>

        <FilterButton url={currenciesFilterApi()} />
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={tableData?.data || []}
        recordsTotal={tableData?.recordsFiltered ?? 0}
      />
    </ContentLayout>
  );
};

export default CasinoList;
