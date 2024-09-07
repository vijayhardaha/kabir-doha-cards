import PropTypes from "prop-types";

import AuthorSignature from "./AuthorSignature";
import CoupletText from "./CoupletText";
import QuoteIcon from "./QuoteIcon";
import WebsiteInfo from "./WebsiteInfo";

/**
 * CoupletContent component displays the couplet with a quote icon, text, author signature, underline, and website information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.couplet - The text of the couplet.
 * @param {number} props.elementWidth - The width of the container element for dynamic sizing.
 * @returns {JSX.Element} The rendered couplet content.
 */
const CoupletContent = ({ couplet }) => (
	<div className="relative z-20 h-full flex flex-col items-start justify-end p-[var(--kdc-couplet-content-p)]">
		<QuoteIcon />
		<CoupletText couplet={couplet} />
		<AuthorSignature />
		<WebsiteInfo />
	</div>
);

CoupletContent.propTypes = {
	couplet: PropTypes.string.isRequired, // Text of the couplet.
};

export default CoupletContent;
