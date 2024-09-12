/**
 * The base URL of the site, retrieved from environment variables.
 * Defaults to an empty string if the environment variable is not set.
 * @type {string}
 */
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

/**
 * Default site title for SEO.
 *
 * @type {string}
 */
export const SITE_TITLE = "Kabir Doha Cards - Create Personalized Spiritual Wisdom Cards";

/**
 * Short version of the site title for SEO and display purposes.
 *
 * @type {string}
 */
export const SITE_TITLE_SHORT = "Kabir Doha Cards";

/**
 * Default site description for SEO.
 *
 * Provides a brief overview of the site's purpose and functionality.
 * @type {string}
 */
export const SITE_DESC =
	"Create beautiful, personalized Kabir Doha cards with ease. Share spiritual wisdom and celebrate special occasions with timeless teachings from Kabir.";

/**
 * Default SEO configuration for Kabir Doha Cards app.
 *
 * @type {object}
 * @property {string} title - The default title for the site.
 * @property {string} description - The default description for the site.
 * @property {string} keywords - Keywords for SEO to enhance discoverability.
 * @property {string} language - Language code for the site content.
 * @property {string} author - Author of the content for attribution.
 * @property {string} image - URL of the image for social media previews.
 * @property {string} url - URL of the site for Open Graph metadata.
 * @property {string} googlebot - Googlebot directive for indexing.
 * @property {string} robots - General robots directive for indexing.
 */
export const DEFAULT_SEO = {
	title: SITE_TITLE,
	description: SITE_DESC,
	keywords:
		"Kabir Doha, spiritual quotes, personalized cards, wisdom cards, Kabir teachings, inspirational quotes, custom cards, Kabir, spirituality, Kabir Doha cards",
	language: "en-US",
	author: "Vijay Hardaha",
	image: "/thumbnail.png",
	url: "",
	googlebot: "index, follow",
	robots: "index, follow",
};
