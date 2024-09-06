import React from "react";

import PropTypes from "prop-types";

import { calcFontSize } from "@/utils/preview";

/**
 * BackgroundElement component displays an SVG background element with the specified color.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.color - The color to apply to the SVG background.
 * @param {number} props.elementWidth - The width of the container element, used for dynamic sizing.
 * @returns {JSX.Element} The rendered background element with the SVG.
 */
const BackgroundElement = ({ color, elementWidth }) => (
	<div
		className="absolute z-10"
		style={{
			top: calcFontSize(elementWidth, -1.125), // Dynamic positioning based on container width.
			right: calcFontSize(elementWidth, 2.5), // Dynamic positioning based on container width.
		}}
	>
		<svg
			width="101"
			height="67"
			viewBox="0 0 101 67"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				width: calcFontSize(elementWidth, 6.313), // Dynamic width based on container width.
				height: calcFontSize(elementWidth, 4.188), // Dynamic height based on container width.
			}}
		>
			<path
				d="M7.97009 5.17103C8.33627 6.57648 8.79864 7.95467 9.32718 9.30739C10.5043 12.3201 12.8763 22.4856 5.07028 34.2892C-11.7348 59.7019 16.7737 77.7983 38.9805 57.3928C61.187 36.9874 64.1879 36.0856 84.8941 28.8838C105.6 21.6819 111.013 -12.089 64.7881 -31.7344C41.5175 -41.6235 -0.926272 -28.9762 7.97009 5.17103Z"
				fill={color} // SVG fill color based on the color prop.
			/>
		</svg>
	</div>
);

BackgroundElement.propTypes = {
	color: PropTypes.string.isRequired, // Color to apply to the SVG path.
	elementWidth: PropTypes.number.isRequired, // Width of the container element for dynamic sizing.
};

export default BackgroundElement;
