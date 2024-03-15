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
export const routes: RouteItems[] = [
  {
    label: 'Escasino',
    active: true,
    icon: UilChartPie,
    pages: [
      {
        name: 'Игры',
        icon: 'pie-chart',
        active: true,
        pages: [
          {
            name: 'Список',
            path: `/${pathParts[0]}/games`,
            pathName: 'games-list',
            active: true,
          },
        ],
      },
      {
        name: 'Казино',
        icon: 'pie-chart',
        active: true,
        pages: [
          {
            name: 'Список',
            path: `/${pathParts[0]}/casino`,
            pathName: 'casino-list',
            active: true,
          },
          {
            name: 'Добавить',
            path: `/${pathParts[0]}/casino/add`,
            pathName: 'casino-add',
            active: true,
          },
        ],
      },
      {
        name: 'Валюты',
        icon: 'pie-chart',
        active: true,
        pages: [
          {
            name: 'Список',
            path: `/${pathParts[0]}/currencies`,
            pathName: 'currencies-list',
            active: true,
          },
          {
            name: 'Добавить',
            path: `/${pathParts[0]}/currencies/add`,
            pathName: 'currencies-add',
            active: true,
          },
        ],
      },
    ],
  },
];
