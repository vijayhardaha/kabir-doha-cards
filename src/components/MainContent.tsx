'use client';

import { useState, useEffect, useRef } from 'react';

import { PiSpinnerGapLight } from 'react-icons/pi';

import OptionsBox from '@/components/options/OptionsBox';
import PreviewBox from '@/components/preview/PreviewBox';
import { calcFontSize } from '@/utils/preview';

type Couplet = string;

/**
 * MainContent component displays a preview of a random doha and an options panel.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<string>} props.couplets - Array of couplets as strings to choose from.
 * @returns {JSX.Element} The rendered component.
 */
const MainContent = ({ couplets }: { couplets: Couplet[] }) => {
  const [color, setColor] = useState('#12b848');
  // Use lazy initialization to pick random couplet only on initial mount.
  // The function runs only once, avoiding the impure function issue.
  // Since couplets is a static prop from server-side data, this runs once and never again.
  const [couplet, setCouplet] = useState(() => {
    if (couplets.length > 0) {
      const randomIndex = Math.floor(Math.random() * couplets.length);
      return couplets[randomIndex];
    }
    return '';
  });
  const [fontSize, setFontSize] = useState(3);
  const [lineHeight, setLineHeight] = useState(4.875);
  const [elementWidth, setElementWidth] = useState(700);
  // Loading is initially false because lazy initialization makes couplet available immediately.
  // Loading state is still needed for async operations like search.
  const [loading, setLoading] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Resize handler to update the element width on window resize.
  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        setElementWidth(elementRef.current.offsetWidth);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount.
      elementRef.current = null; // Clear ref on unmount to prevent memory leaks.
    };
  }, []);

  /**
   * Calculates font size based on a global element width and a multiplier.
   *
   * @param {number} rem - The multiplier to calculate the font size.
   * @returns {string} - The calculated font size in pixels.
   */
  const gs = (rem: number): string => calcFontSize(elementWidth, rem);

  return (
    <>
      <style jsx global>{`
        :root {
          --kdc-color: ${color};

          --kdc-blob-t: ${gs(-6.5)};
          --kdc-blob-r: ${gs(-6.5)};
          --kdc-blob-w: ${gs(23.125)};
          --kdc-blob-h: ${gs(18.75)};

          --kdc-sideauth-block-pl: ${gs(4)};
          --kdc-sideauth-text-fs: ${gs(0.875)};
          --kdc-sideauth-text-lh: ${gs(1.25)};
          --kdc-sideauth-text-ls: ${gs(0.525)};
          --kdc-sideauth-text-to: ${gs(1.25)};
          --kdc-sideauth-line-w: ${gs(6.25)};
          --kdc-sideauth-line-mr: ${gs(3)};

          --kdc-couplet-content-p: 0 ${gs(1)} ${gs(1.125)} ${gs(7)};

          --kdc-couplet-text-fs: ${gs(fontSize)};
          --kdc-couplet-text-lh: ${gs(lineHeight)};

          --kdc-quote-block-ml: ${gs(-1.25)};
          --kdc-quote-block-mb: ${gs(1.5)};
          --kdc-quote-w: ${gs(7.5)};
          --kdc-quote-h: ${gs(7.5)};

          --kdc-author-sign-block-mt: ${gs(1.125)};
          --kdc-author-sign-text-fs: ${gs(1.5)};
          --kdc-author-sign-text-lh: ${gs(2)};
          --kdc-author-sign-underline-l: ${gs(5)};
          --kdc-author-sign-underline-w: ${gs(6.25)};
          --kdc-author-sign-underline-h: ${gs(0.563)};

          --kdc-website-info-mt: ${gs(1.25)};
          --kdc-website-info-fs: ${gs(0.75)};
          --kdc-website-info-lh: ${gs(1)};
        }
      `}</style>
      <main className="relative" aria-label="Kabir Doha Card Generator">
        <div
          className="relative mx-auto aspect-square h-full w-full max-w-[700px] border-2 border-dashed border-stone-100"
          ref={elementRef}
          aria-live="polite"
          aria-busy={loading}
        >
          {loading ? (
            <div className="bg-opacity-75 absolute inset-0 flex items-center justify-center bg-white">
              <span className="sr-only">Loading couplet content, please wait</span>
              <PiSpinnerGapLight aria-hidden="true" className="animate-spin text-4xl text-gray-500" />
            </div>
          ) : (
            <PreviewBox
              couplet={couplet}
              setCouplet={setCouplet}
              loading={loading}
              setLoading={setLoading}
              aria-label="Doha preview card"
            />
          )}
        </div>

        <OptionsBox
          color={color}
          couplet={couplet}
          couplets={couplets}
          fontSize={fontSize}
          lineHeight={lineHeight}
          setColor={setColor}
          setCouplet={setCouplet}
          setFontSize={setFontSize}
          setLineHeight={setLineHeight}
          loading={loading}
          setLoading={setLoading}
          aria-label="Doha customization options"
        />
      </main>
    </>
  );
};

export default MainContent;
