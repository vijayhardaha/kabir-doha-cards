import { Montserrat } from 'next/font/google';
import PropTypes from 'prop-types';

const montserrat = Montserrat({ weight: ['400', '500'], subsets: ['latin'] });

/**
 * SideAuthor component displays a vertically rotated title text with a decorative line.
 *
 * The component creates a visually distinctive signature for the content, positioned
 * at the bottom of its container with a 90-degree counter-clockwise rotation.
 * CSS variables are used for styling to allow for theme customization.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title="Kabir Ke Dohe"] - The title text to display
 * @param {string} [props.screenReaderTitle] - Optional alternate text for screen readers
 * @returns {JSX.Element} The rendered side author title component
 */
const SideAuthor = ({ title = 'Kabir Ke Dohe', screenReaderTitle }) => {
  // Use provided screen reader text or default to the visible title
  const accessibleTitle = screenReaderTitle || title;

  return (
    <div
      className="absolute bottom-0 z-10 pl-[var(--kdc-sideauth-block-pl)]"
      aria-hidden="true" // Hide visual presentation from screen readers
    >
      <p
        className={`relative uppercase ${montserrat.className} flex rotate-[-90deg] items-center text-[var(--kdc-color)]`}
        style={{
          fontSize: 'var(--kdc-sideauth-text-fs)',
          lineHeight: 'var(--kdc-sideauth-text-lh)',
          letterSpacing: 'var(--kdc-sideauth-text-ls)',
          transformOrigin: '0 var(--kdc-sideauth-text-to)',
        }}
      >
        <span className="relative mr-[var(--kdc-sideauth-line-mr)] block h-[2px] w-[var(--kdc-sideauth-line-w)] bg-current" />
        <span className="font-medium whitespace-nowrap">{title}</span>
      </p>

      {/* Text for screen readers */}
      <span className="sr-only">{accessibleTitle}</span>
    </div>
  );
};

SideAuthor.propTypes = {
  /**
   * The title text to display in the rotated area
   */
  title: PropTypes.string,

  /**
   * Alternative text to be announced by screen readers
   */
  screenReaderTitle: PropTypes.string,
};

export default SideAuthor;
