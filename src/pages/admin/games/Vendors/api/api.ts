export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/list/filters`;
};


export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/process`;
};

export const getDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/get/${id}`;
};


export const deleteDataById = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/delete/${id}`;
};
