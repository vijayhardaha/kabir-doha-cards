import React from "react";

import PropTypes from "prop-types";

import AuthorSignature from "./AuthorSignature";
import CoupletText from "./CoupletText";
import QuoteIcon from "./QuoteIcon";
import WebsiteInfo from "./WebsiteInfo";
import { calcFontSize } from "@/utils/preview";

/**
 * CoupletContent component displays the couplet with a quote icon, text, author signature, underline, and website information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.color - The color for the quote icon and underline.
 * @param {string} props.couplet - The text of the couplet.
 * @param {number} props.elementWidth - The width of the container element for dynamic sizing.
 * @param {number} props.fontSize - The current font size for the couplet text.
 * @param {number} props.lineHeight - The current line height for the couplet text.
 * @returns {JSX.Element} The rendered couplet content.
 */
const CoupletContent = ({ color, couplet, elementWidth, fontSize, lineHeight }) => (
	<div
		className="relative z-20 h-full flex flex-col items-start justify-end"
		style={{
			paddingBottom: calcFontSize(elementWidth, 1.125), // Dynamic padding based on container width.
			paddingLeft: calcFontSize(elementWidth, 7), // Dynamic padding based on container width.
			paddingRight: calcFontSize(elementWidth, 1), // Dynamic padding based on container width.
		}}
	>
		<QuoteIcon color={color} elementWidth={elementWidth} />
		<CoupletText couplet={couplet} elementWidth={elementWidth} fontSize={fontSize} lineHeight={lineHeight} />
		<AuthorSignature author="Sant Kabir Das" color={color} elementWidth={elementWidth} />
		<WebsiteInfo elementWidth={elementWidth} />
	</div>
);

CoupletContent.propTypes = {
	color: PropTypes.string.isRequired, // Color for the quote icon and underline.
	couplet: PropTypes.string.isRequired, // Text of the couplet.
	elementWidth: PropTypes.number.isRequired, // Width of the container element for dynamic sizing.
	fontSize: PropTypes.number.isRequired, // Font size for the couplet text.
	lineHeight: PropTypes.number.isRequired, // Line height for the couplet text.
};

export default CoupletContent;
