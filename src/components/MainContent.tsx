'use client';

import { useState, useEffect, useRef, useMemo, type JSX } from 'react';

import OptionsBox from '@/components/options/OptionsBox';
import PreviewBox from '@/components/preview/PreviewBox';
import { DEFAULT_CARD_OPTIONS } from '@/constants/card';
import type { CardOptions, Couplet, Setter } from '@/types';
import { calcFontSize } from '@/utils/preview';

interface MainContentProps {
  initialCouplets: Couplet[];
  initialCouplet?: string;
}

const MainContent = ({ initialCouplets, initialCouplet }: MainContentProps): JSX.Element => {
  const [options, setOptions] = useState<CardOptions>({
    ...DEFAULT_CARD_OPTIONS,
    couplet: initialCouplet || initialCouplets[0] || '',
  });
  const [elementWidth, setElementWidth] = useState(600);
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

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--kdc-color', options.color);
    root.style.setProperty('--kdc-blob-t', gs(-6.5));
    root.style.setProperty('--kdc-blob-r', gs(-6.5));
    root.style.setProperty('--kdc-blob-w', gs(23.125));
    root.style.setProperty('--kdc-blob-h', gs(18.75));
    root.style.setProperty('--kdc-sideauth-block-pl', gs(4));
    root.style.setProperty('--kdc-sideauth-text-fs', gs(0.875));
    root.style.setProperty('--kdc-sideauth-text-lh', gs(1.25));
    root.style.setProperty('--kdc-sideauth-text-ls', gs(0.525));
    root.style.setProperty('--kdc-sideauth-text-to', gs(1.25));
    root.style.setProperty('--kdc-sideauth-line-w', gs(6.25));
    root.style.setProperty('--kdc-sideauth-line-mr', gs(3));
    root.style.setProperty('--kdc-couplet-content-p', `0 ${gs(1)} ${gs(1.125)} ${gs(7)}`);
    root.style.setProperty('--kdc-couplet-text-fs', gs(options.fontSize));
    root.style.setProperty('--kdc-couplet-text-lh', gs(options.lineHeight));
    root.style.setProperty('--kdc-quote-block-ml', gs(-1.25));
    root.style.setProperty('--kdc-quote-block-mb', gs(1.5));
    root.style.setProperty('--kdc-quote-w', gs(7.5));
    root.style.setProperty('--kdc-quote-h', gs(7.5));
    root.style.setProperty('--kdc-author-sign-block-mt', gs(1.125));
    root.style.setProperty('--kdc-author-sign-text-fs', gs(1.5));
    root.style.setProperty('--kdc-author-sign-text-lh', gs(2));
    root.style.setProperty('--kdc-author-sign-underline-l', gs(5));
    root.style.setProperty('--kdc-author-sign-underline-w', gs(6.25));
    root.style.setProperty('--kdc-author-sign-underline-h', gs(0.563));
    root.style.setProperty('--kdc-website-info-mt', gs(1.25));
    root.style.setProperty('--kdc-website-info-fs', gs(0.75));
    root.style.setProperty('--kdc-website-info-lh', gs(1));
  }, [options.color, options.fontSize, options.lineHeight, gs]);

  return (
    <main className="main-content" aria-label="Kabir Doha Card Generator">
      <div className="main-content__preview-wrapper" ref={elementRef} aria-live="polite" aria-busy={options.loading}>
        <div className="main-content__preview">
          <PreviewBox options={options} updateOptions={updateOptions} />
        </div>
      </div>

      <OptionsBox options={options} updateOptions={updateOptions} couplets={initialCouplets} />
    </main>
  );
};

export default MainContent;
