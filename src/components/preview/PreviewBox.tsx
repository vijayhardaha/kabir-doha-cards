import type { JSX } from 'react';

import BackgroundElement from '@/components/preview/BackgroundElement';
import CoupletContent from '@/components/preview/CoupletContent';
import SideAuthor from '@/components/preview/SideAuthor';
import type { PreviewBoxProps } from '@/types';

/**
 * Renders the live preview for the current doha card settings.
 *
 * @param {PreviewBoxProps} props - The component props.
 * @returns {JSX.Element} The rendered preview box.
 */
export default function PreviewBox({ options }: PreviewBoxProps): JSX.Element {
  return (
    <>
      <div
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
}
