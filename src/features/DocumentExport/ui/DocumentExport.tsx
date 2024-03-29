import { faAngleDown, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ITableHeaders } from '@/shared/models/interfaces/table';
import { font } from '../font';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface IProps {
  headers: ITableHeaders[];
  data: any[];
  fileName?: string;
}

const DocumentExport = ({ headers, data, fileName = 'tableData' }: IProps) => {
  const { t } = useTranslation();
  const exportToExcel = (data: any[], headers: ITableHeaders[], fileName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    const transformData = data.map((item) => headers.map((header) => item[header.value]));
    const headersString = headers.map((item) => item.label);
    const ws = XLSX.utils.json_to_sheet([], { header: headersString, skipHeader: true });
    XLSX.utils.sheet_add_aoa(ws, [headersString], { origin: 'A1' });
    XLSX.utils.sheet_add_json(ws, transformData, { origin: 'A2', skipHeader: true });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const exportToPdf = (data: any[], headers: ITableHeaders[], fileName: string) => {
    const doc = new jsPDF();
    doc.addFileToVFS('NunitoSans10pt-Regular.woff', font);
    doc.addFont('NunitoSans10pt-Regular.woff', 'NunitoSans10pt-Regular', 'normal');
    doc.setFont('NunitoSans10pt-Regular');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    const transformData = data.map((item) => headers.map((header) => item[header.value]));
    const headersString = headers.map((item) => item.label);
    autoTable(doc, {
      head: [headersString],
      body: transformData,
    });

    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className="flex gap-[20px]">
      <Dropdown as={ButtonGroup} className="position-static">
        <Dropdown.Toggle
          size="sm"
          variant="esfront-secondary"
          className=" flex-shrink-0 dropdown-caret-none"
        >
          <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2" />
          {t('export-button')}
          <FontAwesomeIcon icon={faAngleDown} className="ms-2" transform="down-2" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => exportToExcel(data, headers, fileName)}>
            Excel
          </Dropdown.Item>
          <Dropdown.Item onClick={() => exportToPdf(data, headers, fileName)}>PDF</Dropdown.Item>
          <Dropdown.Item as="div">
            <CSVLink
              data-rr-ui-dropdown-item
              headers={headers.map((item) => ({ label: item.label, key: item.value }))}
              filename={fileName}
              data={data}
            >
              CSV
            </CSVLink>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DocumentExport;
