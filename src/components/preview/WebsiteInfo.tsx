import { getBaseUrl } from '@/utils/seo';

/**
 * WebsiteInfo component displays a message with information about the source of the image.
 *
 * @component
 * @returns {JSX.Element} The rendered website info message.
 */
const WebsiteInfo = () => {
  const siteUrl = getBaseUrl().replace(/^https?:\/\//, '');

  return (
    <div className="website-info">
      <span>
        Image generated from <span className="website-info__link">{siteUrl}</span>
      </span>
      <span className="sr-only">
        This image was created using the Kabir Ke Dohe website tool. Click the link to visit the website and create your
        own doha cards.
      </span>
    </div>
  );
};

export default WebsiteInfo;
