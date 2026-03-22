import type { JSX } from 'react';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-montserrat' });

/**
 * Renders the rotated side label used in the card preview.
 *
 * @param {{ title?: string; screenReaderTitle?: string }} props - The component props.
 * @returns {JSX.Element} The rendered side label.
 */
const SideAuthor = ({
  title = 'Kabir Ke Dohe',
  screenReaderTitle,
}: {
  title?: string;
  screenReaderTitle?: string;
}): JSX.Element => {
  const accessibleTitle = screenReaderTitle || title;

  return (
    <div className="side-author" aria-hidden="true">
      <p className={`side-author__text ${montserrat.className}`}>
        <span className="side-author__line" />
        <span className="side-author__title">{title}</span>
      </p>
      <span className="sr-only">{accessibleTitle}</span>
    </div>
  );
};

export default SideAuthor;
