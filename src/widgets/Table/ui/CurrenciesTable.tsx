import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { TableHeader, TablePagination } from '@/features/Table';
import { format } from 'date-fns/format';
import { ICurrencies } from '@/shared/models/interfaces/currencies';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { ITableHeader } from '../models/interface';
import { useRouter } from '@/shared/hooks/navigation';
import { fromUnixTime } from 'date-fns';

interface IProps {
  tableData: ITableResponseData<ICurrencies> | null;
  tableHeader: ITableHeader[];
}

const CurrenciesTable = ({ tableData, tableHeader }: IProps) => {
  const router = useRouter();

  const editHandler = (currency: ICurrencies) => {
    router.push(`currencies/edit/${currency.id}`);
  };

  return (
    <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
      <div>
        <div className="scrollbar ms-n1 ps-1">
          <table className="esfront-table table">
            <TableHeader tableHeader={tableHeader} />
            <tbody>
              {tableData &&
                tableData.data.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4">
                      <span>{item.id}</span>
                    </td>
                    <td className="ps-4">
                      <div className="flex">
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="ps-4">
                      <span>{item.code_alpha}</span>
                    </td>
                    <td className="ps-4">
                      <span>{item.minor_units}</span>
                    </td>
                    <td className="ps-4">
                      <span>{format(fromUnixTime(item.created_at), 'dd MMMM yyyy, HH:mm')}</span>
                    </td>
                    <td>
                      <span onClick={() => editHandler(item)}>
                        <FontAwesomeIcon size="lg" className="cursor-pointer" icon={faEdit} />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <TablePagination recordsTotal={tableData?.recordsTotal ?? 0} />
      </div>
    </div>
  );
};

export default CurrenciesTable;
