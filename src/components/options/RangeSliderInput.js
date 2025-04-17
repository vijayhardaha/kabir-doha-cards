/* eslint-disable react/prop-types */
import React, { useState } from "react";

import PropTypes from "prop-types";
import { Range } from "react-range";

/**
 * RangeSliderInput component allows users to select a range of values with custom styling.
 * Includes accessible tooltips and proper ARIA attributes.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.min - The minimum value of the range.
 * @param {number} props.max - The maximum value of the range.
 * @param {number} props.step - The step value of the range.
 * @param {number} props.value - The initial value of the range slider.
 * @param {function(number): void} props.setValue - Callback function triggered when the slider value changes.
 * @param {string} [props.ariaLabel] - Accessible label for the slider (optional).
 * @param {string} [props.ariaValueText] - Function to generate accessible text for current value (optional).
 * @returns {JSX.Element} The rendered range slider component.
 */
const RangeSliderInput = ({ min, max, step, value, setValue, ariaLabel, ariaValueText, ...props }) => {
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

  /**
   * Generates accessible text for the current value
   * @param {number} val - The current slider value
   * @returns {string} - The formatted text for screen readers
   */
  const getAriaValueText = (val) => {
    if (ariaValueText) return ariaValueText(val);
    return `Value: ${formatValue(val)}`;
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
          <div
            ref={props.ref}
            {...props}
            className="h-1 w-full self-center rounded-full bg-stone-200"
            aria-hidden="true"
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          key={props.key}
          className={`bg-primary-600 flex h-6 w-6 items-center justify-center rounded-full outline-hidden ${isDragged ? "ring-primary-200 ring-4" : ""}`}
          aria-label={ariaLabel || "Adjust value"}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={values[0]}
          aria-valuetext={getAriaValueText(values[0])}
          role="slider"
        >
          {/* Tooltip */}
          <div
            className={`absolute -top-9 flex items-center justify-center rounded-md bg-slate-900 px-3 py-1 text-xs text-white outline-hidden ${!isDragged ? "hidden" : ""}`}
            role="tooltip"
            aria-live="polite"
            aria-hidden={!isDragged}
          >
            {formatValue(values[0])}
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-[6px] left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-8 border-r-8 border-l-8 border-t-slate-900 border-r-transparent border-l-transparent"></div>
          </div>
        </div>
      )}
    />
  );
};

RangeSliderInput.propTypes = {
  min: PropTypes.number.isRequired, // Minimum value for the range
  max: PropTypes.number.isRequired, // Maximum value for the range
  step: PropTypes.number.isRequired, // Step value for the range
  value: PropTypes.number.isRequired, // Initial value for the slider
  setValue: PropTypes.func.isRequired, // Callback to update the slider value
  ariaLabel: PropTypes.string, // Accessible label for the slider
  ariaValueText: PropTypes.func, // Function to generate accessible text for current value
};

export default RangeSliderInput;
