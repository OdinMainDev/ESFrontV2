import { IFormItem } from '../models/interfaces';

export function convertValueByType(
  value: string | string[],
  type: string,
): number | string | boolean | string[] {
  if (Array.isArray(value)) {
    return value;
  }

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

type FormDataObject = Record<string, string | number | boolean | string[]>;

export const convertFormDataToObject = (
  formData: FormData,
  formItem: IFormItem[],
): FormDataObject => {
  const formDataObj: FormDataObject = {};

  formItem.forEach(({ name, type }) => {
    if (name.endsWith('[]')) {
      const nameWithoutBrackets = name.slice(0, -2);
      const values = formData.getAll(name) as string[];
      formDataObj[nameWithoutBrackets] = convertValueByType(values, type as string);
    } else {
      const value = formData.has(name) ? (formData.get(name) as string) : undefined;
      formDataObj[name] = convertValueByType(value as string, type as string);
    }
  });

  return formDataObj;
};
