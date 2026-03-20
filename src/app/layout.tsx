import type { ReactNode, JSX } from 'react';

import { Space_Grotesk, Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.scss';

const space = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-space-grotesk',
});

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin', 'devanagari'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" className={`${space.variable} ${poppins.variable}`}>
      <body className={space.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-center" reverseOrder={true} />
      </body>
    </html>
  );
}
