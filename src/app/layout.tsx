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
  weight: ['400', '500', '600', '700'],
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

/**
 * Root HTML layout used across the application routes.
 *
 * Provides global fonts, header, footer, and the main content wrapper.
 *
 * @param {{ children: ReactNode }} props - The nested page content.
 * @returns {JSX.Element} The root layout element.
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" className={`${space.variable} ${poppins.variable} ${montserrat.variable}`}>
      <body>
        <Header />
        <main className="main-content" aria-label="Main content area for generating and previewing Kabir doha cards">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" reverseOrder={true} />
      </body>
    </html>
  );
}
