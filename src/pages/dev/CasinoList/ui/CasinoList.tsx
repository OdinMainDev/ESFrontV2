import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { ICasino } from '@/shared/models/interfaces/casinos';
import { casinosTableColumns } from '../constants';
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

const CasinoList = () => {
  const [tableData, setTableData] = useState<ITableResponseData<ICasino> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const tableColumns = casinosTableColumns;
  const router = useRouter();

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
    if (Number(searchParams.get('length'))) {
      const filter = {
        length: Number(searchParams.get('length')) || 10,
        start: Number(searchParams.get('start')),
        order_direction: searchParams.get('order_direction') || 'asc',
        order_column: searchParams.get('order_column') || tableColumns[0].value,
      };
      void getData(filter);
    } else {
      if (!Number(searchParams.get('length'))) {
        setSearchParams({
          length: 10,
          start: 0,
          order_direction: 'asc',
          order_column: tableColumns[0].value,
        } as unknown as URLSearchParamsInit);
      }
    }
  }, [searchParams]);

  return (
    <ContentLayout title="Список казино">
      <div className="flex justify-between mb-3">
        <div className="flex">
          <Button
            variant="primary"
            className="mr-[10px]"
            startIcon={<FontAwesomeIcon icon={faPlus} className="me-2" />}
            onClick={() => router.push('casino/add')}
          >
            Добавить Казино
          </Button>
          <DocumentExport
            fileName="Casinos_Table"
            data={tableData?.data ?? []}
            headers={casinosTableColumns.filter((item) => item.export)}
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
