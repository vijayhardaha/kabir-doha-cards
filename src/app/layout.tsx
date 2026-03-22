import type { ReactNode, JSX } from 'react';

import { Space_Grotesk, Poppins, Montserrat } from 'next/font/google';
import 'normalize.css';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.scss';

// Configure the primary display font used across the layout.
const space = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-space-grotesk',
});

// Configure the body font used for Latin and Devanagari content.
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'devanagari'],
  display: 'swap',
  variable: '--font-poppins',
});

// Configure the supporting accent font used in selected UI elements.
const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

/**
 * Renders the shared document shell, fonts, and global site chrome.
 *
 * @param {{ children: ReactNode }} props - The layout props.
 * @returns {JSX.Element} The root document layout.
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
