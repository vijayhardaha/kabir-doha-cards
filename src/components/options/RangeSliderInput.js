/* eslint-disable react/prop-types */
import React, { useState } from "react";

import PropTypes from "prop-types";
import { Range } from "react-range";

/**
 * RangeSliderInput component allows users to select a range of values with custom styling.
 *
 * @component
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {number} step - The step value of the range.
 * @param {number} value - The initial value of the range slider.
 * @param {function(number): void} setValue - Callback function triggered when the slider value changes.
 * @returns {JSX.Element} The rendered range slider component.
 */
const RangeSliderInput = ({ min, max, step, value, setValue, ...props }) => {
	const [values, setValues] = useState([value]);

	/**
	 * Formats a numeric value to a string with up to three decimal places, avoiding unnecessary trailing zeros.
	 *
	 * @param {number} value - The numeric value to format.
	 * @returns {string} The formatted value as a string.
	 */
	const formatValue = (value) => {
		return Number(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 });
	};

	return (
		<Range
			{...props}
			step={step}
			min={min}
			max={max}
			values={values}
			onChange={(values) => {
				setValues(values);
				setValue(values[0]);
			}}
			renderTrack={({ props, children }) => (
				<div className="flex h-6 w-full">
					<div ref={props.ref} className="h-1 w-full self-center rounded-full bg-stone-200">
						{children}
					</div>
				</div>
			)}
			renderThumb={({ props, isDragged }) => (
				<div
					{...props}
					key={props.key}
					className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary outline-none ${isDragged ? "ring-4 ring-primary ring-opacity-70 ring-offset-2 ring-offset-white" : ""}`}
				>
					{/* Tooltip */}
					<div
						className={`absolute -top-9 flex items-center justify-center rounded-md bg-slate-900 px-3 py-1 text-xs text-white outline-none ${!isDragged ? "hidden" : ""}`}
						role="tooltip"
						aria-live="polite"
					>
						{formatValue(values[0])}
						{/* Tooltip Arrow */}
						<div className="absolute -bottom-[6px] left-1/2 h-0 w-0 -translate-x-1/2 transform border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-900"></div>
					</div>
				</div>
			)}
		/>
	);
};

RangeSliderInput.propTypes = {
	min: PropTypes.number.isRequired, // Minimum value for the range.
	max: PropTypes.number.isRequired, // Maximum value for the range.
	step: PropTypes.number.isRequired, // Step value for the range.
	value: PropTypes.number.isRequired, // Initial value for the slider.
	setValue: PropTypes.func.isRequired, // Callback to update the slider value.
};

export default RangeSliderInput;
