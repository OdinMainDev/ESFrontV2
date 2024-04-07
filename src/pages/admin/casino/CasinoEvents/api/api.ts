export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/list/filters`;
};

export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/process`;
};

export const dataDeleteApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/delete/${id}`;
};

export const getDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/get/${id}`;
};







export const dataGroupListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/groups/list`;
};


export const dataGroupFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/groups/list/filters`;
};



export const dataGroupEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/groups/process`;
};

export const dataGroupDeleteApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/groups/delete/${id}`;
};

export const getGroupDataByIdApi = (id:number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/groups/get/${id}`;
};

