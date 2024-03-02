import { Navbar } from 'react-bootstrap';
import { useAppContext } from '@/shared/providers/AppProvider';
import classNames from 'classnames';
import NavbarBrand from './NavbarItems/NavbarBrand';
import NavItems from './NavbarItems/NavItems';
import NavItemsSlim from './NavbarItems/NavItemsSlim';
import Button from '@/shared/ui/Button';

const NavbarTopDefault = () => {
  const {
    config: { navbarTopShape, navbarTopAppearance },
  } = useAppContext();

  return (
    <Navbar
      className={classNames('navbar-top fixed-top', {
        'navbar-slim': navbarTopShape === 'slim',
        'navbar-darker': navbarTopAppearance === 'darker',
      })}
      expand
      variant=""
    >
      <div className="navbar-collapse justify-content-between">
        <NavbarBrand />
        {navbarTopShape === 'default' ? (
          <>
            <Button variant="primary" className=" mb-3">
              Some btn
            </Button>
            <Button variant="primary" className=" mb-3">
              Some btn
            </Button>
            <NavItems />
          </>
        ) : (
          <NavItemsSlim />
        )}
      </div>
    </Navbar>
  );
};

export default NavbarTopDefault;
