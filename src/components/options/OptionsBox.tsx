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
const OptionsBox = ({
  couplets,
  color,
  setColor,
  couplet,
  setCouplet,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  loading,
  setLoading,
}: OptionsBoxProps): JSX.Element => {
  return (
    <div
      className="mt-8 flex flex-col gap-y-5 rounded-lg bg-white md:sticky md:bottom-4 md:z-999 md:flex-row md:items-center md:gap-4 md:border md:border-stone-100 md:px-6 md:py-3 md:shadow-xl"
      role="toolbar"
      aria-label="Doha customization options"
    >
      <div className="flex flex-col gap-y-5 md:flex-row md:items-center md:gap-2">
        <SearchInput setCouplet={setCouplet} couplets={couplets} />
        <ColorInput color={color} setColor={setColor} />
      </div>

      <div className="flex flex-col gap-y-5 md:flex-1 md:flex-row md:items-center md:gap-3">
        <div className="flex flex-1 items-center gap-3">
          <AiOutlineFontSize className="h-8 w-8 text-stone-700" aria-hidden="true" />
          <span className="sr-only" id="font-size-label">
            Adjust font size
          </span>
          <div className="mr-4 ml-2 w-full">
            <RangeSliderInput
              min={2}
              max={4}
              step={0.125}
              value={fontSize}
              setValue={setFontSize}
              ariaLabel="Adjust font size"
              ariaValueText={(val: number) => `Font size: ${val}`}
            />
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <AiOutlineLineHeight className="h-8 w-8 text-stone-700" aria-hidden="true" />
          <span className="sr-only" id="line-height-label">
            Adjust line height
          </span>
          <div className="mr-4 ml-2 w-full">
            <RangeSliderInput
              min={3}
              max={6}
              step={0.125}
              value={lineHeight}
              setValue={setLineHeight}
              ariaLabel="Adjust line height"
              ariaValueText={(val: number) => `Line height: ${val}`}
            />
          </div>
        </div>
      </div>

      <div
        className="mt-4 flex flex-row items-center justify-center gap-3 md:mt-0 md:gap-2"
        role="group"
        aria-label="Doha actions"
      >
        <DownloadButton />
        <CopyButton couplet={couplet} />

        <span className="hidden md:inline-flex">
          <RandomButton setCouplet={setCouplet} loading={loading} setLoading={setLoading} />
        </span>
      </div>
    </div>
  );
};

export default OptionsBox;
