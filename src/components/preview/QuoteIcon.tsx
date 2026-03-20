import type { JSX } from 'react';

import { IoMdQuote } from 'react-icons/io';

/**
 * QuoteIcon component displays a stylized quote icon with proper accessibility.
 *
 * The component renders a decorative quote icon with appropriate screen reader text
 * and styling controlled through CSS variables.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.screenReaderText="Quotation mark"] - Alternative text for screen readers
 * @returns {JSX.Element} The rendered quote icon with accessibility features
 */
const QuoteIcon = ({ screenReaderText = 'Quotation mark' }: { screenReaderText?: string }): JSX.Element => (
  <div
    className="relative mb-[var(--kdc-quote-block-mb)] ml-[var(--kdc-quote-block-ml)] block text-[var(--kdc-color)]"
    role="presentation"
  >
    <IoMdQuote className="h-[var(--kdc-quote-h)] w-[var(--kdc-quote-w)]" aria-hidden="true" />
    <span className="sr-only">{screenReaderText}</span>
  </div>
);

export default QuoteIcon;
