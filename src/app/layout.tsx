"use client";

import StoreProvider from './StoreProvider';
import App from './App';

import './sass/main.sass'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <App>{children}</App>
    </StoreProvider>
  )
}

