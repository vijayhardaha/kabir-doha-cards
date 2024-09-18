import React from "react";

import PropTypes from "prop-types";
import { AiOutlineFontSize, AiOutlineLineHeight } from "react-icons/ai";

import ColorInput from "./ColorInput";
import CopyButton from "./CopyButton";
import DownloadButton from "./DownloadButton";
import RandomButton from "./RandomButton";
import RangeSliderInput from "./RangeSliderInput";
import SearchInput from "./SearchInput";

/**
 * OptionsBox component renders the UI for color picker, Doha input, and action buttons.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.couplets - List of available Doha options.
 * @param {string} props.color - The currently selected background color.
 * @param {function(string): void} props.setColor - Function to update the selected color.
 * @param {string} props.couplet - The current Doha text.
 * @param {function(string): void} props.setCouplet - Function to update the Doha.
 * @param {number} props.fontSize - The current font size.
 * @param {function(number): void} props.setFontSize - Function to update the font size.
 * @param {number} props.lineHeight - The current line height.
 * @param {function(number): void} props.setLineHeight - Function to update the line height.
 * @returns {JSX.Element} The rendered component.
 */
const OptionsBox = ({
	couplets,
	color,
	setColor,
	couplet,
	setCouplet,
	fontSize,
	setFontSize,
	lineHeight,
	setLineHeight,
}) => {
	return (
		<div className="mt-8 flex flex-col gap-y-5 rounded-lg md:mt-12 md:flex-row md:items-center md:gap-4 md:border md:border-stone-100 md:px-6 md:py-3 md:shadow-xl">
			<div className="flex flex-col gap-y-5 md:flex-row md:items-center md:gap-2">
				<SearchInput setCouplet={setCouplet} couplets={couplets} className="w-full md:w-auto" />
				<ColorInput color={color} setColor={setColor} couplet={couplet} className="w-full md:w-auto" />
			</div>

			<div className="flex flex-col gap-y-5 md:flex-1 md:flex-row md:items-center md:gap-3">
				<div className="flex flex-1 items-center gap-3">
					<AiOutlineFontSize className="h-8 w-8 text-stone-700" />
					<div className="ml-2 mr-4 w-full">
						<RangeSliderInput min={2} max={4} step={0.125} value={fontSize} setValue={setFontSize} />
					</div>
				</div>
				<div className="flex flex-1 items-center gap-3">
					<AiOutlineLineHeight className="h-8 w-8 text-stone-700" />
					<div className="ml-2 mr-4 w-full">
						<RangeSliderInput min={3} max={6} step={0.125} value={lineHeight} setValue={setLineHeight} />
					</div>
				</div>
			</div>

			<div className="mt-4 flex flex-row items-center justify-center gap-3 md:mt-0 md:gap-2">
				<DownloadButton couplet={couplet} />
				<CopyButton couplet={couplet} />

				<span className="hidden md:inline-flex">
					<RandomButton setCouplet={setCouplet} />
				</span>
			</div>
		</div>
	);
};

OptionsBox.propTypes = {
	couplets: PropTypes.arrayOf(PropTypes.string).isRequired,
	color: PropTypes.string.isRequired,
	setColor: PropTypes.func.isRequired,
	couplet: PropTypes.string.isRequired,
	setCouplet: PropTypes.func.isRequired,
	fontSize: PropTypes.number.isRequired,
	setFontSize: PropTypes.func.isRequired,
	lineHeight: PropTypes.number.isRequired,
	setLineHeight: PropTypes.func.isRequired,
};

export default OptionsBox;
