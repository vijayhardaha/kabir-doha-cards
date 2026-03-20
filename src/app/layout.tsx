import type { ReactNode, JSX } from 'react';

import { Space_Grotesk } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.scss';

// Load fonts
const space = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

/**
 * Root Layout component for the Next.js App Router.
 *
 * This layout component sets the HTML document structure, applies global styles,
 * and includes global components such as SEO and Toaster. It also ensures that
 * the current page's component is rendered within this layout.
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The page content to be rendered.
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={`${space.className}`}>
        <div>{children}</div>
        <Toaster position="bottom-center" reverseOrder={true} />
      </body>
    </html>
  );
}
