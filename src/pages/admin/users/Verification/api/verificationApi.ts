export const verificationAwaitListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/await`;
};

export const verificationAwaitFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/await/filters`;
};

export const deleteVerificationAwaitByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/await/delete/${id}`;
};

export const verificationClosedListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/closed`;
};

export const verificationClosedFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/closed/filters`;
};

export const deleteVerificationClosedByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/verifications/closed/delete/${id}`;
};
