/**
 * Returns the normalized base URL for the running application.
 *
 * @returns {string} The normalized base URL.
 */
export const getBaseUrl = (): string => {
  const url =
    process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_BRANCH_URL
    || process.env.VERCEL_URL
    || process.env.NEXT_PUBLIC_SITE_URL
    || `http://localhost:${process.env.PORT || 3000}`;

  const cleaned = url.trim().replace(/\/+$/, '');

  return /^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`;
};

/**
 * Normalizes a slug for canonical URL generation.
 *
 * @param {string} [slug=''] - The input path or slug.
 * @returns {string} The cleaned relative path.
 */
export const safeCanonical = (slug: string = ''): string => {
  return slug.trim().replace(/^\/+/, '').replace(/\/+$/, '');
};

/**
 * Builds a canonical URL from the base URL and an optional slug.
 *
 * @param {string} [slug=''] - The path segment to append.
 * @returns {string} The canonical absolute URL.
 */
export const getCanonicalUrl = (slug: string = ''): string => {
  return [getBaseUrl(), safeCanonical(slug)].filter(Boolean).join('/');
};
