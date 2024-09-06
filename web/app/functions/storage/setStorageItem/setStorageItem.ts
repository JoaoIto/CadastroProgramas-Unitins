import nookies from 'nookies';

export const setStorageItem = (key: string, value: string) => {
    nookies.set(null, key, value, { path: '/' });
};