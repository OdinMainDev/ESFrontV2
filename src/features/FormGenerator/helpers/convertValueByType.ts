import { IFormItem } from '../models/interfaces';
import { IText } from '../ui/FormGenerator';

export function convertValueByType(
  value: string | string[] | IText[],
  type: string,
): number | string | boolean | string[] | number[] | (string | number | IText)[] {
  if (Array.isArray(value)) {
    return value.map(item => {
      if (typeof item === 'string') {
        const numberValue = Number(item);
        if (!isNaN(numberValue)) {
          return numberValue;
        }
      }
      return item;
    });
  }

  switch (type) {
    case 'number':
      return Number(value);
    case 'switch':
    case 'checkbox':
      return value === 'on';
    case 'texts':
      return value
    default:
      return value;
  }
}

type FormDataObject = Record<string, string | number | boolean | string[]| number[] | (string | number | IText)[]>;

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
    } else if (name === 'texts'){
      const langs = formData.getAll('language') as string[];
      const keys = formData.getAll('key') as string[];
      const value = formData.getAll('value') as string[];
      const mappedValues = langs.map((lang, index) => ({
        language: lang,
        key: keys[index],
        value: value[index],
      }));
      formDataObj[name] = convertValueByType(mappedValues, type as string);
    } else {
      const value = formData.has(name) ? (formData.get(name) as string) : undefined;
      formDataObj[name] = convertValueByType(value as string, type as string);
    }
  });

  return formDataObj;
};
