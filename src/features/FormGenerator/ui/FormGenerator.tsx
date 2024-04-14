import React, { FormEvent, useEffect, useState } from 'react';
import { IFormItem } from '../models/interfaces';
import Button from '@/shared/ui/Button';
import { FloatingLabel, Form } from 'react-bootstrap';
import styles from './FormGenerator.module.scss';
import Input from '@/shared/ui/Input';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from '@/shared/hooks/navigation';
import { errorMapper } from '@/shared/mapper/errorMapper';
import { MultiSelect } from 'react-multi-select-component';
import { IOption } from '@/shared/models/interfaces/select';
import { useTranslation } from 'react-i18next';
import { convertFormDataToObject } from '../helpers/convertValueByType';
import { ImageUpload } from '@/entities/ImageUpload';

interface IItemProps {
  invalidData: string[];
  formItem: IFormItem;
}

const ItemByType = ({ invalidData, formItem }: IItemProps) => {
  const [value, setValue] = useState<string>(formItem.value as string);
  const [options, setOptions] = useState<IOption[]>(formItem.selectedOption || []);
  useEffect(() => {
    setValue(formItem.value as string);
    setOptions(formItem.selectedOption || []);
  }, [formItem]);

  if (formItem.type === 'switch' || formItem.type === 'checkbox') {
    return (
      <Form.Check
        required={formItem.required}
        type={formItem.type}
        isInvalid={!!invalidData.find((item) => item === formItem.name)}
        defaultChecked={formItem.checked}
        label={formItem.label}
        name={formItem.name}
      />
    );
  }

  if (formItem.type === 'select') {
    return (
      <FloatingLabel controlId={formItem.name} label={formItem.label ?? ''}>
        <Form.Select
          required={formItem.required}
          name={formItem.name}
          value={value}
          isInvalid={!!invalidData.find((item) => item === formItem.name)}
          onChange={(e) => setValue(e.target.value)}
        >
          {formItem.options &&
            formItem.options.map((item, index) => (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            ))}
        </Form.Select>
      </FloatingLabel>
    );
  }

  if (formItem.type === 'multiSelect') {
    return (
      <>
        <MultiSelect
          hasSelectAll={false}
          overrideStrings={{
            allItemsAreSelected: options.join(', '),
            selectSomeItems: formItem.label || '',
          }}
          options={formItem.options || []}
          value={options}
          labelledBy={formItem.label || ''}
          onChange={(value: IOption[]) => setOptions(value)}
        />
        {options.map((item, index) => (
          <input key={index} name={formItem.name} value={item.value} style={{ display: 'none' }} />
        ))}
      </>
    );
  }

  if (formItem.type === 'image') {
    return <ImageUpload size="3xl" src="" onChange={setValue} />;
  }

  return (
    <Input
      controlId={formItem.name}
      name={formItem.name}
      type={formItem.type}
      isInvalid={!!invalidData.find((item) => item === formItem.name)}
      required={formItem.required}
      defaultValue={formItem.value as string}
      placeholder={formItem.placeholder}
      label={formItem.label}
    />
  );
};

interface IProps {
  formItems: IFormItem[];
  navigateTo?: string;
  api: string;
  id: number;
  title?: string;
  isFormData?: boolean;
}

const FormGenerator = ({ formItems, api, title, navigateTo, id, isFormData }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();
  const [invalidData, setInvalidData] = useState<string[]>([]);
  const { t } = useTranslation();

  const sendData = async (formData: FormData | object) => {
    const { data } = await axios.post<{ data: { id: number } }>(api, formData, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });

    return data.data;
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setValidated(true);
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      formData.append('id', id.toString());
      const formDataObj = convertFormDataToObject(formData, formItems);
      const data = await sendData(isFormData ? formData : { ...formDataObj, id: Number(id) });
      if (navigateTo && data.id) {
        router.push(navigateTo + data.id);
      }
    } catch (error) {
      setValidated(false);
      setInvalidData(errorMapper(error as AxiosError<{ errors: object }>));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      className={styles.container}
      onSubmit={(e) => void submitHandler(e)}
    >
      {title && <div className={styles.title}>{title}</div>}
      {formItems.map((item, index) => (
        <ItemByType key={index} formItem={item} invalidData={invalidData} />
      ))}
      <Button
        variant="primary"
        className="w-[100%] mt-[20px]"
        loadingPosition="start"
        loading={loading}
        disabled={loading}
        type="submit"
      >
        {t('submit')}
      </Button>
    </Form>
  );
};

export default FormGenerator;
