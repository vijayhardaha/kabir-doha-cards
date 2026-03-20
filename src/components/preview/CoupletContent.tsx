import type { JSX } from 'react';

import AuthorSignature from '@/components/preview/AuthorSignature';
import CoupletText from '@/components/preview/CoupletText';
import QuoteIcon from '@/components/preview/QuoteIcon';
import WebsiteInfo from '@/components/preview/WebsiteInfo';
import type { CoupletContentProps } from '@/types';

/**
 * CoupletContent component displays the couplet with a quote icon, text, author signature, underline, and website information.
 *
 * @component
 * @param props - The component props
 * @returns The rendered couplet content
 */
const CoupletContent = ({ couplet }: CoupletContentProps): JSX.Element => (
  <div className="relative z-20 flex h-full flex-col items-start justify-end p-[var(--kdc-couplet-content-p)]">
    <QuoteIcon />
    <CoupletText couplet={couplet} />
    <AuthorSignature />
    <WebsiteInfo />
  </div>
);

export default CoupletContent;
