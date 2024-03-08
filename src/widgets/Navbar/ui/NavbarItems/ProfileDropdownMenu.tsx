import Avatar from '@/shared/ui/Icons/Avatar';
import { useState } from 'react';
import { Card, Dropdown, Nav } from 'react-bootstrap';
import avatar from '@/shared/assets/images/avatar/placeholder.png';
import FeatherIcon from 'feather-icons-react';
import classNames from 'classnames';
import { useSettingsPanelContext } from '@/shared/providers/SettingsPanelProvider';
import { useAppDispatch } from '@/store/hooks/redux';
import { logout } from '@/store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const ProfileDropdownMenu = ({ className }: { className?: string }) => {
  const [navItems] = useState([
    {
      label: 'Profile',
      icon: 'user',
    },
    {
      label: 'Privacy settings',
      icon: 'help-circle',
    },
  ]);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const {
    settingsPanelConfig: { openSettingPanel },
    setSettingsPanelConfig,
  } = useSettingsPanelContext();

  const handleClick = () => {
    setSettingsPanelConfig({ openSettingPanel: !openSettingPanel });
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigation('/');
  };

  return (
    <Dropdown.Menu
      align="end"
      className={classNames(
        className,
        'navbar-top-dropdown-menu navbar-dropdown-caret py-0 dropdown-profile shadow border border-300',
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
              {navItems.map((item) => (
                <Nav.Item key={item.label}>
                  <Nav.Link href="#!" className="px-3">
                    <FeatherIcon icon={item.icon} size={16} className="me-2 text-900" />
                    <span className="text-1000">{item.label}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
              <Nav.Item key="cusomizerCustom" onClick={handleClick}>
                <Nav.Link href="#!" className="px-3">
                  <FeatherIcon icon="settings" size={16} className="me-2 text-900" />
                  <span className="text-1000">Theme customize</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Card.Body>
        <Card.Footer className="p-0 border-top">
          <div className="px-3 my-3">
            <div
              onClick={logoutHandler}
              className="btn btn-esfront-secondary d-flex flex-center w-100"
            >
              <FeatherIcon icon="log-out" className="me-2" size={16} />
              Sign out
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Dropdown.Menu>
  );
};

export default ProfileDropdownMenu;
