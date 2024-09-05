import { getByIdForName } from '@/app/service/perfil/get/getByIdForName';
import { getStorageItem } from '@/app/functions/storage/getStorageItem/getStorageItem';
import { useState, useEffect } from 'react';

export const useUsersByIds = (authorIds: string[]) => {
    const token = getStorageItem(); 
    const [autores, setAutores] = useState<Perfil[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            setIsLoading(true);
            try {
                const fetchedAuthors = await Promise.all(
                    authorIds.map(id => getByIdForName(token, id))
                );
                // Filtrar valores que são null ou undefined
                const validAuthors = fetchedAuthors.filter((author): author is Perfil => author !== null && author !== undefined);
                setAutores(validAuthors);
            } catch (error) {
                console.error('Erro ao buscar autores:', error);
                setAutores([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (authorIds.length > 0) {
            fetchAuthors();
        }
    }, [authorIds, token]);

    return { autores, isLoading };
};
