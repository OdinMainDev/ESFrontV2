import { CasinoTable } from '@/widgets/Table';
import React from 'react';

const CasinoList = () => {
  return (
    <div>
      <h2 className="mb-4">Список казино</h2>
      <CasinoTable />
    </div>
  );
};

export default CasinoList;
