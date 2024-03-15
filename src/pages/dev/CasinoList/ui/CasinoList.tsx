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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/shared/ui/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DocumentExport } from '@/features/DocumentExport';
import { useRouter } from '@/shared/hooks/navigation';
import { FilterButton } from '@/features/FilterModal';
import { casinosFilterApi } from '../api/casinosApi';
import { fromUnixTime, format } from 'date-fns';

const CasinoList = () => {
  const [tableData, setTableData] = useState<ITableResponseData<ICasino> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const tableHeader = casinosTableHeader;
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
            fileName="Casino_Table"
            data={tableData?.data ?? []}
            headers={casinosTableHeader.slice(0, -1)}
          />
        </div>
        <FilterButton url={casinosFilterApi()} />
      </div>
      <CasinoTable tableData={tableData} tableHeader={tableHeader} />
    </ContentLayout>
  );
};

export default CasinoList;
