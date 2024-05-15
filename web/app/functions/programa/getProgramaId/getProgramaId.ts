import nookies from 'nookies';

export const getProgramaId = () => {
    const cookies = nookies.get();
    const programaId = cookies.programaId;
    return programaId;
};