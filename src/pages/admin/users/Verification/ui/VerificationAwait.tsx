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
import { useGetAllQueryParams } from '@/shared/hooks/useGetAllQueryParams';

const VerificationAwait = () => {
  const { t } = useTranslation();
  const tableColumns = useGenerateAwaitTableCulumns();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableData, setTableData] = useState<ITableResponseData<IVerificationAwait> | null>(null);
  const { getAllQuery } = useGetAllQueryParams();

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
    const filter = getAllQuery(tableColumns[0].value);
    if (Number(searchParams.get('length'))) {
      void getData(filter);
    } else {
      setSearchParams(filter as unknown as URLSearchParamsInit);
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
