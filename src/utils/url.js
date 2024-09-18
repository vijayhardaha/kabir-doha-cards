import { SITE_URL } from "@/constants/seo";

/**
 * Removes the "http:" and "https:" protocol from a URL.
 *
 * @param {string} url - The URL from which to remove the protocol.
 * @returns {string} The URL without the "http:" or "https:" protocol.
 *
 * @example
 * // Returns "www.example.com"
 * removeProtocol("https://www.example.com");
 *
 * @example
 * // Returns "www.example.com"
 * removeProtocol("http://www.example.com");
 */
export const removeProtocol = (url) => {
	return url.replace(/^https?:\/\//, "");
};

/**
 * Removes the trailing slash from a URL, if it exists.
 *
 * @param {string} url - The URL from which to remove the trailing slash.
 * @returns {string} The URL without the trailing slash.
 */
export function removeTrailingSlash(url) {
	return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * Returns the SITE_URL with optional removal of the protocol.
 *
 * @param {boolean} [protocol=true] - Whether to include the protocol in the returned URL. If false, the protocol is removed.
 * @returns {string} The formatted SITE_URL, with or without the protocol, depending on the parameter.
 */
export function getSiteUrl(protocol = true) {
	let url = removeTrailingSlash(SITE_URL);

	if (!protocol) {
		url = removeProtocol(url);
	}

	return url;
}
