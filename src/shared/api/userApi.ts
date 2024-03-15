import axios from 'axios';
import Cookies from 'js-cookie';
import { IUser } from '../models/interfaces/user';

export const userApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/me`;
};

export const getMeUserApi = async (): Promise<IUser> => {
  const { data } = await axios.get<{ data: IUser }>(userApi(), {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('token'),
    },
  });
  return data.data;
};
