"use client";
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Open_Sans } from 'next/font/google';
import { checkPublicRoute } from '@/app/functions/checkPublicRoute';
import Header from '../components/header';
import { Sidebar } from '../components/MenuLateral/sidebar';
const openSans = Open_Sans({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

const PerfilLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isPublicPage = checkPublicRoute(pathname);

  return (
    <html lang="en">
      <body className={openSans.className}>
        <Header />
        <div className="flex h-full w-full">
          <Sidebar />
          <main className="h-full w-full">
                {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default PerfilLayout;
