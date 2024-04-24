import axios from 'axios';
import Cookies from 'js-cookie';

import {  gamesList} from './dev/gamesApi';
import { IGame } from '../models/interfaces/games';



export const getGamesList = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get<{ data: IGame[] }>(gamesList(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
