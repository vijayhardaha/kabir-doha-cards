import { getSiteUrl } from '@/utils/url';

/**
 * WebsiteInfo component displays a message with information about the source of the image.
 * It includes an accessible link to the source website.
 *
 * @component
 * @returns {JSX.Element} The rendered website info message.
 */
const WebsiteInfo = () => {
  const siteUrl = getSiteUrl(false);

  return (
    <div
      className="relative block text-xs whitespace-nowrap text-stone-400"
      style={{
        marginTop: 'var(--kdc-website-info-mt)',
        fontSize: 'var(--kdc-website-info-fs)',
        lineHeight: 'var(--kdc-website-info-lh)',
      }}
    >
      <span>
        Image generated from <span className="underline">{siteUrl}</span>
      </span>
      <span className="sr-only">
        This image was created using the Kabir Ke Dohe website tool. Click the link to visit the website and create your
        own doha cards.
      </span>
    </div>
  );
};

export default WebsiteInfo;
