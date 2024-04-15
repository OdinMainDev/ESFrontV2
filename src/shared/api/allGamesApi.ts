import axios from 'axios';
import Cookies from 'js-cookie';
import { IGame } from '../models/interfaces/games';
import { allGamesListApi} from './dev/gamesApi';



export const getAllGamesApi = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get<{ data: IGame[] }>(allGamesListApi(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
