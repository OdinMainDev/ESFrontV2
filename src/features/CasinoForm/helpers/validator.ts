import { AxiosError } from 'axios';
import { IErrorData, IIsValidData } from '../models/interface';

export const errorValidator = (error: AxiosError<IErrorData>): IIsValidData => {
  if (error.response?.status === 422) {
    const errorData = Object.keys(error.response?.data.errors ?? []);
    return {
      title: !!errorData.find((item) => item === 'title'),
      code_alpha: !!errorData.find((item) => item === 'code_alpha'),
      minor_units: !!errorData.find((item) => item === 'minor_units'),
    };
  }
  return {
    title: false,
    code_alpha: false,
    minor_units: false,
  };
};
