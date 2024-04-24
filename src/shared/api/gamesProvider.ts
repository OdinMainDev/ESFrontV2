import axios from 'axios';
import Cookies from 'js-cookie';

import {gamesProviderList} from './dev/gamesApi';



export const getGamesProviderList = async (): Promise<string[]> => {
  try {
    const { data } = await axios.get<{ data: string[] }>(gamesProviderList(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
