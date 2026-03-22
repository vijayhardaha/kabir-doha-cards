import type { JSX } from 'react';

import { getBaseUrl } from '@/utils/seo';

/**
 * WebsiteInfo component displays a message with information about the source of the image.
 *
 * @component
 * @returns {JSX.Element} The rendered website info message.
 */
export default function WebsiteInfo(): JSX.Element {
  const siteUrl = getBaseUrl().replace(/^https?:\/\//, '');

  return (
    <div className="website-info">
      <span>
        Image generated from <span className="website-info__link">{siteUrl}</span>
      </span>
    </div>
  );
}
