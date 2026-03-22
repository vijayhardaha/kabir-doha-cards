import { useState, useRef, useEffect, type JSX } from 'react';

import { PICKER_COLORS } from '@/constants/colors';
import type { ColorInputProps } from '@/types';
import { cn } from '@/utils/classnames';

/**
 * Renders the color picker used to update the card accent color.
 *
 * @param {ColorInputProps} props - The component props.
 * @returns {JSX.Element} The rendered color picker.
 */
export default function ColorInput({
  options,
  updateOptions,
  screenReaderLabel = 'Choose a color',
}: ColorInputProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      // Close the popover when focus moves outside the picker container.
      if (colorPickerRef.current && !colorPickerRef?.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorClick = (selectedColor: string): void => {
    updateOptions({ color: selectedColor });
  };

  const toggleColorPicker = (): void => {
    setIsOpen(!isOpen);
  };

  // Chunk the flat palette into rows so the dropdown layout stays consistent.
  const groupedColors: (typeof PICKER_COLORS)[number][][] = PICKER_COLORS.reduce(
    (acc, color, index) => {
      const rowIndex = Math.floor(index / 6);
      if (!acc[rowIndex]) acc[rowIndex] = [];
      acc[rowIndex].push(color);
      return acc;
    },
    [] as (typeof PICKER_COLORS)[number][][]
  );

  return (
    <div className="color-input" ref={colorPickerRef}>
      <div className="color-input__wrapper">
        <span id="colorInputLabel" className="sr-only">
          {screenReaderLabel}
        </span>
        <input
          type="text"
          value={options.color}
          readOnly
          onClick={toggleColorPicker}
          className="color-input__field"
          aria-label={screenReaderLabel}
        />
        <button
          type="button"
          onClick={toggleColorPicker}
          className="color-input__trigger"
          aria-label={`Selected color: ${options.color}. Click to ${isOpen ? 'close' : 'open'} color picker`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          style={{ background: options.color }}
        ></button>
      </div>
      {isOpen && (
        <div className="color-input__dropdown" role="listbox" id="color-picker-options" aria-label="Color options">
          {groupedColors.map((row, rowIndex) => (
            <div key={rowIndex} className="color-input__dropdown-row">
              {row.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => handleColorClick(colorOption)}
                  className={cn('color-input__color', {
                    'color-input__color--selected': colorOption === options.color,
                  })}
                  style={{ backgroundColor: colorOption, '--ring-color': colorOption } as React.CSSProperties}
                  aria-label={`${colorOption} color`}
                  aria-selected={colorOption === options.color}
                  role="option"
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
