import { CurrenciesTable } from '@/widgets/Table';
import React from 'react';

const CasinoList = () => {
  return (
    <div>
      <h2 className="mb-4">Список валют</h2>
      <CurrenciesTable />
    </div>
  );
};

export default CasinoList;
