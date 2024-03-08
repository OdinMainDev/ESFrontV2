import { jwtDecode } from 'jwt-decode';
import { ITokenData } from '../models/interfaces/token';

export const isAdminValidator = (token: string) => {
  const tokenData = jwtDecode<ITokenData>(token);
  if (tokenData.hsr) {
    return true;
  }
  return false;
};
