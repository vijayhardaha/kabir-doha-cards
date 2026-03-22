import type { JSX } from 'react';

import type { OptionsBoxProps } from '@/types';

import ColorInput from './ColorInput';
import CopyButton from './CopyButton';
import DownloadButton from './DownloadButton';
import RandomButton from './RandomButton';
import SearchInput from './SearchInput';

/**
 * OptionsBox groups all card customization controls and action buttons.
 *
 * It renders the search input, color picker, and primary action controls
 * used to update and act on the currently selected doha card.
 *
 * @param {OptionsBoxProps} props - The options and handlers to pass to controls.
 * @returns {JSX.Element} The rendered options panel.
 */
const OptionsBox = ({ options, updateOptions, couplets }: OptionsBoxProps): JSX.Element => {
  return (
    <div className="options-box" role="toolbar" aria-label="Doha customization options">
      <div className="options-box__row">
        <SearchInput updateOptions={updateOptions} couplets={couplets} />
        <ColorInput options={options} updateOptions={updateOptions} />
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
