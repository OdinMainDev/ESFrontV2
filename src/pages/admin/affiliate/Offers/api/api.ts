export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/offers/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/offers/list/filters`;
};

export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/offers/process`;
};

export const getDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/offers/get/${id}`;
};

export const deleteDataById = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/offers/delete/${id}`;
};
