import React from "react";

import { Montserrat } from "next/font/google";
import PropTypes from "prop-types";

import { PICKER_COLORS } from "@/constants/colors";
import { calcFontSize } from "@/utils/preview";

const montserrat = Montserrat({ weight: ["400", "500"], subsets: ["latin"] });

/**
 * SideAuthor component displays the title text "Kabir Ke Dohe" with a rotated style.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.color - The color for the title text, selected from predefined color options.
 * @param {number} props.elementWidth - The width of the container element used to calculate responsive styles.
 * @returns {JSX.Element} The rendered side author title component.
 */
const SideAuthor = ({ color, elementWidth }) => (
	<div
		className="absolute bottom-0 z-[11]"
		style={{
			paddingLeft: calcFontSize(elementWidth, 4),
		}}
	>
		<p
			className={`relative uppercase ${montserrat.className} ${PICKER_COLORS[color].text} flex items-center rotate-[-90deg]`}
			style={{
				fontSize: calcFontSize(elementWidth, 0.875),
				letterSpacing: calcFontSize(elementWidth, 0.525),
				lineHeight: calcFontSize(elementWidth, 1.25),
				transformOrigin: `0 ${calcFontSize(elementWidth, 1.25)}`,
			}}
		>
			<span
				className="relative block bg-current h-[2px]"
				style={{
					width: calcFontSize(elementWidth, 6.25),
					marginRight: calcFontSize(elementWidth, 3),
				}}
			/>
			<span className="font-medium">Kabir Ke Dohe</span>
		</p>
	</div>
);

SideAuthor.propTypes = {
	color: PropTypes.string.isRequired, // The color for the title text.
	elementWidth: PropTypes.number.isRequired, // The width of the container element.
};

export default SideAuthor;
