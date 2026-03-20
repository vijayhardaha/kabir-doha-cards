import type { JSX } from 'react';

import { PiSpinnerGapLight } from 'react-icons/pi';

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
      <div className="absolute right-3 bottom-3 z-20 md:hidden">
        <RandomButton options={options} updateOptions={updateOptions} />
      </div>

      <div
        id="doha-preview"
        className="relative z-10 aspect-square w-full overflow-hidden bg-white"
        role="region"
        aria-label="Doha card presentation"
        aria-live="polite"
        aria-busy={options.loading}
      >
        <BackgroundElement />
        <SideAuthor />
        <CoupletContent couplet={options.couplet} />

        {options.loading && (
          <div className="absolute inset-0 z-30 flex items-end justify-end bg-white/50 p-6">
            <span className="sr-only">Loading new couplet...</span>
            <PiSpinnerGapLight aria-hidden="true" className="animate-spin text-4xl text-gray-500" />
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewBox;
