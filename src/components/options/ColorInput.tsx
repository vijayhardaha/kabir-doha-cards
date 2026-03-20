import React, { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import { PICKER_COLORS } from '@/constants/colors';

/**
 * ColorInput component that displays a color picker and allows the user to select a color.
 * Provides a dropdown color palette for easy color selection with keyboard and screen reader support.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.color - The currently selected color value
 * @param {function(string): void} props.setColor - Callback function to update the selected color
 * @param {string} [props.screenReaderLabel="Choose a color"] - Accessible label for screen readers
 * @returns {JSX.Element} - Rendered color picker component
 */
const ColorInput = ({ color, setColor, screenReaderLabel = 'Choose a color' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    /**
     * Handles clicks outside the color picker to close it if the click is outside the color picker element.
     * Part of the accessibility and UX improvements for the component.
     *
     * @param {MouseEvent} event - The mouse event triggered by the user clicking
     * @returns {void}
     */
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Handles the event when a color is clicked or selected.
   * Sets the selected color and updates the parent component's color state.
   *
   * @param {string} color - The color code or name that was selected
   * @returns {void}
   */
  const handleColorClick = (color) => {
    setColor(color);
    setSelectedColor(color);
    setIsOpen(false); // Close the picker after selection for better UX
  };

  /**
   * Toggles the color picker dropdown state.
   *
   * @returns {void}
   */
  const toggleColorPicker = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Retrieves an array of color keys from the `PICKER_COLORS` object.
   * This array contains the names of all available colors for the color picker.
   *
   * @type {Array<string>}
   */
  const colors = Object.keys(PICKER_COLORS);

  /**
   * Groups colors into rows, each containing up to 6 colors.
   * This helps in organizing the color picker display in a grid format.
   *
   * @type {Array<Array<string>>} - An array of rows, where each row is an array of color strings
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
        <span id="colorInputLabel" className="sr-only">
          {screenReaderLabel}
        </span>
        <input
          type="text"
          value={selectedColor}
          readOnly
          onClick={toggleColorPicker}
          className="focus:border-primary-600 h-12 w-full cursor-pointer rounded-lg border-2 border-stone-100 bg-stone-100 px-4 py-2 text-base text-stone-800 outline-hidden transition-all duration-300 ease-in-out focus:ring-4 focus:ring-green-100 md:w-44"
          aria-label={screenReaderLabel}
        />
        <button
          type="button"
          onClick={toggleColorPicker}
          className={`absolute top-1/2 right-2 h-8 w-8 ${PICKER_COLORS[color].bg} -translate-y-1/2 transform rounded-lg border-2 border-white`}
          aria-label={`Selected color: ${color}. Click to ${isOpen ? 'close' : 'open'} color picker`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        ></button>
      </div>
      {isOpen && (
        <div
          className="absolute bottom-full left-0 z-50 mb-2 rounded-lg border border-stone-100 bg-white px-4 py-3 pb-1 shadow-lg"
          role="listbox"
          id="color-picker-options"
          aria-label="Color options"
        >
          {groupedColors.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-2 flex flex-row gap-2">
              {row.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => handleColorClick(colorOption)}
                  className={`h-8 w-8 rounded-md transition-all duration-300 ease-in-out ${colorOption === selectedColor ? `ring-2 ${PICKER_COLORS[colorOption].ring} ring-opacity-50 ring-offset-2` : ''}`}
                  style={{ backgroundColor: colorOption }}
                  aria-label={`${colorOption} color`}
                  aria-selected={colorOption === selectedColor}
                  role="option"
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
  color: PropTypes.string.isRequired, // The currently selected color
  setColor: PropTypes.func.isRequired, // Function to call when a color is selected
  screenReaderLabel: PropTypes.string, // Accessible label for screen readers
};

export default ColorInput;
