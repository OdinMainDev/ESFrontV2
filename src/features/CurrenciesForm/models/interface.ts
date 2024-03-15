export interface ICurrencyFormData {
  title: string;
  code_alpha: string;
  minor_units: number;
}

export interface IErrorData {
  errors: {
    minor_units: string[];
    title: string[];
    code_alpha: string[];
  };
}

export interface IIsValidData {
  minor_units: boolean;
  title: boolean;
  code_alpha: boolean;
}
