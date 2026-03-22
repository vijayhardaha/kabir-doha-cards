'use client';

import { useMemo, type JSX } from 'react';

import type { CoupletTextProps } from '@/types';
import { formatCouplet } from '@/utils/preview';

/**
 * Renders the formatted lines for the selected couplet.
 *
 * @param {CoupletTextProps} props - The component props.
 * @returns {JSX.Element} The rendered couplet text.
 */
const CoupletText = ({ couplet }: CoupletTextProps): JSX.Element => {
  const formattedLines = useMemo(() => formatCouplet(couplet, 4), [couplet]);

  return (
    <div className="couplet-text">
      {formattedLines.map((line: string, index: number) => (
        <span className="couplet-text__line" key={index}>
          {line}
        </span>
      ))}
    </div>
  );
};

export default CoupletText;
