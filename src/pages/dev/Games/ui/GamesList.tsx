import { GamesTable } from '@/widgets/Table';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Dropdown, FloatingLabel, Form } from 'react-bootstrap';
import { providersList } from '../constants/providers';
const GamesList = () => {
  return (
    <div>
      <h2 className="mb-4">Игры</h2>
      <div className="flex items-center mb-3">
        <div className="w-[30%]">
          <FloatingLabel controlId="search" label="Поиск">
            <Form.Control placeholder="Поиск" className="input-with-icon" />
            <FontAwesomeIcon icon={faSearch} className="input-icon" />
          </FloatingLabel>
        </div>
        <div className="scrollbar overflow-hidden-y">
          <ButtonGroup className="position-static">
            <Dropdown className="position-static" as={ButtonGroup}>
              <Dropdown.Toggle
                variant="phoenix-secondary"
                className="px-7 flex-shrink-0 dropdown-caret-none"
              >
                Провайдеры
                <FontAwesomeIcon icon={faAngleDown} className="ms-2" transform="down-2" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {providersList.map((item, subIndex) => (
                  <Dropdown.Item key={subIndex}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>

      <GamesTable />
    </div>
  );
};

export default GamesList;
