import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { ICasino } from '@/shared/models/interfaces/casinos';
import { useGenerateTableColumns } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/shared/ui/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DocumentExport } from '@/features/DocumentExport';
import { useRouter } from '@/shared/hooks/navigation';
import { FilterButton } from '@/features/FilterModal';
import { casinosFilterApi } from '../api/casinosApi';
import { fromUnixTime, format } from 'date-fns';
import { Table, getTableApi } from '@/features/Table';
import { casinoListApi } from '@/shared/api/dev/casinosApi';
import { useTranslation } from 'react-i18next';
import { useGetAllQueryParams } from '@/shared/hooks/useGetAllQueryParams';

const CasinoList = () => {
  const [tableData, setTableData] = useState<ITableResponseData<ICasino> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const tableColumns = useGenerateTableColumns();
  const { getAllQuery } = useGetAllQueryParams();
  const router = useRouter();
  const { t } = useTranslation();

  const getData = async (filterParams: IFilterParams) => {
    const data = await getTableApi<ICasino>(casinoListApi(), filterParams);
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
    <ContentLayout title={t('casinos-list')}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          <Button
            variant="primary"
            size="sm"
            className="mr-[10px]"
            startIcon={<FontAwesomeIcon icon={faPlus} className="me-2" />}
            onClick={() => router.push('casinos/add')}
          >
            {t('casinos-add')}
          </Button>
          <DocumentExport
            fileName="Casinos_Table"
            data={tableData?.data ?? []}
            headers={tableColumns.filter((item) => item.export)}
          />
        </div>
        <FilterButton url={casinosFilterApi()} />
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={tableData?.data || []}
        recordsTotal={tableData?.recordsTotal ?? 0}
      />
    </ContentLayout>
  );
};

export default CasinoList;
