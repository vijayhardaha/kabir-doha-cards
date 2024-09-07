import React from "react";

import { Hind } from "next/font/google";
import PropTypes from "prop-types";

import { formatCouplet } from "@/utils/preview";

const hind = Hind({ weight: ["400", "700"], subsets: ["latin", "devanagari"] });

/**
 * CoupletText component displays the formatted text of a couplet.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.couplet - The text of the couplet to be displayed.
 * @returns {JSX.Element} The rendered couplet text.
 */
const CoupletText = ({ couplet }) => (
	<div
		className={`relative block w-full font-bold ${hind.className}`}
		style={{
			fontSize: "var(--kdc-couplet-text-fs)",
			lineHeight: "var(--kdc-couplet-text-lh)",
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
};

export default CoupletText;
