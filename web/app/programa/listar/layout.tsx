"use client";
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Open_Sans } from 'next/font/google';
import { checkPublicRoute } from '@/app/functions/checkPublicRoute';
import Sidebar from '@/app/components/MenuLateral/sidebar';
import Search from '@/app/components/HeaderSearch/cabecalho';
const openSans = Open_Sans({ subsets: ['latin'] });

interface ProgramaListLayoutProps {
  children: ReactNode;
}

const ProgramaListLayout: React.FC<ProgramaListLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isPublicPage = checkPublicRoute(pathname);

  return (
    <html lang="en">
      <body className={openSans.className}>
        {!isPublicPage && <Search />}
        <div className="flex h-full">
          {!isPublicPage && <Sidebar />}
          <main className="flex-1"> 
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default ProgramaListLayout;
