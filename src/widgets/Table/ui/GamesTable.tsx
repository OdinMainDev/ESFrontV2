import { ITableHeader } from '../models/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { format, fromUnixTime } from 'date-fns';
import { TableHeader, TablePagination } from '@/features/Table';
import { IGame } from '@/shared/models/interfaces/games';
import { ITableResponseData } from '@/shared/models/interfaces/table';

interface IProps {
  tableData: ITableResponseData<IGame> | null;
  tableHeader: ITableHeader[];
}

const GamesTable = ({ tableData, tableHeader }: IProps) => {
  return (
    <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
      <div className="scrollbar ms-n1 ps-1">
        <table className="table">
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
                      <img src={item.image} className="h-[50px] mr-[10px]" />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="ps-4">
                    <span>{item.game_provider}</span>
                  </td>
                  <td className="ps-4">
                    <span>{format(fromUnixTime(item.created_at), 'dd MMMM yyyy, HH:mm')}</span>
                  </td>
                  <td>
                    <span>
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
  );
};

export default GamesTable;
