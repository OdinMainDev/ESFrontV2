import { useRouter } from '@/shared/hooks/navigation';
import classNames from 'classnames';
import { Breadcrumb } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export interface IPageBreadcrumbItem {
  label: string;
  url?: string;
  active?: boolean;
}

interface PageBreadcrumbProps {
  className?: string;
}

const PageBreadcrumb = ({ className }: PageBreadcrumbProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x && !['ru', 'en'].includes(x));
  const { t } = useTranslation();
  const router = useRouter();
  const breadcrumbs: IPageBreadcrumbItem[] = [
    { url: '/', label: 'home' },
    ...buildBreadcrumbs(pathnames),
  ];

  function buildBreadcrumbs(paths: string[]): IPageBreadcrumbItem[] {
    let basePath = '';
    const breadcrumbs = paths.map((path, index, arr) => {
      basePath += index === 0 ? `${path}` : `/${path}`;

      const isLast = index === arr.length - 1;

      const breadcrumb: IPageBreadcrumbItem = {
        label: path,
        url: `${basePath}/`,
        active: isLast ? true : undefined,
      };

      if (path === 'edit') {
        breadcrumb.active = true;
      }

      return breadcrumb;
    });

    return breadcrumbs;
  }
  const navigateToPage = (url: string) => {
    router.push(url);
  };
  return (
    <Breadcrumb className={classNames(className, 'mb-2')}>
      {breadcrumbs.map((item) => (
        <Breadcrumb.Item
          onClick={() => navigateToPage(item?.url || '')}
          active={item.active}
          key={item.label}
        >
          {t(item.label)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
