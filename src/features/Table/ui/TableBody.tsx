import { ITableBody } from '../models/table';
import { useTranslation } from 'react-i18next';

const TableBody = ({ tableData, tableColumns }: ITableBody) => {
  const { t } = useTranslation();
  return (
    <tbody>
      {tableData.length > 0 ? (
        tableData.map((item, index) => (
          <tr key={index}>
            {tableColumns.map(({ value, render, classNames }, index) => (
              <td key={index} className={classNames ? classNames : 'ps-4'}>
                {render ? render(item) : <span>{item[value] ?? ''}</span>}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={tableColumns.length} align="center" className="py-4">
            {t('no-records-found')}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
