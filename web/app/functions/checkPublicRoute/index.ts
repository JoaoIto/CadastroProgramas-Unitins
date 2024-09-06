import { APP_ROUTES} from "@/app/constants/app-routes";

/**
 * @param asPath string
 * @returns boolean
 */

export const checkPublicRoute = (asPath: string) => {
    const appPublicRoutes = Object.values(APP_ROUTES.public);

    return appPublicRoutes.includes(asPath);
}
