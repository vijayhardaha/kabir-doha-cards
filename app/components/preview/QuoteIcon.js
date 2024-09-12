import { IoMdQuote } from "react-icons/io";

/**
 * QuoteIcon component displays a stylized quote icon.
 *
 * @component
 * @returns {JSX.Element} The rendered quote icon.
 */
const QuoteIcon = () => (
	<div className="relative block text-[var(--kdc-color)] ml-[var(--kdc-quote-block-ml)] mb-[var(--kdc-quote-block-mb)]">
		<IoMdQuote className="w-[var(--kdc-quote-w)] h-[var(--kdc-quote-h)]" />
	</div>
);

export default QuoteIcon;
