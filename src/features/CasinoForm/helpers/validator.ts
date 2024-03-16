import { AxiosError } from 'axios';
import { IErrorData, IIsValidData } from '../models/interface';

export const errorValidator = (error: AxiosError<IErrorData>): IIsValidData => {
  if (error.response?.status === 422) {
    const errorData = Object.keys(error.response?.data.errors ?? []);
    return {
      apikey: !!errorData.find((item) => item === 'apikey'),
      currencies: !!errorData.find((item) => item === 'currencies'),
      image: !!errorData.find((item) => item === 'image'),
      languages: !!errorData.find((item) => item === 'image'),
      name: !!errorData.find((item) => item === 'name'),
      password: !!errorData.find((item) => item === 'password'),
      email: !!errorData.find((item) => item === 'email'),
    };
  }
  return {
    apikey: false,
    currencies: false,
    image: false,
    languages: false,
    name: false,
    password: false,
    email: false,
  };
};
