export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/list/filters`;
};

export const dataGroupListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/list`;
};



export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/process`;
};
export const getDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/get/${id}`;
};

export const dataGroupEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/groups/process`;
};
export const getGroupDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/groups/get/${id}`;
};


export const dataGroupFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/list/filters`;
};
