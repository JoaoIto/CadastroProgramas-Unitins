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
    <h1 className="
    max-w[50px]
    text-4xl
    font-bold
    m-6
    text-gray-800
    font-openSans
    drop-shadow
    shadow-white-500">
        {children}
    </h1>
  );
};

export default Title;
