import axios from 'axios';
import { IGameFormData } from '../models/interface';
import Cookies from 'js-cookie';
import { IGame } from '@/shared/models/interfaces/games';

export const gamesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/games/process`;
};

export const gamesFormApi = async (formData: IGameFormData) => {
  const { data } = await axios.post<{ data: IGame }>(gamesApi(), formData, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('token'),
    },
  });
  return data.data;
};
