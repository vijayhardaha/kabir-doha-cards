'use client';

import { useState, useEffect, useRef, useMemo, type JSX } from 'react';

import { PiSpinnerGapLight } from 'react-icons/pi';

import OptionsBox from '@/components/options/OptionsBox';
import PreviewBox from '@/components/preview/PreviewBox';
import type { CardOptions, Couplet, Setter } from '@/types';
import { calcFontSize } from '@/utils/preview';

const DEFAULT_OPTIONS: CardOptions = { color: '#12b848', couplet: '', fontSize: 3, lineHeight: 4.875, loading: false };

/**
 * MainContent component displays a preview of a random doha and an options panel.
 *
 * @component
 * @param props - Component props
 * @param props.couplets - Array of couplets as strings to choose from
 * @returns The rendered component
 */
const MainContent = ({ couplets }: { couplets: Couplet[] }): JSX.Element => {
  const [options, setOptions] = useState<CardOptions>(() => {
    if (couplets.length > 0) {
      const randomIndex = Math.floor(Math.random() * couplets.length);
      return { ...DEFAULT_OPTIONS, couplet: couplets[randomIndex] };
    }
    return DEFAULT_OPTIONS;
  });
  const [elementWidth, setElementWidth] = useState(700);
  const elementRef = useRef<HTMLDivElement>(null);

  const updateOptions: Setter<Partial<CardOptions>> = (update) => {
    setOptions((prev) => (typeof update === 'function' ? { ...prev, ...update(prev) } : { ...prev, ...update }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        setElementWidth(elementRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      elementRef.current = null;
    };
  }, []);

  const gs = useMemo(() => (rem: number) => calcFontSize(elementWidth, rem), [elementWidth]);

  return (
    <>
      <style jsx global>{`
        :root {
          --kdc-color: ${options.color};

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

          --kdc-couplet-text-fs: ${gs(options.fontSize)};
          --kdc-couplet-text-lh: ${gs(options.lineHeight)};

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
          aria-busy={options.loading}
        >
          {options.loading ? (
            <div className="bg-opacity-75 absolute inset-0 flex items-center justify-center bg-white">
              <span className="sr-only">Loading couplet content, please wait</span>
              <PiSpinnerGapLight aria-hidden="true" className="animate-spin text-4xl text-gray-500" />
            </div>
          ) : (
            <PreviewBox options={options} updateOptions={updateOptions} />
          )}
        </div>

        <OptionsBox options={options} updateOptions={updateOptions} couplets={couplets} />
      </main>
    </>
  );
};

export default MainContent;
