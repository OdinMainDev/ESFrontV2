import { IOption } from '@/shared/models/interfaces/select';

export type formItemType = 'text' | 'number' | 'select' | 'checkbox' | 'switch' | 'multiSelect' | 'image' | 'texts' ;


export interface IFormItem {
  name: string;
  placeholder?: string;
  type?: formItemType;
  required?: boolean;
  label?: string;
  checked?: boolean;
  value?: string | number | boolean;
  options?: IOption[];
  selectedOption?: IOption[];
}
