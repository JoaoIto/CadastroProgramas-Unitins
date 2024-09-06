"use client"

import { useState, useEffect } from 'react';
import { getStorageItem } from '@/app/functions/storage/getStorageItem/getStorageItem';
import { fetchPerfil } from '@/app/service/perfil/logUser';

export const useUser = () => {
  const token = getStorageItem();
  const [profile, setProfile] = useState<Partial<Perfil>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchPerfil(token);
        if (data !== undefined) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return { profile, isLoading };
};
