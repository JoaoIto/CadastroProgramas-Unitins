export const getProgramasSearch = (): string | null => {
    try {
        return sessionStorage.getItem('programaSearch');
    } catch (error) {
        console.error('Erro ao obter item do sessionStorage:', error);
        return null;
    }
};
