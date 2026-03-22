import type { ReactNode, JSX } from 'react';

import { Space_Grotesk, Poppins, Montserrat } from 'next/font/google';
import 'normalize.css';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.scss';

const space = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-space-grotesk',
});

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin', 'devanagari'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" className={`${space.variable} ${poppins.variable} ${montserrat.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-center" reverseOrder={true} />
      </body>
    </html>
  );
}
