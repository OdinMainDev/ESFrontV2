export const getMe = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/me`;
};

export const getMyPermissions = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/my/permissions`;
};
