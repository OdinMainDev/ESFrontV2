export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/list/filters`;
};


export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/process`;
};

export const getDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/get/${id}`;
};


export const deleteDataById = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/delete/${id}`;
};
