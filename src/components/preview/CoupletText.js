import React from "react";

import { Hind } from "next/font/google";
import PropTypes from "prop-types";

import { formatCouplet, calcFontSize } from "@/utils/preview";

const hind = Hind({ weight: ["400", "700"], subsets: ["latin", "devanagari"] });

/**
 * CoupletText component displays the formatted text of a couplet.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.couplet - The text of the couplet to be displayed.
 * @param {number} props.elementWidth - The width of the container element for dynamic styling.
 * @param {number} props.fontSize - The current font size for the couplet text.
 * @param {number} props.lineHeight - The current line height for the couplet text.
 * @returns {JSX.Element} The rendered couplet text.
 */
const CoupletText = ({ couplet, elementWidth, fontSize, lineHeight }) => (
	<div
		className={`relative block w-full font-bold ${hind.className}`}
		style={{
			fontSize: calcFontSize(elementWidth, fontSize),
			lineHeight: calcFontSize(elementWidth, lineHeight),
		}}
	>
		{formatCouplet(couplet).map((line, index) => (
			<span className="block w-full truncate" key={index}>
				{line}
			</span>
		))}
	</div>
);

CoupletText.propTypes = {
	couplet: PropTypes.string.isRequired, // Text of the couplet to be displayed.
	elementWidth: PropTypes.number.isRequired, // Width of the container element for dynamic styling.
	fontSize: PropTypes.number.isRequired, // Font size for the couplet text.
	lineHeight: PropTypes.number.isRequired, // Line height for the couplet text.
};

export default CoupletText;
