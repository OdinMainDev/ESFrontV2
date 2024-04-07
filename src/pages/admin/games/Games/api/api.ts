export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/list/filters`;
};

export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/process`;
};

export const getDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/get/${id}`;
};


export const deleteDataById = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/delete/${id}`;
};
