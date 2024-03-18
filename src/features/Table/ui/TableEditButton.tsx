import { useRouter } from '@/shared/hooks/navigation';
import Button from '@/shared/ui/Button';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
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
      <Dropdown.Toggle
        variant="phenix-secondary"
        className="px-7 flex-shrink-0 dropdown-caret-none"
      >
        ...
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => router.push(editRoute)}>
          <Button
            variant="outline-light"
            className="w-100"
            size="sm"
            startIcon={<FontAwesomeIcon icon={faEdit} className="me-2" />}
          >
            Edit
          </Button>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => console.log(deleteUrl)}>
          <Button size="sm">
            <span className="text-[#f48270]">Delete customer</span>
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TableEditButton;
