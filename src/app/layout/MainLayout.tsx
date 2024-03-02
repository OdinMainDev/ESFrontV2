import { useAppContext } from '@/shared/providers/AppProvider';
import { useMainLayoutContext } from '@/shared/providers/MainLayoutProvider';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import {
  NavbarDual,
  NavbarTopDefault,
  NavbarTopHorizontal,
  NavbarVertical,
} from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';

const MainLayout = () => {
  const {
    config: { navbarPosition },
  } = useAppContext();
  const { contentClass, footerClass } = useMainLayoutContext();

  return (
    <Container fluid className="px-0">
      {(navbarPosition === 'vertical' || navbarPosition === 'combo') && <NavbarVertical />}
      {navbarPosition === 'vertical' && <NavbarTopDefault />}
      {(navbarPosition === 'horizontal' || navbarPosition === 'combo') && <NavbarTopHorizontal />}
      {navbarPosition === 'dual' && <NavbarDual />}

      <div className={classNames(contentClass, 'content')}>
        <Outlet />
        <Footer className={classNames(footerClass, 'position-absolute')} />
      </div>
    </Container>
  );
};

export default MainLayout;
