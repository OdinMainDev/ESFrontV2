import { ICasino } from '@/shared/models/interfaces/casinos';
import { ICurrencies } from '@/shared/models/interfaces/currencies';
import { IGame } from '@/shared/models/interfaces/games';

interface IProps<T> {
  data: T[] | null;
}

const TableFilter = <T extends ICasino | ICurrencies | IGame>({ data }: IProps<T>) => {
  return (
    <div className="flex">
      <div></div>
    </div>
  );
};

export default TableFilter;
