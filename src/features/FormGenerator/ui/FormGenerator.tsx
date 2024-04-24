import React, { FormEvent, useEffect, useState } from 'react';
import { IFormItem } from '../models/interfaces';
import Button from '@/shared/ui/Button';
import { FloatingLabel, Form, Tab, Tabs } from 'react-bootstrap';
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
import { getLanguagesList } from '@/shared/api/languagesApi';

interface IItemProps {
  invalidData: string[];
  formItem: IFormItem;
  texts: IText[];
  setTexts: (texts: IText[]) => void;
}

export interface IText {
  language: string;
  key: string;
  value: string;
}

const ItemByType = ({ invalidData, formItem, texts, setTexts }: IItemProps) => {
  const { t } = useTranslation();
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

  if (formItem.type === 'texts') {
    const [languageList, setLanguageList] = useState<string[]>();

    useEffect(() => {
      const getLangs = async () => {
        const res = await getLanguagesList();
        setLanguageList(res);
      };
      getLangs();
    }, []);
    const types = ['title', 'description', 'seo_title', 'seo_keywords', 'seo_description'];
    const addField = () => {
      setTexts([...texts, { language: 'RU', key: 'title', value: '' }]);
    };

    const deleteField = (index: number) => {
      setTexts(texts.filter((_, i) => i !== index));
    };

    const handleTextChange = (index: number, key: string, value: string) => {
      const updatedTexts = [...texts];
      updatedTexts[index] = { ...updatedTexts[index], key, value };
      setTexts(updatedTexts);
    };

    const handleLanguageChange = (index: number, language: string) => {
      const updatedTexts = [...texts];
      updatedTexts[index] = { ...updatedTexts[index], language };
      setTexts(updatedTexts);
    };
    return (
      <div>
        <div className=" flex flex-col gap-3">
          {texts.map((text, index) => (
            <div className=" flex flex-row justify-between items-center gap-3" key={index}>
              <FloatingLabel
                controlId={`language-${index}`}
                label={t('language')}
                className=" w-[30%]"
              >
                <Form.Select
                  name={'language'}
                  value={text.language}
                  onChange={(e) => handleLanguageChange(index, e.target.value)}
                >
                  {languageList &&
                    languageList.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId={`key-${index}`} label={t('key')} className=" w-[30%]">
                <Form.Select
                  name={'key'}
                  value={text.key}
                  onChange={(e) => handleTextChange(index, e.target.value, text.value)}
                >
                  {types.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId={`value-${index}`} label={t('value')} className=" w-[30%]">
                <Form.Control
                  name={'value'}
                  value={text.value}
                  onChange={(e) => handleTextChange(index, text.key, e.target.value)}
                />
              </FloatingLabel>
              {texts.length > 1 ? (
                <Button variant="danger" onClick={() => deleteField(index)}>
                  {t('delete')}
                </Button>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
        <Button onClick={addField} variant="primary" className="w-[100%] mt-[20px]" type="button">
          Add
        </Button>
      </div>
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
  withTabs?: boolean;
  tabs?: ITab[];
}
interface ITab {
  name: string;
  eventKey: string;
  start: number;
  end: number;
}

const FormGenerator = ({
  formItems,
  api,
  title,
  navigateTo,
  id,
  isFormData,
  withTabs,
  tabs,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();
  const [invalidData, setInvalidData] = useState<string[]>([]);
  const { t } = useTranslation();
  const [texts, setTexts] = useState<IText[]>([{ language: 'RU', key: 'title', value: '' }]);

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
      {withTabs ? (
        <Tabs variant="underline">
          {tabs &&
            tabs.map((tab) => (
              <Tab eventKey={tab.eventKey} title={tab.name}>
                <div className="grid gap-3">
                  {formItems.slice(tab.start, tab.end).map((item, index) => (
                    <ItemByType
                      texts={texts}
                      setTexts={setTexts}
                      key={index}
                      formItem={item}
                      invalidData={invalidData}
                    />
                  ))}
                </div>
              </Tab>
            ))}
        </Tabs>
      ) : (
        formItems.map((item, index) => (
          <ItemByType
            texts={texts}
            setTexts={setTexts}
            key={index}
            formItem={item}
            invalidData={invalidData}
          />
        ))
      )}

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
