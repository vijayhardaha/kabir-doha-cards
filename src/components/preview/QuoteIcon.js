import { IoMdQuote } from "react-icons/io";

/**
 * QuoteIcon component displays a stylized quote icon.
 *
 * @component
 * @returns {JSX.Element} The rendered quote icon.
 */
const QuoteIcon = () => (
	<div className="relative mb-[var(--kdc-quote-block-mb)] ml-[var(--kdc-quote-block-ml)] block text-[var(--kdc-color)]">
		<IoMdQuote className="h-[var(--kdc-quote-h)] w-[var(--kdc-quote-w)]" />
	</div>
);

export default QuoteIcon;
