"use client"
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/app/functions/getUserRole/getUserRole";
import { APP_ROUTES } from "@/app/constants/app-routes";
import { getStorageItem } from "@/app/functions/getStorageItem/getStorageItem";
import { checkUserAuthenticated } from "@/app/functions/checkUserAuthenticated/checkUserAuthenticated";

type PrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { push } = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    const isUserAuthenticated = checkUserAuthenticated();

    useEffect(() => {
        const fetchUserRole = async () => {
            if (isUserAuthenticated) {
                try {
                    const token = getStorageItem()
                    const role = await getUserRole(token);
                    setUserRole(role);
                } catch (error) {
                    console.error("Erro ao obter o tipo de usuário:", error);
                }
            }
        };

        fetchUserRole();
    }, [isUserAuthenticated]);

    useEffect(() => {
        if (!isUserAuthenticated) {
            push(APP_ROUTES.public.login);
        } else if (userRole === "admin" && !window.location.pathname.startsWith("/admin")) {
            push(APP_ROUTES.private.admin.dashboard);
        } else if (userRole === "user" && window.location.pathname.startsWith("/admin")) {
            push(APP_ROUTES.private.user.dashboard); // Adicione a rota do dashboard do usuário aqui
        }
    }, [isUserAuthenticated, userRole, push]);

    if (!isUserAuthenticated || userRole === null) {
        return <div>Carregando...</div>; // ou algum componente de carregamento
    }

    return (
        <>
            {isUserAuthenticated && children}
        </>
    )
}

export default PrivateRoute;
