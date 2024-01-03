"use client"
import './globals.css'
import React, {ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {Inter} from 'next/font/google';
import {checkPublicRoute} from '@/app/functions/checkPublicRoute';
import PrivateRoute from '@/app/Utils/PrivaterRoute/index';

const inter = Inter({subsets: ['latin']});

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({children}) => {
    const pathname = usePathname();
    const isPublicPage = checkPublicRoute(pathname);

    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="flex">
            <main className="h-full w-full">
                {isPublicPage && children}
                {!isPublicPage && (
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
