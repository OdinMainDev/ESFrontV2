import { IOption } from '@/shared/models/interfaces/select';

export type formItemType = 'text' | 'number' | 'select' | 'checkbox' | 'switch' | 'multiSelect';

export interface IFormItem {
  name: string;
  placeholder?: string;
  type?: formItemType;
  required?: boolean;
  label?: string;
  value?: string | number | boolean;
  options?: IOption[];
  selectedOption?: IOption[];
}
