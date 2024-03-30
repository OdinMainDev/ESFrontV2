import { useRouter } from '@/shared/hooks/navigation';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Dropdown } from 'react-bootstrap';

interface IProps {
  editRoute: string;
  deleteUrl: string;
}

const TableEditButton = ({ editRoute, deleteUrl }: IProps) => {
  const router = useRouter();

  return (
    <Dropdown as={ButtonGroup} className="position-static">
      <Dropdown.Toggle variant="phenix-secondary" className="flex-shrink-0 dropdown-caret-none">
        ...
      </Dropdown.Toggle>
      <Dropdown.Menu className="min-w-10	px-[0.5rem]">
        <Dropdown.Item className="" onClick={() => router.push(editRoute)}>
          <FontAwesomeIcon icon={faEdit} className="me-2" />
          Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={() => router.push(deleteUrl)}>
          <FontAwesomeIcon color="#f48270" icon={faTrashCan} className="me-2" />
          <span className="text-[#f48270]">Delete</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TableEditButton;
