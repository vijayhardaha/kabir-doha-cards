import { useState, useRef, useEffect, type JSX } from 'react';

import { PICKER_COLORS } from '@/constants/colors';
import type { ColorInputProps } from '@/types';

/**
 * ColorInput component that displays a color picker with a dropdown color palette.
 * Provides keyboard and screen reader support.
 *
 * @component
 * @param props - Component props
 * @returns The rendered color picker component
 */
const ColorInput = ({ color, setColor, screenReaderLabel = 'Choose a color' }: ColorInputProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (colorPickerRef.current && !colorPickerRef?.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Handles the event when a color is clicked or selected.
   *
   * @param selectedColor - The color code that was selected
   */
  const handleColorClick = (selectedColor: string): void => {
    setColor(selectedColor);
    setSelectedColor(selectedColor);
    setIsOpen(false);
  };

  /**
   * Toggles the color picker dropdown state.
   */
  const toggleColorPicker = (): void => {
    setIsOpen(!isOpen);
  };

  const colors: string[] = Object.keys(PICKER_COLORS);

  /**
   * Groups colors into rows, each containing up to 6 colors.
   *
   * @type {string[][]}
   */
  const groupedColors: string[][] = colors.reduce((acc: string[][], colorKey, index) => {
    const rowIndex = Math.floor(index / 6);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(colorKey);
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
          className={`absolute top-1/2 right-2 h-8 w-8 ${PICKER_COLORS[color as keyof typeof PICKER_COLORS].bg} -translate-y-1/2 transform rounded-lg border-2 border-white`}
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
                  className={`h-8 w-8 rounded-md transition-all duration-300 ease-in-out ${colorOption === selectedColor ? `ring-2 ${PICKER_COLORS[colorOption as keyof typeof PICKER_COLORS].ring} ring-opacity-50 ring-offset-2` : ''}`}
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

export default ColorInput;
