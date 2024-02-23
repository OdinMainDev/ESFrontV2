import Avatar from 'components/base/Avatar';
import { Dropdown, Nav } from 'react-bootstrap';
import avatar57 from 'assets/imgNew/avatar/placeholder.png';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import NotificationDropdownMenu from './NotificationDropdownMenu';

const NavItems = () => {
  return (
    <div className="navbar-nav navbar-nav-icons flex-row">
      <Nav.Item>
        <Dropdown autoClose="outside" className="h-100">
          <Dropdown.Toggle
            as={Link}
            to="#!"
            className="dropdown-caret-none nav-link h-100"
            variant=""
          >
            <FeatherIcon icon="bell" size={20} />
          </Dropdown.Toggle>
          <NotificationDropdownMenu />
        </Dropdown>
      </Nav.Item>
      <Nav.Item>
        <Dropdown autoClose="outside" className="h-100">
          <Dropdown.Toggle
            as={Link}
            to="#!"
            className="dropdown-caret-none nav-link pe-0 py-0 lh-1 h-100 d-flex align-items-center"
            variant=""
          >
            <Avatar src={avatar57} size="l" />
          </Dropdown.Toggle>
          <ProfileDropdownMenu />
        </Dropdown>
      </Nav.Item>
    </div>
  );
};

export default NavItems;
