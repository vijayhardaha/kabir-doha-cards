'use client';

import { useState, useLayoutEffect, useRef, type JSX } from 'react';

import OptionsBox from '@/components/options/OptionsBox';
import PreviewBox from '@/components/preview/PreviewBox';
import { DEFAULT_CARD_OPTIONS } from '@/constants/card';
import type { CardOptions, Couplet, Setter } from '@/types';

import RandomButton from './options/RandomButton';

// The base design width used for scaling the preview canvas.
// Keep in sync with CSS rules that expect a 600px design width.
const BASE_WIDTH = 600;

interface MainContentProps {
  initialCouplets: Couplet[];
  initialCouplet?: string;
}

/**
 * Main content area that hosts the preview and options controls.
 *
 * Handles responsive scaling of the preview canvas and manages local
 * card options state propagated to child components.
 *
 * @param {MainContentProps} props - Initial couplets and optional initial selection.
 * @returns {JSX.Element} The rendered main content area.
 */
const MainContent = ({ initialCouplets, initialCouplet }: MainContentProps): JSX.Element => {
  const [options, setOptions] = useState<CardOptions>({
    ...DEFAULT_CARD_OPTIONS,
    couplet: initialCouplet || initialCouplets[0] || '',
  });
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply partial updates to the card options state. Accepts either a
  // partial object or an updater function to mirror React's setState API.
  const updateOptions: Setter<Partial<CardOptions>> = (update) => {
    setOptions((prev) => (typeof update === 'function' ? { ...prev, ...update(prev) } : { ...prev, ...update }));
  };

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.offsetWidth;
      const scaleX = width / BASE_WIDTH;
      const newScale = Math.min(scaleX, 1);
      const scaledW = BASE_WIDTH * newScale;
      const offsetX = (width - scaledW) / 2;

      setScale(newScale);
      setOffset({ x: offsetX, y: 0 });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.style.setProperty('--kdc-color', options.color);
    }
  }, [options.color]);

  return (
    <main className="main-content" aria-label="Kabir Doha Card Generator">
      <div className="main-content__preview-wrapper" ref={containerRef}>
        <div className="main-content__preview" style={{ fontSize: '16px' }}>
          <div className="preview-box__mobile-btn">
            <RandomButton options={options} updateOptions={updateOptions} />
          </div>
          <div className="main-content__preview-frame" id="doha-preview">
            <div
              className="main-content__preview-canvas"
              style={{ transform: `scale(${scale})`, transformOrigin: 'top left', marginLeft: `${offset.x}px` }}
            >
              <PreviewBox options={options} updateOptions={updateOptions} />
            </div>
          </div>
        </div>
      </div>

      <OptionsBox options={options} updateOptions={updateOptions} couplets={initialCouplets} />
    </main>
  );
};

export default MainContent;
