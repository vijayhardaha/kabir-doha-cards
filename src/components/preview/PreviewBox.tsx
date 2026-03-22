import type { JSX } from 'react';

import RandomButton from '@/components/options/RandomButton';
import BackgroundElement from '@/components/preview/BackgroundElement';
import CoupletContent from '@/components/preview/CoupletContent';
import SideAuthor from '@/components/preview/SideAuthor';
import type { PreviewBoxProps } from '@/types';

/**
 * PreviewBox component displays a formatted preview of a Kabir Doha card.
 * It dynamically adjusts the font size and layout based on the container width.
 *
 * @component
 * @param props - The component props
 * @returns The rendered preview box
 */
const PreviewBox = ({ options, updateOptions }: PreviewBoxProps): JSX.Element => {
  return (
    <>
      <div className="preview-box__mobile-btn">
        <RandomButton options={options} updateOptions={updateOptions} />
      </div>

      <div
        id="doha-preview"
        className="preview-box"
        role="region"
        aria-label="Doha card presentation"
        aria-live="polite"
        aria-busy={options.loading}
      >
        <BackgroundElement />
        <SideAuthor />
        <CoupletContent couplet={options.couplet} />

        {options.loading && (
          <div className="preview-box__loading">
            <span className="sr-only">Loading new couplet...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewBox;
