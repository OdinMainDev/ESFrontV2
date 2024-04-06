export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/medias/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/medias/list/filters`;
};


export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/medias/process`;
};

export const getDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/medias/get/${id}`;
};


export const deleteDataById = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/affiliate/medias/delete/${id}`;
};
