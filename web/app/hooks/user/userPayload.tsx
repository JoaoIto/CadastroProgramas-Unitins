'use client'
import { useState, useEffect } from 'react';
import { fetchPayload } from '@/app/service/perfil/payloadUser';
import { getStorageItem } from '@/app/functions/storage/getStorageItem/getStorageItem';

export const useUserPayload = () => {
  const token = getStorageItem();
  const [profile, setProfile] = useState<Partial<Perfil>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchPayload(token);
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
  }, []);

  return { profile, isLoading };
};