'use client';

import { useMemo, type JSX } from 'react';

import type { CoupletTextProps } from '@/types';
import { formatCouplet } from '@/utils/preview';

/**
 * CoupletText component displays the formatted text of a couplet.
 *
 * @component
 * @param props - The component props
 * @returns The rendered couplet text component
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
