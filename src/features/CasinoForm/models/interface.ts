export interface ICasinoFormData extends ICasinoAddData {
  id: number;
  name: string;
  apikey: string;
  is_enabled: boolean;
  languages: string[];
  currencies: string[];
  image: string;
}

export interface ICasinoAddData {
  email?: string;
  password?: string;
}

export interface IErrorData {
  errors: {
    apikey: string[];
    currencies: string[];
    image: string[];
    languages: string[];
    name: string[];
    email: string[];
    password: string[];
  };
}

export interface IIsValidData {
  apikey: boolean;
  currencies: boolean;
  image: boolean;
  languages: boolean;
  name: boolean;
  email: boolean;
  password: boolean;
}
