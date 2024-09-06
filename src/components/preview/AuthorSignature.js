import React from "react";

import PropTypes from "prop-types";

import { calcFontSize } from "@/utils/preview";

/**
 * AuthorSignature component displays the author's signature with dynamic font sizing.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.author - The name of the author.
 *  * @param {string} props.color - The color of the underline.
 * @param {number} props.elementWidth - The width of the container element.
 * @returns {JSX.Element} The rendered author signature.
 */
const AuthorSignature = ({ author, color, elementWidth }) => (
	<p
		className="relative"
		style={{
			marginTop: calcFontSize(elementWidth, 1.125), // Dynamic margin top based on container width.
		}}
	>
		<span
			className="text-2xl font-semibold"
			style={{
				fontSize: calcFontSize(elementWidth, 1.5), // Dynamic font size based on container width.
				lineHeight: calcFontSize(elementWidth, 2), // Dynamic line height based on container width.
			}}
		>
			&mdash; {author} {/* Author's signature with em dash */}
		</span>
		<span
			className="relative left-20"
			style={{
				left: calcFontSize(elementWidth, 5),
			}}
		>
			<svg
				width="100"
				height="9"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					width: calcFontSize(elementWidth, 6.25),
					height: calcFontSize(elementWidth, 0.563),
				}}
			>
				<path
					d="M99.597 5.09c-.778-.408-1.415-1.01-6.026-1.78-1.578-.256-3.152-.533-4.73-.779C77.056.975 76.03 1.033 67.336.376 62.678.098 58.009.078 53.346 0c-3.289-.008-6.578.11-9.866.176-17.704.78-11.543.366-23.88 1.457-5.314.717-10.617 1.541-15.928 2.294-.792.17-1.596.295-2.377.51-.865.24-.897.231-1.02.344-.564.407-.21 1.42.614 1.234 2.397-.668 2.277-.604 12.557-2.092.3.316.514.239 1.3.22.93-.023 1.86-.038 2.79-.08 3.773-.268 7.537-.678 11.308-.983 1.298-.092 2.595-.22 3.894-.332 1.636-.081 3.274-.161 4.912-.24 8.482-.152 6.026-.22 16.547-.107 1.652.07.111-.012 8.866.487 6.814.626 14.17 1.97 20.834 3.252 2.882.558 8.228 1.637 11.023 2.594.269.074.584-.019.742-.252.223-.263.187-.684-.056-.926-.229-.22-.574-.243-.858-.358-1.262-.413-3.117-.853-4.49-1.168l1.844.231c1.624.22 3.264.276 4.89.476.762.068 2.305.244 2.6-.436.095-.222.101-.524-.092-.698z"
					fill={color}
				/>
			</svg>
		</span>
	</p>
);

AuthorSignature.propTypes = {
	author: PropTypes.string.isRequired, // Author's name to be displayed.
	color: PropTypes.string.isRequired, // Color of the underline graphic.
	elementWidth: PropTypes.number.isRequired, // Width of the container element for dynamic styling.
};

export default AuthorSignature;
