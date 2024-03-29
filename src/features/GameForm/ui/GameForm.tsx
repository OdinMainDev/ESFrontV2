import { FloatingLabel, Form } from 'react-bootstrap';
import styles from './CasinoForm.module.scss';
import { useEffect, useState } from 'react';
import { IErrorData, IGameFormData, IIsValidData } from '../models/interface';
import { gamesFormApi } from '../api/gamesApi';
import Button from '@/shared/ui/Button';
import { AxiosError } from 'axios';
import { errorValidator } from '../helpers/validator';
import { useRouter } from '@/shared/hooks/navigation';
import { resDataToState } from '../helpers/mapper';
import { ImageUpload } from '@/entities/ImageUpload';
import { getGameByIdApiHandler } from '@/shared/api/dev/gamesApi';
import { IGame } from '@/shared/models/interfaces/games';

interface IProps {
  id: number;
}

const GameForm = ({ id }: IProps) => {
  const [data, setData] = useState<IGameFormData>({
    id: 0,
    desktop_enabled: false,
    game_provider: '',
    has_freerounds: false,
    image: '',
    mobile_enabled: false,
    name: '',
    system_id: '',
    system_name: '',
  });
  const validData: IIsValidData = {
    desktop_enabled: false,
    game_provider: false,
    has_freerounds: false,
    image: false,
    mobile_enabled: false,
    name: false,
    system_id: false,
    system_name: false,
  };
  const [invalidData, setInvalidData] = useState<IIsValidData>(validData);
  const [game, setGame] = useState<IGame | null>(null);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id > 0) {
      void getDataById();
    }
  }, []);

  const getDataById = async () => {
    try {
      setLoading(true);
      const data = await getGameByIdApiHandler(id);
      console.log(data);
      setData(resDataToState(data));
      setGame(data);
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
      const result = await gamesFormApi(data);
      setData(resDataToState(result));
      setInvalidData(validData);
      if (id === 0) {
        router.push(`games/edit/${result.id}`);
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
      <div className="flex-1 min-w-[200px] max-w-[600px]">
        {game && <div className={styles.title}>{game.name}</div>}
        <div className="flex flex-col	gap-[10px] mb-[20px]">
          <ImageUpload
            size="5xl"
            src={data.image}
            onChange={(image) => setData((prev) => ({ ...prev, image: image }))}
          />
          <Form.Check
            type="checkbox"
            checked={data.has_freerounds}
            onChange={(e) => setData((prev) => ({ ...prev, has_freerounds: e.target.checked }))}
            id="casino-has"
            label="Has Freerounds"
          />
          <div className={styles.inputs}>
            <Form.Check
              type="checkbox"
              checked={data.mobile_enabled}
              onChange={(e) => setData((prev) => ({ ...prev, mobile_enabled: e.target.checked }))}
              id="casino-mobile"
              label="Mobile Enable"
            />
            <Form.Check
              type="checkbox"
              checked={data.desktop_enabled}
              onChange={(e) => setData((prev) => ({ ...prev, desktop_enabled: e.target.checked }))}
              id="casino-desktop"
              label="Desktop Enable"
            />
          </div>
          <FloatingLabel controlId="game-name" label="Game Provider">
            <Form.Control
              required
              isInvalid={invalidData.name}
              value={data.name}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Game Provider"
            />
          </FloatingLabel>
          <FloatingLabel controlId="game-provider" label="Game Provider">
            <Form.Control
              required
              isInvalid={invalidData.game_provider}
              value={data.game_provider}
              onChange={(e) => setData((prev) => ({ ...prev, game_provider: e.target.value }))}
              placeholder="Game Provider"
            />
          </FloatingLabel>
          <FloatingLabel controlId="game-system" label="System name">
            <Form.Control
              required
              isInvalid={invalidData.system_name}
              value={data.system_name}
              placeholder="System name"
              onChange={(e) => setData((prev) => ({ ...prev, system_name: e.target.value }))}
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
      </div>
      <div className="flex-1">
        <p className="mb-0">Id: {data.id}</p>
        <p className="mb-0">Original name: {data.name}</p>
        <p className="mb-0">System name: {data.system_name}</p>
        <p className="mb-0">System id: {data.system_id}</p>
        <p className="mb-0">Has Freerounds: {data.has_freerounds ? 'true' : 'false'}</p>
      </div>
    </Form>
  );
};

export default GameForm;
