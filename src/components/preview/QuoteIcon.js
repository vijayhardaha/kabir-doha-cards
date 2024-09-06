import React from "react";

import PropTypes from "prop-types";
import { IoMdQuote } from "react-icons/io";

import { calcFontSize } from "@/utils/preview";

/**
 * QuoteIcon component displays a stylized quote icon.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.color - The color of the quote icon.
 * @param {number} props.elementWidth - The width of the container element.
 * @returns {JSX.Element} The rendered quote icon.
 */
const QuoteIcon = ({ color, elementWidth }) => (
	<span
		className="relative inline-block"
		style={{
			marginLeft: calcFontSize(elementWidth, -1.25),
			marginBottom: calcFontSize(elementWidth, 1.5),
		}}
	>
		<IoMdQuote
			color={color}
			style={{
				width: calcFontSize(elementWidth, 7.5),
				height: calcFontSize(elementWidth, 7.5),
			}}
		/>
	</span>
);

QuoteIcon.propTypes = {
	color: PropTypes.string.isRequired, // The color of the quote icon.
	elementWidth: PropTypes.number.isRequired, // The width of the container element.
};

export default QuoteIcon;
