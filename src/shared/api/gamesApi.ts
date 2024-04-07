import axios from 'axios';
import Cookies from 'js-cookie';
import { IGame } from '../models/interfaces/games';
import { gamesListApi } from './dev/gamesApi';



export const getGamesApi = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get<{ data: IGame[] }>(gamesListApi(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
