"use client";

import { useEffect, useRef } from 'react';
import { Inter } from "next/font/google";
import Menu from "./menu";

import './sass/main.sass'
import Top from "./top";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const refMenu = useRef<any>(null);

  const handleMenuButtonOnSelect = () => {
    if (refMenu.current) {
      refMenu.current.select();
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="page">
          <Menu ref={refMenu} />
          <div id="page-main">
            <Top onMenuOnSelect={ handleMenuButtonOnSelect } />
            <div id="page-content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
