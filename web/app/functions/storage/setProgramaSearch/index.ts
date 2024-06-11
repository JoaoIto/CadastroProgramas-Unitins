export const setProgramaItem = (key: string, value: string) => {
    try {
        sessionStorage.setItem(key, value);
    } catch (error) {
        console.error('Erro ao definir item no sessionStorage:', error);
    }
};
