import { Logo } from '@/shared/ui/Icons';
import styles from './Header.module.scss';
import Input from '@/shared/ui/Input';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.search}>
        <Input elType="search" />
      </div>
      <div className={styles.user}></div>
    </div>
  );
};

export default Header;
