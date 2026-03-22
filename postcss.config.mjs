/**
 * ======================================================================
 * Postcss Configuration
 * ======================================================================
 * Purpose: Configure PostCSS plugins used to transform project styles.
 *          Autoprefixer adds vendor prefixes based on browserslist.
 * Docs: https://github.com/postcss/postcss/blob/main/docs/config.md
 * ======================================================================
 */

const browserslist = ['>0.3%', 'last 4 versions', 'not dead'];

/** @type {import('postcss-load-config').Config} */
const config = { plugins: { autoprefixer: { browserslist } } };

export default config;
