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
      <Dropdown.Toggle variant="phenix-secondary" className="flex-shrink-0 dropdown-caret-none">
        ...
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Button
          as={Dropdown.Item}
          variant="outline-light"
          size="sm"
          onClick={() => router.push(editRoute)}
          startIcon={<FontAwesomeIcon icon={faEdit} className="me-2" />}
        >
          Edit
        </Button>
        <Button as={Dropdown.Item} size="sm" onClick={() => router.push(deleteUrl)}>
          <span className="text-[#f48270]">Delete</span>
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TableEditButton;
