import { IGame } from '@/shared/models/interfaces/games';
import axios from 'axios';
import Cookies from 'js-cookie';

export const gamesFilterApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/games/list/filters`;
};

export const getGameByIdApi = (id: number) => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/games/get/${id}`;
};

export const getGameByIdApiHandler = async (id: number): Promise<IGame> => {
  const { data } = await axios.get<{ data: IGame }>(getGameByIdApi(id), {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('token'),
    },
  });
  return data.data;
};

export const gamesListApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/games/list`;
};


export const allGamesListApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/game-api-providers`;
};