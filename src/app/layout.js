import { Space_Grotesk } from "next/font/google";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

// Load fonts
const space = Space_Grotesk({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

/**
 * Root Layout component for the Next.js App Router.
 *
 * This layout component sets the HTML document structure, applies global styles,
 * and includes global components such as SEO and Toaster. It also ensures that
 * the current page's component is rendered within this layout.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The page content to be rendered.
 * @example
 * return <RootLayout>{pageContent}</RootLayout>;
 */
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
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
			</head>
			<body className={`${space.className}`}>
				<div>{children}</div>
				<Toaster position="bottom-center" reverseOrder={true} />
			</body>
		</html>
	);
}

RootLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
