export const verificationAwaitListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/await`;
};

export const verificationAwaitFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/await/filters`;
};

export const verificationClosedListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/closed`;
};

export const verificationClosedFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/closed/filters`;
};
