import { IFormItem } from '../models/interfaces';

export function convertValueByType(value: string, type: string): number | string | boolean {
  switch (type) {
    case 'number':
      return Number(value);
    case 'switch':
    case 'checkbox':
      return value === 'on';
    default:
      return value;
  }
}

type FormDataObject = Record<string, string | number | boolean>;

export const convertFormDataToObject = (
  formData: FormData,
  formItem: IFormItem[],
): FormDataObject => {
  const formDataObj: FormDataObject = {};

  formItem.forEach(({ name, type }) => {
    const value = formData.has(name) ? (formData.get(name) as string) : undefined;
    formDataObj[name] = convertValueByType(value as string, type as string);
  });

  return formDataObj;
};
