import axios from 'axios';
import Cookies from 'js-cookie';

import {  gameApiProviderListApi} from './dev/gamesApi';



export const getApiProviderListApi = async (): Promise<string[]> => {
  try {
    const { data } = await axios.get<{ data: string[] }>(gameApiProviderListApi(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
