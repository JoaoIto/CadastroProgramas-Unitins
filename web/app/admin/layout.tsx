"use client";
import "../globals.css";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Open_Sans } from "next/font/google";
import { checkPublicRoute } from "@/app/functions/checkPublicRoute";
import Sidebar from "../components/MenuLateral/sidebar";
import PrivateRoute from "../Utils/PrivaterRoute";
import Search from "../components/HeaderSearch/cabecalho";
import { Typography } from "@mui/material";
import { useUserPayload } from "../hooks/user/userPayload";
const openSans = Open_Sans({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayoutAdmin: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isPublicPage = checkPublicRoute(pathname);
  const { profile, isLoading } = useUserPayload();
  const isAdmin = profile.perfil === "admin";

  return (
    <html lang="en">
      <body className={openSans.className}>
        {!isPublicPage && <Search />}
        {isAdmin && (
          <div className="w-full flex flex-col items-start p-4">
            <Typography
              variant="h6"
              className="text-azulEscuro font-medium bg-azulClaroGradient p-2 rounded border-2 border-azulEscuro"
            >
              Você está logado como{" "}
              <Typography>Usuário Administrador</Typography>
            </Typography>
          </div>
        )}
        <div className="flex h-full w-full">
          {!isPublicPage && <Sidebar />}
          <main className="h-full w-full">
            {isPublicPage ? children : <PrivateRoute>{children}</PrivateRoute>}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayoutAdmin;
