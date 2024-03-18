/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  UilChartPie,
  // UilCube,
  // UilDocumentLayoutRight,
  // UilFilesLandscapesAlt,
  // UilPuzzlePiece
} from '@iconscout/react-unicons';
import { useTranslation } from 'react-i18next';

type NewType = 'font-awesome';

export interface Route {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  icon?: IconProp | string | string[];
  iconSet?: NewType | 'feather' | 'unicons';
  pages?: Route[];
  path?: string;
  pathName?: string;
  flat?: boolean;
  topNavIcon?: string;
  dropdownInside?: boolean;
  active?: boolean;
  new?: boolean;
  hasNew?: boolean;
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: Icon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}
const pathParts = window.location.pathname.split('/').filter(Boolean);
console.log(pathParts[0]);
const lang = pathParts[0] ? `/${pathParts[0]}` : '';

export const useGenerateRoutes = () => {
  const { t } = useTranslation();
  const routes: RouteItems[] = [
    {
      label: 'Escasino',
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('games'),
          icon: 'pie-chart',
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/games`,
              pathName: 'games-list',
              active: true,
            },
          ],
        },
        {
          name: t('casinos'),
          icon: 'pie-chart',
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/casinos`,
              pathName: 'casinos-list',
              active: true,
            },
            {
              name: t('add'),
              path: `${lang}/casinos/add`,
              pathName: 'casinos-add',
              active: true,
            },
          ],
        },
        {
          name: t('currencies'),
          icon: 'pie-chart',
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/currencies`,
              pathName: 'currencies-list',
              active: true,
            },
            {
              name: t('add'),
              path: `${lang}/currencies/add`,
              pathName: 'currencies-add',
              active: true,
            },
          ],
        },
      ],
    },
  ];

  return routes;
};
