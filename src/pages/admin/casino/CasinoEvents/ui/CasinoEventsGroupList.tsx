import { DocumentExport } from '@/features/DocumentExport';
import { useRouter } from '@/shared/hooks/navigation';
import ContentLayout from '@/shared/layout/ContentLayout';
import Button from '@/shared/ui/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useGroupGenerateTableCulumns } from '../constants';
import { FilterButton } from '@/features/FilterModal';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { IGroupData } from '../models/interfaces';
import { dataGroupFilterApi, dataGroupListApi } from '../api/api';
import { useEffect, useState } from 'react';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { format, fromUnixTime } from 'date-fns';
import { getTableApi, Table } from '@/features/Table';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { useGetAllQueryParams } from '@/shared/hooks/useGetAllQueryParams';

const CasinoUrlList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const tableColumns = useGroupGenerateTableCulumns();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableData, setTableData] = useState<ITableResponseData<IGroupData> | null>(null);
  const { getAllQuery } = useGetAllQueryParams();

  const getData = async (filterParams: IFilterParams) => {
    const data = await getTableApi<IGroupData>(dataGroupListApi(), filterParams);
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
    <ContentLayout title={t('EventGroups')}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          <Button
            variant="primary"
            className="mr-[10px]"
            size="sm"
            startIcon={<FontAwesomeIcon icon={faPlus} className="me-2" />}
            onClick={() => router.push('currencies/add')}
          >
            {t('add')}
          </Button>
          <DocumentExport
            fileName="Currencies_Table"
            data={tableData?.data ?? []}
            headers={tableColumns.filter((item) => item.export)}
          />
        </div>

        <FilterButton url={dataGroupFilterApi()} />
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={tableData?.data || []}
        recordsTotal={tableData?.recordsFiltered ?? 0}
      />
    </ContentLayout>
  );
};

export default CasinoUrlList;
