import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";

import OptionsBox from "./options/OptionsBox";
import PreviewBox from "./preview/PreviewBox";
import { calcFontSize } from "@/utils/preview";

/**
 * MainContent component displays a preview of a random doha and an options panel.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<string>} props.couplets - Array of couplets as strings to choose from.
 * @returns {JSX.Element} The rendered component.
 */
const MainContent = ({ couplets }) => {
	const [color, setColor] = useState("#12b848");
	const [couplet, setCouplet] = useState("");
	const [fontSize, setFontSize] = useState(3);
	const [lineHeight, setLineHeight] = useState(4.5);

	const [elementWidth, setElementWidth] = useState(600);
	const elementRef = useRef(null);

	useEffect(() => {
		if (couplets.length > 0) {
			const randomIndex = Math.floor(Math.random() * couplets.length);
			setCouplet(couplets[randomIndex]);
		}
	}, [couplets]);

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

	/**
	 * Calculates font size based on a global element width and a multiplier.
	 *
	 * @param {number} rem - The multiplier to calculate the font size.
	 * @returns {string} - The calculated font size in pixels.
	 */
	const gs = (rem) => calcFontSize(elementWidth, rem);

	return (
		<main className="relative">
			<div
				className="relative h-full w-full max-w-[600px] mx-auto border-2 border-dashed border-stone-100"
				ref={elementRef}
			>
				<PreviewBox
					color={color}
					couplet={couplet}
					setCouplet={setCouplet}
					fontSize={fontSize}
					lineHeight={lineHeight}
					elementWidth={elementWidth}
				/>
			</div>

			<OptionsBox
				color={color}
				couplet={couplet}
				couplets={couplets}
				fontSize={fontSize}
				lineHeight={lineHeight}
				setColor={setColor}
				setCouplet={setCouplet}
				setFontSize={setFontSize}
				setLineHeight={setLineHeight}
			/>

			<style jsx global>{`
				:root {
					--kdc-color: ${color};

					--kdc-blob-t: ${gs(-6.5)};
					--kdc-blob-r: ${gs(-6.5)};
					--kdc-blob-w: ${gs(23.125)};
					--kdc-blob-h: ${gs(18.75)};

					--kdc-sideauth-block-pl: ${gs(4)};
					--kdc-sideauth-text-fs: ${gs(0.875)};
					--kdc-sideauth-text-lh: ${gs(1.25)};
					--kdc-sideauth-text-ls: ${gs(0.525)};
					--kdc-sideauth-text-to: ${gs(1.25)};
					--kdc-sideauth-line-w: ${gs(6.25)};
					--kdc-sideauth-line-mr: ${gs(3)};

					--kdc-couplet-content-p: 0 ${gs(1)} ${gs(1.125)} ${gs(7)};

					--kdc-couplet-text-fs: ${gs(fontSize)};
					--kdc-couplet-text-lh: ${gs(lineHeight)};

					--kdc-quote-block-ml: ${gs(-1.25)};
					--kdc-quote-block-mb: ${gs(1.5)};
					--kdc-quote-w: ${gs(7.5)};
					--kdc-quote-h: ${gs(7.5)};

					--kdc-author-sign-block-mt: ${gs(1.125)};
					--kdc-author-sign-text-fs: ${gs(1.5)};
					--kdc-author-sign-text-lh: ${gs(2)};
					--kdc-author-sign-underline-l: ${gs(5)};
					--kdc-author-sign-underline-w: ${gs(6.25)};
					--kdc-author-sign-underline-h: ${gs(0.563)};

					--kdc-website-info-mt: ${gs(1.25)};
					--kdc-website-info-fs: ${gs(0.75)};
					--kdc-website-info-lh: ${gs(1)};
				}
			`}</style>
		</main>
	);
};

MainContent.propTypes = {
	couplets: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainContent;
