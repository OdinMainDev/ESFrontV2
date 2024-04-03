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

interface IItemProps {
  invalidData: string[];
  formItem: IFormItem;
}

const ItemByType = ({ invalidData, formItem }: IItemProps) => {
  const [value, setValue] = useState<string>(formItem.value as string);
  useEffect(() => {
    setValue(formItem.value as string);
  }, [formItem]);

  if (formItem.type === 'switch' || formItem.type === 'checkbox') {
    return (
      <Form.Check
        required={formItem.required}
        type={formItem.type}
        isInvalid={!!invalidData.find((item) => item === formItem.name)}
        defaultChecked={formItem.value as boolean}
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
  title?: string;
}

const FormGenerator = ({ formItems, api, title, navigateTo }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();
  const [invalidData, setInvalidData] = useState<string[]>([]);

  const sendData = async (formData: FormData) => {
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
      // const formDataObj = Object.fromEntries(formData.entries());
      const data = await sendData(formData);
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
        Подтвердить
      </Button>
    </Form>
  );
};

export default FormGenerator;
