import axios from 'axios';
import Cookies from 'js-cookie';
import { IFilterParams } from '@/shared/models/interfaces/filter';
import { ITableResponseData } from '@/shared/models/interfaces/table';

export const getTableApi = async <T>(
  url: string,
  params: IFilterParams,
): Promise<ITableResponseData<T> | null> => {
  try {
    const response = await axios.get<{ data: ITableResponseData<T> }>(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params,
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
