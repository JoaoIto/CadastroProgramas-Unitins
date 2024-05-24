"use client"
import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {checkUserAuthenticated} from "../../functions/checkUserAuthenticated/checkUserAuthenticated";
import {APP_ROUTES} from "@/app/constants/app-routes";
import { getUserRole } from "@/app/functions/getUserRole/getUserRole";
import { getStorageItem } from "@/app/functions/getStorageItem/getStorageItem";

type PrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const { push } = useRouter();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = checkUserAuthenticated();
            setIsUserAuthenticated(authenticated);

            if (authenticated) {
                try {
                    const token = getStorageItem();
                    const role = await getUserRole(token);
                    setUserRole(role);
                } catch (error) {
                    console.error("Erro ao obter perfil do usuário:", error);
                    setIsUserAuthenticated(false);
                }
            } else {
                push(APP_ROUTES.public.login);
            }
        };

        checkAuth();
    }, [push]);

    useEffect(() => {
        if (isUserAuthenticated === false) {
            push(APP_ROUTES.public.login);
        } else if (isUserAuthenticated && userRole) {
            if (userRole === 'admin') {
                push(APP_ROUTES.private.admin.dashboard);
            } else {
                push(APP_ROUTES.private.user.dashboard);
            }
        }
    }, [isUserAuthenticated, userRole, push]);

    if (isUserAuthenticated === null) {
        // Pode exibir um loader ou algo similar enquanto verifica a autenticação
        return <div>Loading...</div>;
    }

    return (
        <>
            {isUserAuthenticated && children}
        </>
    );
}

export default PrivateRoute;
