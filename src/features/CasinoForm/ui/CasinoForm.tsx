import { FloatingLabel, Form } from 'react-bootstrap';
import styles from './CasinoForm.module.scss';
import { useEffect, useState } from 'react';
import { ICasinoAddData, ICasinoFormData, IErrorData, IIsValidData } from '../models/interface';
import { casinoFormApi } from '../api/currenciesApi';
import Button from '@/shared/ui/Button';
import { AxiosError } from 'axios';
import { MultiSelect } from 'react-multi-select-component';
import { errorValidator } from '../helpers/validator';
import { useRouter } from '@/shared/hooks/navigation';
import { getCasinoByIdApiHandler } from '@/shared/api/dev/casinosApi';
import { resDataToState } from '../helpers/mapper';
import { getLanguagesList } from '@/shared/api/languagesApi';
import { IOption } from '@/shared/models/interfaces/select';
import { getCurrenciesList } from '@/shared/api/currenciesApi';
import { ImageUpload } from '@/entities/ImageUpload';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

interface IProps {
  id: number;
}

const CasinoForm = ({ id }: IProps) => {
  const [data, setData] = useState<ICasinoFormData>({
    id: 0,
    name: '',
    apikey: uuidv4(),
    is_enabled: false,
    languages: [],
    currencies: [],
    image: '',
  });
  const validData: IIsValidData = {
    apikey: false,
    currencies: false,
    image: false,
    languages: false,
    name: false,
    email: false,
    password: false,
  };
  const [invalidData, setInvalidData] = useState<IIsValidData>(validData);
  const [title, setTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [addData, setAddData] = useState<ICasinoAddData>({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    void getLanguages();
    void getCurrencies();
    if (id > 0) {
      void getDataById();
    }
  }, []);

  const getLanguages = async () => {
    setLanguages(await getLanguagesList());
  };

  const getCurrencies = async () => {
    setCurrencies((await getCurrenciesList()).map((item) => item.code_alpha));
  };

  const getDataById = async () => {
    try {
      setLoading(true);
      const data = await getCasinoByIdApiHandler(id);
      setData(resDataToState(data));
      setTitle(data.name);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendData = async () => {
    try {
      setValidated(true);
      setLoading(true);
      const result = await casinoFormApi(id > 0 ? data : { ...data, ...addData });
      setData(resDataToState(result));
      setInvalidData(validData);
      if (id === 0) {
        router.push(`casino/edit/${result.id}`);
      }
    } catch (e) {
      setValidated(false);
      const error = e as AxiosError<IErrorData>;
      setInvalidData(errorValidator(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form noValidate validated={validated} className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}
      <div className="flex flex-col	gap-[10px] mb-[20px]">
        <ImageUpload
          size="5xl"
          src={data.image}
          onChange={(image) => setData((prev) => ({ ...prev, image: image }))}
        />
        {id === 0 && (
          <div className={styles.inputs}>
            <Form.Control
              required
              className="flex-1"
              isInvalid={invalidData.email}
              value={addData.email}
              onChange={(e) => setAddData((prev) => ({ ...prev, email: e.target.value }))}
              type="email"
              placeholder="name@example.com"
            />
            <FloatingLabel
              controlId="password"
              label={t('password')}
              className="form-icon-container"
            >
              <Form.Control
                required
                isInvalid={invalidData.password}
                className="flex-1"
                value={addData.password}
                onChange={(e) => setAddData((prev) => ({ ...prev, password: e.target.value }))}
                type="password"
                placeholder="Password"
              />
            </FloatingLabel>
          </div>
        )}
        <Form.Check
          type="checkbox"
          checked={data.is_enabled}
          onChange={(e) => setData((prev) => ({ ...prev, is_enabled: e.target.checked }))}
          id="casino-checkbox"
          label={t('turn-on')}
        />

        <FloatingLabel controlId="currency-name" label={t('name')}>
          <Form.Control
            required
            isInvalid={invalidData.name}
            value={data.name}
            onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Введите название"
          />
        </FloatingLabel>
        <FloatingLabel controlId="currency-api" label={t('api-token')}>
          <Form.Control
            required
            isInvalid={invalidData.apikey}
            value={data.apikey}
            placeholder="Api token"
            onChange={(e) => setData((prev) => ({ ...prev, apikey: e.target.value }))}
          />
        </FloatingLabel>
        <div className={styles.inputs}>
          <MultiSelect
            hasSelectAll={false}
            overrideStrings={{ allItemsAreSelected: data.languages.join(', ') }}
            options={languages.map((item) => ({ label: item, value: item }))}
            value={data.languages.map((item) => ({ label: item, value: item }))}
            onChange={(value: IOption[]) =>
              setData((prev) => ({ ...prev, languages: value.map((item) => item.value) }))
            }
            labelledBy="Select"
          />
          <MultiSelect
            hasSelectAll={false}
            overrideStrings={{ allItemsAreSelected: data.currencies.join(', ') }}
            options={currencies.map((item) => ({ label: item, value: item }))}
            value={data.currencies.map((item) => ({ label: item, value: item }))}
            onChange={(value: IOption[]) =>
              setData((prev) => ({ ...prev, currencies: value.map((item) => item.value) }))
            }
            labelledBy="Select"
          />
        </div>
      </div>

      <Button
        variant="primary"
        className="w-[100%]"
        loadingPosition="start"
        loading={loading}
        disabled={loading}
        onClick={() => void sendData()}
      >
        {t('submit')}
      </Button>
    </Form>
  );
};

export default CasinoForm;
