import { FloatingLabel, Form } from 'react-bootstrap';
import styles from './CurrenciesForm.module.scss';
import { useEffect, useState } from 'react';
import { ICurrencyFormData, IErrorData, IIsValidData } from '../models/interface';
import { currencyFormApi } from '../api/currenciesApi';
import { getCurrencyByIdApiHandler } from '@/shared/api/dev/currencyApi';
import Button from '@/shared/ui/Button';
import { AxiosError } from 'axios';
import { errorValidator } from '../helpers/validator';
import { useRouter } from '@/shared/hooks/navigation';

interface IProps {
  id: number;
}

const CurrenciesForm = ({ id }: IProps) => {
  const [data, setData] = useState<ICurrencyFormData>({
    title: '',
    code_alpha: '',
    minor_units: '' as unknown as number,
  });
  const validData = {
    title: false,
    code_alpha: false,
    minor_units: false,
  };
  const [invalidData, setInvalidData] = useState<IIsValidData>(validData);
  const [title, setTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id > 0) {
      void getCurrencyById();
    }
  }, []);

  const getCurrencyById = async () => {
    try {
      setLoading(true);
      const data = await getCurrencyByIdApiHandler(id);
      if (data) {
        setData({
          title: data.title,
          code_alpha: data.code_alpha,
          minor_units: data.minor_units,
        });
        setTitle(data.title);
      }
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
      const result = await currencyFormApi(id, data);
      setInvalidData(validData);
      if (id === 0) {
        router.push(`currencies/edit/${result.id}`);
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
      <FloatingLabel controlId="currency-name" label="Введите название">
        <Form.Control
          required
          isInvalid={invalidData.title}
          value={data.title}
          onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Введите название"
        />
      </FloatingLabel>
      <div className={styles.inputs}>
        <FloatingLabel controlId="currency-code" label="Введите Code Alpha">
          <Form.Control
            required
            isInvalid={invalidData.code_alpha}
            value={data.code_alpha}
            onChange={(e) => setData((prev) => ({ ...prev, code_alpha: e.target.value }))}
            placeholder="Введите Code Alpha"
          />
        </FloatingLabel>
        <FloatingLabel controlId="currency-minor" label="Введите minor units">
          <Form.Control
            required
            isInvalid={invalidData.minor_units}
            value={data.minor_units}
            onChange={(e) =>
              setData((prev) => ({ ...prev, minor_units: e.target.value as unknown as number }))
            }
            type="number"
            placeholder="Введите minor units"
          />
        </FloatingLabel>
      </div>
      <Button
        variant="primary"
        className="w-[100%]"
        loadingPosition="start"
        loading={loading}
        disabled={loading}
        onClick={() => void sendData()}
      >
        Подтвердить
      </Button>
    </Form>
  );
};

export default CurrenciesForm;
