import { Navbar } from 'react-bootstrap';
import { useAppContext } from '@/shared/providers/AppProvider';
import classNames from 'classnames';
import NavbarBrand from './NavbarItems/NavbarBrand';
import NavItems from './NavbarItems/NavItems';
import NavItemsSlim from './NavbarItems/NavItemsSlim';

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
