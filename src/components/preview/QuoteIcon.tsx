import type { JSX } from 'react';

import { IoMdQuote } from 'react-icons/io';

/**
 * QuoteIcon component displays a stylized quote icon with proper accessibility.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.screenReaderText="Quotation mark"] - Alternative text for screen readers
 * @returns {JSX.Element} The rendered quote icon with accessibility features
 */
const QuoteIcon = ({ screenReaderText = 'Quotation mark' }: { screenReaderText?: string }): JSX.Element => (
  <div className="quote-icon" role="presentation">
    <IoMdQuote className="quote-icon__icon" aria-hidden="true" />
    <span className="sr-only">{screenReaderText}</span>
  </div>
);

export default QuoteIcon;
