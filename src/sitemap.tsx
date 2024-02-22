import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import {
  Icon,
  UilChartPie,
  UilCube,
  UilDocumentLayoutRight,
  UilFilesLandscapesAlt,
  UilPuzzlePiece
} from '@iconscout/react-unicons';

export interface Route {
  name: string;
  icon?: IconProp | string | string[];
  iconSet?: 'font-awesome' | 'feather' | 'unicons';
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

export const routes: RouteItems[] = [
  {
    label: 'пользователи',
    active: true,
    icon: UilChartPie,
    pages: [
      {
        name: 'Статусы',
        icon: 'pie-chart',
        active: true,
        pages: [
          {
            name: 'Список',
            path: '/auth/sign-in',
            pathName: 'sign-in',
            active: true
          },
          {
            name: 'Добавить',
            path: '/pages/errors/404',
            pathName: 'add',
            active: true
          },
        ]
      },

      {
        name: 'Боты',
        icon: 'pie-chart',
        active: true,
        pages: [
          {
            name: 'Список',
            path: '#',
            pathName: 'list',
            active: true
          },
          {
            name: 'Добавить',
            path: '#',
            pathName: 'add',
            active: true
          },
        ]
      },
      
    ]
  },
];
