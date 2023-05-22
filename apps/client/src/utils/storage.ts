const storagePrefix = "auth_";

export const storage = {
  getToken: () => {
    const token = JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    ) as string;
    return token;
  },

  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};
