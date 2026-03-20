import type { JSX } from 'react';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-montserrat' });

/**
 * SideAuthor component displays a vertically rotated title text with a decorative line.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title="Kabir Ke Dohe"] - The title text to display
 * @param {string} [props.screenReaderTitle] - Optional alternate text for screen readers
 * @returns {JSX.Element} The rendered side author title component
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
