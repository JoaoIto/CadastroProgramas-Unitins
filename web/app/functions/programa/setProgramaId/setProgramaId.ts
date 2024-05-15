import { tokenService } from '@/app/Utils/Cookies/tokenStorage';
import nookies from 'nookies';

export const setProgramaId = (programaId: string) => {
    tokenService.setProgramaId(programaId);
};