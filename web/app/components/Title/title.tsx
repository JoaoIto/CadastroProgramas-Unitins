import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({
    weight: '400',
    subsets: ['latin']
})

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="text-4xl font-bold text-gray-800 font-openSans shadow-md">{children}</h1>
  );
};

export default Title;
