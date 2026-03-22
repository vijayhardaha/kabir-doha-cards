import type { JSX } from 'react';

import { IoMdQuote } from 'react-icons/io';

/**
 * Renders the decorative quote mark for the couplet block.
 *
 * @param {{ screenReaderText?: string }} props - The component props.
 * @returns {JSX.Element} The rendered quote icon.
 */
const QuoteIcon = ({ screenReaderText = 'Quotation mark' }: { screenReaderText?: string }): JSX.Element => (
  <div className="quote-icon" role="presentation">
    <IoMdQuote className="quote-icon__icon" aria-hidden="true" />
    <span className="sr-only">{screenReaderText}</span>
  </div>
);

export default QuoteIcon;
