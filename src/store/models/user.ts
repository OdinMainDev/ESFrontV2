import { IUser } from '@/shared/models/interfaces/user';

export type roleType = 0 | 1 | 2;

export interface IInitialUser {
  loading: boolean;
  isError: boolean;
  isAuth: boolean;
  user: IUser | null;
  role: roleType;
}
