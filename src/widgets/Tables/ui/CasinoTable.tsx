import { TableEditButton, TableHeader, TablePagination } from '@/features/Table';
import { Form, Table } from 'react-bootstrap';
import { ICasino } from '@/shared/models/interfaces/casinos';
import { ITableResponseData } from '@/shared/models/interfaces/table';
import { ITableHeader } from '../models/interface';

interface IProps {
  tableData: ITableResponseData<ICasino> | null;
  tableHeader: ITableHeader[];
}

const CasinoTable = ({ tableData, tableHeader }: IProps) => {
  return (
    <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
      <div>
        <div className="scrollbar ms-n1 ps-1">
          <Table className="esfront-table table">
            <TableHeader tableHeader={tableHeader} />
            <tbody>
              {tableData &&
                tableData.data.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4">
                      <span>{item.name}</span>
                    </td>
                    <td className="ps-4">
                      <div className="flex">
                        <Form.Check type="checkbox" checked={item.is_enabled} disabled />
                        <span>{item.is_enabled}</span>
                      </div>
                    </td>
                    <td className="ps-4">
                      <span>{item.token}</span>
                    </td>
                    <td className="ps-4">
                      <span>{item.created_at as string}</span>
                    </td>
                    <td>
                      <TableEditButton
                        editRoute={`casino/edit/${item.id}`}
                        deleteUrl={`casino/delete/${item.id}`}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <TablePagination recordsTotal={tableData?.recordsTotal ?? 0} />
      </div>
    </div>
  );
};

export default CasinoTable;
