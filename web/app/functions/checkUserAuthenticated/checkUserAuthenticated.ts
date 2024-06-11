"use client"
import { getStorageItem } from '../storage/getStorageItem/getStorageItem';

export const checkUserAuthenticated = () => {
    const userToken = getStorageItem();
    return !!userToken;
}