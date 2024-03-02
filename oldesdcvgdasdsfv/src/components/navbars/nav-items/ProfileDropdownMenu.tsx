import Avatar from 'components/base/Avatar';
import { useState } from 'react';
import { Card, Dropdown, Nav } from 'react-bootstrap';
import avatar from 'assets/imgNew/avatar/placeholder.png';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';

const ProfileDropdownMenu = ({ className }: { className?: string }) => {
  const [navItems] = useState([
    {
      label: 'Profile',
      icon: 'user'
    },
    {
      label: 'Privacy settings',
      icon: 'help-circle'
    }
  ]);

  const {
    settingsPanelConfig: { openSettingPanel },
    setSettingsPanelConfig
  } = useSettingsPanelContext();

  const handleClick = () => {
    setSettingsPanelConfig({ openSettingPanel: !openSettingPanel });
  };

  return (
    <Dropdown.Menu
      align="end"
      className={classNames(
        className,
        'navbar-top-dropdown-menu navbar-dropdown-caret py-0 dropdown-profile shadow border border-300'
      )}
    >
      <Card className="position-relative border-0">
        <Card.Body className="p-0">
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 pt-4 pb-3">
            <Avatar src={avatar} size="xl" />
            <h6 className="text-black">Jerry Seinfield</h6>
          </div>
          <div style={{ height: '10rem' }}>
            <Nav className="nav flex-column mb-2 pb-1">
              {navItems.map(item => (
                <Nav.Item key={item.label}>
                  <Nav.Link href="#!" className="px-3">
                    <FeatherIcon
                      icon={item.icon}
                      size={16}
                      className="me-2 text-900"
                    />
                    <span className="text-1000">{item.label}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
              <Nav.Item key="cusomizerCustom" onClick={handleClick}>
                <Nav.Link href="#!" className="px-3">
                  <FeatherIcon
                    icon="settings"
                    size={16}
                    className="me-2 text-900"
                  />
                  <span className="text-1000">Theme customize</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Card.Body>
        <Card.Footer className="p-0 border-top">
          <div className="px-3 my-3">
            <Link
              to="#!"
              className="btn btn-esfront-secondary d-flex flex-center w-100"
            >
              <FeatherIcon icon="log-out" className="me-2" size={16} />
              Sign out
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </Dropdown.Menu>
  );
};

export default ProfileDropdownMenu;
