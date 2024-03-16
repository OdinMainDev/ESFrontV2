import { ICasino } from '@/shared/models/interfaces/casinos';
import axios from 'axios';
import Cookies from 'js-cookie';

const getCasinoByIdApi = (id: number) => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/casinos/get/${id}`;
};

export const getCasinoByIdApiHandler = async (id: number): Promise<ICasino> => {
  const { data } = await axios.get<{ data: ICasino }>(getCasinoByIdApi(id), {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('token'),
    },
  });
  return data.data;
};
