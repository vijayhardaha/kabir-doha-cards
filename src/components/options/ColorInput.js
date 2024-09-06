import React, { useState, useRef, useEffect } from "react";

import PropTypes from "prop-types";

import { PICKER_COLORS } from "@/constants/colors";

/**
 * ColorInput component that displays a color picker and allows the user to select a color.
 *
 * @component
 * @param {Object} props
 * @param {string} props.color - The currently selected color.
 * @param {function(string): void} props.setColor - Function to call when a color is selected.
 * @returns {JSX.Element}
 */
const ColorInput = ({ color, setColor }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(color);
	const colorPickerRef = useRef(null);

	useEffect(() => {
		/**
		 * Handles clicks outside the color picker to close it if the click is outside the color picker element.
		 * @param {MouseEvent} event - The mouse event triggered by the user clicking.
		 */
		const handleClickOutside = (event) => {
			if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	/**
	 * Handles the event when a color is clicked.
	 * Sets the selected color and updates the color state.
	 * @param {string} color - The color that was clicked.
	 */
	const handleColorClick = (color) => {
		setColor(color);
		setSelectedColor(color);
	};

	/**
	 * Retrieves an array of color keys from the `PICKER_COLORS` object.
	 * This array contains the names of all available colors for the color picker.
	 *
	 * @type {Array<string>}
	 */
	const colors = Object.keys(PICKER_COLORS);

	/**
	 * Groups colors into rows, each containing up to 8 colors.
	 * This helps in organizing the color picker display in a grid format.
	 * @type {Array<Array<string>>} - An array of rows, where each row is an array of color strings.
	 */
	const groupedColors = colors.reduce((acc, color, index) => {
		const rowIndex = Math.floor(index / 6);
		if (!acc[rowIndex]) acc[rowIndex] = [];
		acc[rowIndex].push(color);
		return acc;
	}, []);

	return (
		<div className="relative" ref={colorPickerRef}>
			<div className="relative">
				<input
					type="text"
					value={selectedColor}
					readOnly
					onClick={() => setIsOpen(!isOpen)}
					className="w-full md:w-44 h-10 py-2 px-4 text-base text-gray-800 border-2 border-gray-100 bg-gray-100 rounded-lg cursor-pointer outline-none focus:border-primary focus:ring-4 focus:ring-green-100 transition-all duration-300 ease-in-out"
					aria-label="Selected color"
				/>
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`absolute top-1/2 right-2 h-8 w-8 ${PICKER_COLORS[color].bg} border-2 border-white rounded-lg transform -translate-y-1/2`}
					aria-label="Open color picker"
				></button>
			</div>
			{isOpen && (
				<div className="absolute top-full left-0 z-50 bg-white rounded-md shadow-lg px-4 py-3 pb-1">
					{groupedColors.map((row, rowIndex) => (
						<div key={rowIndex} className="flex flex-row gap-2 mb-2">
							{row.map((color) => (
								<button
									key={color}
									type="button"
									onClick={() => handleColorClick(color)}
									className={`w-8 h-8 rounded-md transition-all duration-300 ease-in-out ${color === selectedColor ? `ring-2 ${PICKER_COLORS[color].ring} ring-opacity-50 ring-offset-2` : ""}`}
									style={{ backgroundColor: color }}
									aria-label={`Select color ${color}`}
								/>
							))}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

ColorInput.propTypes = {
	color: PropTypes.string.isRequired, // The currently selected color.
	setColor: PropTypes.func.isRequired, // Function to call when a color is selected.
};

export default ColorInput;
