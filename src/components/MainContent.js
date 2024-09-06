import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import OptionsBox from "./options/OptionsBox";
import PreviewBox from "./preview/PreviewBox";

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

	useEffect(() => {
		if (couplets.length > 0) {
			const randomIndex = Math.floor(Math.random() * couplets.length);
			setCouplet(couplets[randomIndex]);
		}
	}, [couplets]);

	return (
		<main className="relative">
			<PreviewBox
				color={color}
				couplet={couplet}
				setCouplet={setCouplet}
				fontSize={fontSize}
				lineHeight={lineHeight}
			/>

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
		</main>
	);
};

MainContent.propTypes = {
	couplets: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainContent;
