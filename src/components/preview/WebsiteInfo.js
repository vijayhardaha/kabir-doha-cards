import { getSiteUrl } from "@/utils/url";

/**
 * WebsiteInfo component displays a message with information about the source of the image.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.elementWidth - The width of the container element, used for responsive sizing.
 * @returns {JSX.Element} The rendered website info message.
 */
const WebsiteInfo = () => (
	<div
		className="relative block whitespace-nowrap text-xs text-stone-400"
		style={{
			marginTop: "var(--kdc-website-info-mt)",
			fontSize: "var(--kdc-website-info-fs)",
			lineHeight: "var(--kdc-website-info-lh)",
		}}
	>
		Image sourced from <span className="underline">{getSiteUrl(false)}</span>
	</div>
);

export default WebsiteInfo;
