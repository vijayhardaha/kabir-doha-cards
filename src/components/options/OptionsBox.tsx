import type { JSX } from 'react';

import { AiOutlineFontSize, AiOutlineLineHeight } from 'react-icons/ai';

import type { OptionsBoxProps } from '@/types';

import ColorInput from './ColorInput';
import CopyButton from './CopyButton';
import DownloadButton from './DownloadButton';
import RandomButton from './RandomButton';
import RangeSliderInput from './RangeSliderInput';
import SearchInput from './SearchInput';

/**
 * OptionsBox component renders the UI for color picker, Doha input, and action buttons.
 * It provides controls for customizing the appearance and content of the Doha display.
 *
 * @component
 * @param props - The component props
 * @returns The rendered options box component
 */
const OptionsBox = ({ options, updateOptions, couplets }: OptionsBoxProps): JSX.Element => {
  return (
    <div className="options-box" role="toolbar" aria-label="Doha customization options">
      <div className="options-box__row">
        <SearchInput updateOptions={updateOptions} couplets={couplets} />
        <ColorInput options={options} updateOptions={updateOptions} />
      </div>

      <div className="options-box__row options-box__row--expand">
        <div className="options-box__control">
          <AiOutlineFontSize className="options-box__control-label" aria-hidden="true" />
          <span className="sr-only" id="font-size-label">
            Adjust font size
          </span>
          <div className="options-box__control-slider">
            <RangeSliderInput
              min={2}
              max={4}
              step={0.125}
              value={options.fontSize}
              setValue={(val) => updateOptions({ fontSize: val })}
              ariaLabel="Adjust font size"
              ariaValueText={(val) => `Font size: ${val}`}
            />
          </div>
        </div>
        <div className="options-box__control">
          <AiOutlineLineHeight className="options-box__control-label" aria-hidden="true" />
          <span className="sr-only" id="line-height-label">
            Adjust line height
          </span>
          <div className="options-box__control-slider">
            <RangeSliderInput
              min={3}
              max={6}
              step={0.125}
              value={options.lineHeight}
              setValue={(val) => updateOptions({ lineHeight: val })}
              ariaLabel="Adjust line height"
              ariaValueText={(val) => `Line height: ${val}`}
            />
          </div>
        </div>
      </div>

      <div className="options-box__actions" role="group" aria-label="Doha actions">
        <DownloadButton />
        <CopyButton />

        <span className="options-box__random-wrapper">
          <RandomButton options={options} updateOptions={updateOptions} />
        </span>
      </div>
    </div>
  );
};

export default OptionsBox;
