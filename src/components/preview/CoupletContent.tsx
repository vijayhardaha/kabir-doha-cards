import type { JSX } from 'react';

import AuthorSignature from '@/components/preview/AuthorSignature';
import CoupletText from '@/components/preview/CoupletText';
import QuoteIcon from '@/components/preview/QuoteIcon';
import WebsiteInfo from '@/components/preview/WebsiteInfo';
import type { CoupletContentProps } from '@/types';

/**
 * Renders the composed content inside the doha card preview.
 *
 * @param {CoupletContentProps} props - The component props.
 * @returns {JSX.Element} The rendered couplet content.
 */
const CoupletContent = ({ couplet }: CoupletContentProps): JSX.Element => (
  <div className="couplet-content">
    <QuoteIcon />
    <CoupletText couplet={couplet} />
    <AuthorSignature />
    <WebsiteInfo />
  </div>
);

export default CoupletContent;
