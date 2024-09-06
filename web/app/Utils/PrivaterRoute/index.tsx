"use client"
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/app/functions/getUserRole/getUserRole";
import { APP_ROUTES } from "@/app/constants/app-routes";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import { checkUserAuthenticated } from "@/app/functions/checkUserAuthenticated/checkUserAuthenticated";
import { tokenService } from "../Cookies/tokenStorage";
import LoadingSkeleton from "@/app/components/Loading/loading";

type PrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { push } = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const isUserAuthenticated = checkUserAuthenticated();

    useEffect(() => {
        const fetchUserRole = async () => {
            if (isUserAuthenticated) {
                try {
                    const token = getStorageItem();
                    const role = await getUserRole(token);
                    setUserRole(role);
                } catch (error) {
                    console.error("Erro ao obter o tipo de usuário:", error);
                    tokenService.delete();
                    setLoading(true);
                    setTimeout(() => {
                        push(APP_ROUTES.public.login);
                    }, 2000);
                }
            } else {
                setLoading(true);
                setTimeout(() => {
                    push(APP_ROUTES.public.login);
                }, 2000);
            }
        };

        fetchUserRole();
    }, [isUserAuthenticated, push]);

    useEffect(() => {
        if (!isUserAuthenticated) {
            setLoading(true);
            setTimeout(() => {
                push(APP_ROUTES.public.login);
            }, 2000);
        } else if (userRole === "admin" && !window.location.pathname.startsWith("/admin")) {
            push(APP_ROUTES.private.admin.dashboard);
        } else if (userRole === "user" && window.location.pathname.startsWith("/admin")) {
            push(APP_ROUTES.private.user.dashboard);
        } else {
            setLoading(false);
        }
    }, [isUserAuthenticated, userRole, push]);

    if (loading || !isUserAuthenticated || userRole === null) {
        return <LoadingSkeleton/>
    }

    return (
        <>
            {isUserAuthenticated && children}
        </>
    );
}

export default PrivateRoute;
