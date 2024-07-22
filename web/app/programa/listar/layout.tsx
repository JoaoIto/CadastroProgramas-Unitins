"use client";
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Open_Sans } from 'next/font/google';
import { checkPublicRoute } from '@/app/functions/checkPublicRoute';
import Search from '@mui/icons-material/Search';
import Sidebar from '@/app/components/MenuLateral/sidebar';
const openSans = Open_Sans({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

const ProgramaListLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isPublicPage = checkPublicRoute(pathname);

  return (
    <html lang="en">
      <body className={openSans.className}>
        <Search />
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

export default ProgramaListLayout;
