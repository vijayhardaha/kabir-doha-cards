import React from "react";

import PropTypes from "prop-types";

import { calcFontSize } from "@/utils/preview";
import { getSiteUrl } from "@/utils/url";

/**
 * WebsiteInfo component displays a message with information about the source of the image.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.elementWidth - The width of the container element, used for responsive sizing.
 * @returns {JSX.Element} The rendered website info message.
 */
const WebsiteInfo = ({ elementWidth }) => (
	<div
		className="relative block text-xs text-gray-400"
		style={{
			marginTop: calcFontSize(elementWidth, 1.25),
			fontSize: calcFontSize(elementWidth, 0.75),
			lineHeight: calcFontSize(elementWidth, 1),
		}}
	>
		Image sourced from <span className="underline">{getSiteUrl(false)}</span>
	</div>
);

WebsiteInfo.propTypes = {
	elementWidth: PropTypes.number.isRequired, // Width of the container element for responsive sizing.
};

export default WebsiteInfo;
