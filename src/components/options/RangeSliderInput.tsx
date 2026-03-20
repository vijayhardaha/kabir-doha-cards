import { useState, type JSX } from 'react';

import { Range } from 'react-range';

import type { RangeSliderInputProps } from '@/types';

/**
 * RangeSliderInput component allows users to select a range of values with custom styling.
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

  const formatValue = (value: number): string => {
    return Number(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 });
  };

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
        <div className="range-slider__track">
          <div {...trackProps} className="range-slider__track-inner" aria-hidden="true">
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
            className={`range-slider__thumb ${isDragged ? 'range-slider__thumb--dragging' : ''}`}
            aria-label={ariaLabel || 'Adjust value'}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={values[0]}
            aria-valuetext={getAriaValueText(values[0])}
            role="slider"
          >
            <div
              className={`range-slider__tooltip ${!isDragged ? 'range-slider__tooltip--hidden' : ''}`}
              role="tooltip"
              aria-live="polite"
              aria-hidden={!isDragged}
            >
              {formatValue(values[0])}
              <div className="range-slider__tooltip-arrow"></div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default RangeSliderInput;
