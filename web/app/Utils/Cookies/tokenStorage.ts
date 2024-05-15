import nookies from 'nookies';

const ACCESS_TOKEN_KEY = 'token';
const PROGRAMAID_KEY = 'programaid';

export const tokenService = {

    setProgramaId(id: string, ctx = null) {
        const TWO_HOUR = 60 * 120; // Tempo de expiração em segundos (2 horas)
        const options = {
            maxAge: TWO_HOUR,
            path: '/',
        };

        sessionStorage.setItem(PROGRAMAID_KEY, id);
        nookies.set(ctx, PROGRAMAID_KEY, id, options);
    },

    getProgramaId(ctx = null): string {
        const cookies = nookies.get(ctx);
        return cookies[PROGRAMAID_KEY] || '';
    },


    save(accessToken: string, ctx = null) {
        const TWO_HOUR = 60 * 120; // Tempo de expiração em segundos (2 horas)
        const options = {
            maxAge: TWO_HOUR,
            path: '/',
        };
        sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, options);
    },

    get(ctx = null): string {
        const cookies = nookies.get(ctx);
        return cookies[ACCESS_TOKEN_KEY] || '';
    },

    delete(ctx = null) {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        nookies.destroy(ctx, ACCESS_TOKEN_KEY);
    },
};