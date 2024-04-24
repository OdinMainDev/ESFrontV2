import { IData } from '../models/interfaces';

export const mapperData = (data: IData) => {
  return {
    ...data,
    ...data.data,
  };
};
