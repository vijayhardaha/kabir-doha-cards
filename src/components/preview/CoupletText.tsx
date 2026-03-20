'use client';

import { useMemo, type JSX } from 'react';

import type { CoupletTextProps } from '@/types';
import { formatCouplet } from '@/utils/preview';

/**
 * CoupletText component displays the formatted text of a couplet.
 * The component shows the couplet in a stylized format, with each line as a separate block.
 *
 * @component
 * @param props - The component props
 * @returns The rendered couplet text component
 *
 * @example
 * // Basic usage
 * <CoupletText couplet="कबीर जब तुं जायगा..." />
 *
 * @example
 * // With screen reader text
 * <CoupletText
 *   couplet="कबीर जब तुं जायगा..."
 *   screenReaderText="Kabir says when you depart from this world..."
 * />
 */
const CoupletText = ({ couplet, screenReaderText }: CoupletTextProps): JSX.Element => {
  const formattedLines = useMemo(() => formatCouplet(couplet, 4), [couplet]);

  return (
    <div
      className="relative block w-full font-bold"
      style={{
        fontFamily: 'var(--font-poppins)',
        fontSize: 'var(--kdc-couplet-text-fs)',
        lineHeight: 'var(--kdc-couplet-text-lh)',
      }}
      aria-label={screenReaderText || 'Couplet text'}
    >
      {screenReaderText && <span className="sr-only">{screenReaderText}</span>}
      {formattedLines.map((line: string, index: number) => (
        <span className="block w-full truncate" key={index} aria-hidden={!!screenReaderText}>
          {line}
        </span>
      ))}
    </div>
  );
};

export default CoupletText;
