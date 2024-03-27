import Avatar from '@/shared/ui/Icons/Avatar';
import { Dropdown, Nav } from 'react-bootstrap';
import avatar57 from '@/shared/assets/images/avatar/placeholder.png';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotificationDropdownMenu from './NotificationDropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const NavItems = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
    navigate(`${location.pathname.replace(/^\/[a-z]{2}\//, `/${lang}/`)}`, { replace: true });
  };

  return (
    <div className="navbar-nav navbar-nav-icons flex-row">
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle
            size="sm"
            variant="phenix-secondary"
            className="flex-shrink-0 dropdown-caret-none"
          >
            <FontAwesomeIcon icon={faLanguage} size="xl" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLanguage('ru')} className="text-center">
              RU
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage('en')} className="text-center">
              EN
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
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
