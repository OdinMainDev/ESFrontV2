import { DocumentExport } from '@/features/DocumentExport';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useTranslation } from 'react-i18next';
import { useGenerateAwaitTableCulumns } from '../constants';
import { FilterButton } from '@/features/FilterModal';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { IVerificationAwait } from '../models/verification';
import { verificationAwaitFilterApi, verificationAwaitListApi } from '../api/verificationApi';
import { useEffect, useState } from 'react';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { format, fromUnixTime } from 'date-fns';
import { getTableApi, Table } from '@/features/Table';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

const VerificationAwait = () => {
  const { t } = useTranslation();
  const tableColumns = useGenerateAwaitTableCulumns();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableData, setTableData] = useState<ITableResponseData<IVerificationAwait> | null>(null);

  const getData = async (filterParams: IFilterParams) => {
    const data = await getTableApi<IVerificationAwait>(verificationAwaitListApi(), filterParams);
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
      const filter = {
        length: Number(searchParams.get('length')) || 10,
        start: Number(searchParams.get('start')),
        order_direction: searchParams.get('order_direction') || 'asc',
        order_column: searchParams.get('order_column') || tableColumns[0].value,
        'filter_name[]': searchParams.getAll('filter_name[]') || [],
        'filter_value[]': searchParams.getAll('filter_value[]') || [],
      };
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
    <ContentLayout title={t('verification Await')}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          <DocumentExport
            fileName="Currencies_Table"
            data={tableData?.data ?? []}
            headers={tableColumns.filter((item) => item.export)}
          />
        </div>

        <FilterButton url={verificationAwaitFilterApi()} />
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={tableData?.data || []}
        recordsTotal={tableData?.recordsTotal ?? 0}
      />
    </ContentLayout>
  );
};

export default VerificationAwait;
