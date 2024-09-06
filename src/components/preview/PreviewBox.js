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
				className="relative h-full w-full max-w-[600px] mx-auto border-2 border-dashed border-gray-200"
				ref={elementRef}
			>
				<div className="absolute -bottom-8 left-2/4 -translate-x-2/4 z-50 md:hidden">
					<RandomButton setCouplet={setCouplet} />
				</div>
				<div className="relative w-full aspect-square">
					<div className="absolute inset-0 w-full h-full bg-white overflow-hidden">
						{/* Background element */}
						<BackgroundElement color={color} elementWidth={elementWidth} />

						{/* Couplet content */}
						<CoupletContent
							couplet={couplet}
							color={color}
							elementWidth={elementWidth}
							fontSize={fontSize}
							lineHeight={lineHeight}
						/>

						{/* SideAuthor */}
						<SideAuthor color={color} elementWidth={elementWidth} />
					</div>
				</div>
			</div>

			<div className="fixed -z-10 top-0 left-0 w-[600px] h-auto overflow-visible opacity-0">
				<div className="relative w-full aspect-square">
					<div id="doha-preview" className="absolute inset-0 w-full h-full bg-white overflow-hidden">
						{/* Background element */}
						<BackgroundElement color={color} elementWidth={600} />

						{/* Couplet content */}
						<CoupletContent
							couplet={couplet}
							color={color}
							elementWidth={600}
							fontSize={fontSize}
							lineHeight={lineHeight}
						/>

						{/* SideAuthor */}
						<SideAuthor color={color} elementWidth={600} />
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
