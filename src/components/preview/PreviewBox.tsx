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
const PreviewBox = ({ couplet, setCouplet, loading, setLoading, screenReaderText }: PreviewBoxProps): JSX.Element => {
  const srText = screenReaderText || 'Kabir Doha Preview Card';

  return (
    <>
      <div className="absolute right-3 bottom-3 z-20 md:hidden">
        <RandomButton setCouplet={setCouplet} loading={loading} setLoading={setLoading} />
      </div>

      <div className="relative z-10 aspect-square w-full" aria-label={srText}>
        <span className="sr-only">{srText}</span>
        <div
          id="doha-preview"
          className="absolute inset-0 h-full w-full overflow-hidden bg-white"
          role="region"
          aria-label="Doha card presentation"
        >
          <BackgroundElement />
          <SideAuthor />
          <CoupletContent couplet={couplet} />
        </div>
      </div>
    </>
  );
};

export default PreviewBox;
