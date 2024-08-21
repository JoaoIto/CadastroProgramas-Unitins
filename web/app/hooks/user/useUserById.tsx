import { getStorageItem } from '@/app/functions/storage/getStorageItem/getStorageItem';
import { getByIdForName } from '@/app/service/perfil/get/getByIdForName';
import { useState, useEffect } from 'react';

export const useUserById = (userId: string) => {
  const token = getStorageItem();
  const [user, setUser] = useState<Partial<IUsuario> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getByIdForName(token, userId);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, isLoading };
};
