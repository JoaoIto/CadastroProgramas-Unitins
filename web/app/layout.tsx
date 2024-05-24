"use client"
import './globals.css'
import React, {ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {Open_Sans} from 'next/font/google';
import {checkPublicRoute} from '@/app/functions/checkPublicRoute';
import { Search } from './components/HeaderSearch/cabecalho';
import { Sidebar } from './components/MenuLateral/sidebar';
import PrivateRoute from './Utils/PrivaterRoute';

const openSans = Open_Sans({subsets: ['latin']});

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({children}) => {
    const pathname = usePathname();
    const isPublicPage = checkPublicRoute(pathname);

    return (
        <html lang="en">
        <body className={openSans.className}>
        <div>
            <Search/>
        </div>
        <div className="flex h-screen w-full">
            <Sidebar/>
            <main className="h-full w-full">
                {isPublicPage ? children : (
                    <PrivateRoute>
                        {children}
                    </PrivateRoute>
                )}
            </main>
        </div>
        </body>
        </html>
    )
}

export default RootLayout;
