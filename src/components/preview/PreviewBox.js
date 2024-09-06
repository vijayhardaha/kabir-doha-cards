import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";

import BackgroundElement from "./BackgroundElement";
import CoupletContent from "./CoupletContent";
import SideAuthor from "./SideAuthor";
import RandomButton from "../options/RandomButton";

/**
 * PreviewBox component displays a formatted preview of a Kabir Doha card.
 * It dynamically adjusts the font size and layout based on the container width.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.color - The selected color for the preview elements.
 * @param {string} props.couplet - The text of the couplet to display.
 * @param {function(string): void} props.setCouplet - Function to update the Doha.
 * @param {number} props.fontSize - The current font size for the couplet text.
 * @param {number} props.lineHeight - The current line height for the couplet text.
 * @returns {JSX.Element} The rendered preview box.
 */
const PreviewBox = ({ color, couplet, setCouplet, fontSize, lineHeight }) => {
	const [elementWidth, setElementWidth] = useState(600);
	const elementRef = useRef(null);

	useEffect(() => {
		/**
		 * Handles resizing of the element to update the width.
		 */
		const handleResize = () => {
			if (elementRef.current) {
				setElementWidth(elementRef.current.offsetWidth);
			}
		};

		handleResize(); // Set initial width
		window.addEventListener("resize", handleResize); // Attach resize event listener

		return () => {
			window.removeEventListener("resize", handleResize); // Cleanup the event listener
		};
	}, []);

	return (
		<>
			<div
				className="relative h-full w-full max-w-[600px] mx-auto border-2 border-dashed border-stone-100"
				ref={elementRef}
			>
				<div className="absolute z-20 bottom-3 right-3 md:hidden">
					<RandomButton setCouplet={setCouplet} />
				</div>

				<div className="relative z-10 w-full aspect-square">
					<div id="doha-preview" className="absolute inset-0 w-full h-full bg-white overflow-hidden">
						{/* Background element */}
						<BackgroundElement color={color} elementWidth={elementWidth} />

						{/* SideAuthor */}
						<SideAuthor color={color} elementWidth={elementWidth} />

						{/* Couplet content */}
						<CoupletContent
							couplet={couplet}
							color={color}
							elementWidth={elementWidth}
							fontSize={fontSize}
							lineHeight={lineHeight}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

PreviewBox.propTypes = {
	color: PropTypes.string.isRequired, // The selected color for the preview elements.
	couplet: PropTypes.string.isRequired, // The text of the couplet to display.
	setCouplet: PropTypes.func.isRequired, // Function to update the Doha.
	fontSize: PropTypes.number.isRequired, // The current font size for the couplet text.
	lineHeight: PropTypes.number.isRequired, // The current line height for the couplet text.
};

export default PreviewBox;
