import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document component for Next.js.
 *
 * This component customizes the default HTML document structure.
 * It allows you to define global HTML attributes, include external
 * stylesheets, or add global scripts that should be loaded on every page.
 *
 * Use this component to set up elements that need to be present across
 * all pages, such as metadata, favicons, and global styles.
 *
 * @component
 * @example
 * return <Document />;
 */
export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Favicon for general browsers */}
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />

				{/* Apple Touch Icon for iOS devices */}
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

				{/* Icons for Android Chrome and other devices */}
				<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
				<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

				{/* Additional favicon sizes for compatibility */}
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

				{/* Link to the web app manifest file */}
				<link rel="manifest" href="/manifest.json" />

				{/* Theme color for browsers that support it */}
				<meta name="theme-color" content="#12b848" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
