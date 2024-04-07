export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/sliders/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/sliders/list/filters`;
};

export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/sliders/process`;
};

export const getDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/sliders/get/${id}`;
};


export const deleteDataById = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/sliders/delete/${id}`;
};
