import { useState, type JSX } from 'react';

import { Range } from 'react-range';

import type { RangeSliderInputProps } from '@/types';

/**
 * RangeSliderInput component allows users to select a range of values with custom styling.
 * Includes accessible tooltips and proper ARIA attributes.
 *
 * @component
 * @param props - The component props
 * @returns The rendered range slider component
 */
const RangeSliderInput = ({
  min,
  max,
  step,
  value,
  setValue,
  ariaLabel,
  ariaValueText,
}: RangeSliderInputProps): JSX.Element => {
  const [values, setValues] = useState([value]);

  /**
   * Formats a numeric value to a string with up to three decimal places.
   *
   * @param value - The numeric value to format
   * @returns The formatted value as a string
   */
  const formatValue = (value: number): string => {
    return Number(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 });
  };

  /**
   * Generates accessible text for the current value.
   *
   * @param val - The current slider value
   * @returns The formatted text for screen readers
   */
  const getAriaValueText = (val: number): string => {
    if (ariaValueText) {
      return ariaValueText(val);
    }
    return `Value: ${formatValue(val)}`;
  };

  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={(newValues) => {
        setValues(newValues);
        setValue(newValues[0]);
      }}
      renderTrack={({ props: trackProps, children }) => (
        <div className="flex h-6 w-full">
          <div {...trackProps} className="h-1 w-full self-center rounded-full bg-stone-200" aria-hidden="true">
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props: thumbProps, isDragged }) => {
        const { key: thumbKey, ...restThumbProps } = thumbProps;
        return (
          <div
            key={thumbKey}
            {...restThumbProps}
            className={`bg-primary-600 flex h-6 w-6 items-center justify-center rounded-full outline-hidden ${isDragged ? 'ring-primary-200 ring-4' : ''}`}
            aria-label={ariaLabel || 'Adjust value'}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={values[0]}
            aria-valuetext={getAriaValueText(values[0])}
            role="slider"
          >
            <div
              className={`absolute -top-9 flex items-center justify-center rounded-md bg-slate-900 px-3 py-1 text-xs text-white outline-hidden ${!isDragged ? 'hidden' : ''}`}
              role="tooltip"
              aria-live="polite"
              aria-hidden={!isDragged}
            >
              {formatValue(values[0])}
              <div className="absolute -bottom-[6px] left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-8 border-r-8 border-l-8 border-t-slate-900 border-r-transparent border-l-transparent"></div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default RangeSliderInput;
