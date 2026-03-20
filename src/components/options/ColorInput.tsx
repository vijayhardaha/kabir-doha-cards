import { useState, useRef, useEffect, type JSX } from 'react';

import { PICKER_COLORS } from '@/constants/colors';
import type { ColorInputProps } from '@/types';
import { cn } from '@/utils/classnames';

/**
 * ColorInput component that displays a color picker with a dropdown color palette.
 * Provides keyboard and screen reader support.
 *
 * @component
 * @param props - Component props
 * @returns The rendered color picker component
 */
const ColorInput = ({ options, updateOptions, screenReaderLabel = 'Choose a color' }: ColorInputProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleColorClick = (selectedColor: string): void => {
    updateOptions({ color: selectedColor });
    setIsOpen(false);
  };

  const toggleColorPicker = (): void => {
    setIsOpen(!isOpen);
  };

  const colors: string[] = Object.keys(PICKER_COLORS);

  const groupedColors: string[][] = colors.reduce((acc: string[][], colorKey, index) => {
    const rowIndex = Math.floor(index / 6);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(colorKey);
    return acc;
  }, []);

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
          className={cn('color-input__trigger', PICKER_COLORS[options.color as keyof typeof PICKER_COLORS]?.bg ?? '')}
          aria-label={`Selected color: ${options.color}. Click to ${isOpen ? 'close' : 'open'} color picker`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
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
                    [PICKER_COLORS[colorOption as keyof typeof PICKER_COLORS]?.ring ?? '']:
                      colorOption === options.color,
                  })}
                  style={{ backgroundColor: colorOption }}
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
};

export default ColorInput;
