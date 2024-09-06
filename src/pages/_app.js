import { Space_Grotesk } from "next/font/google";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import SEO from "@/components/SEO";

// Load fonts
const space = Space_Grotesk({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

/**
 * Custom App component to initialize pages with global styles and fonts.
 *
 * This component wraps around the entire application and applies global styles,
 * fonts, and includes global components like SEO and Toaster. It also provides
 * the page component and its props to be rendered.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ElementType} props.Component - The active page component.
 * @param {Object} props.pageProps - The initial props for the active page.
 * @example
 * return <App Component={MyPage} pageProps={myPageProps} />;
 */
export default function App({ Component, pageProps }) {
	return (
		<>
			<SEO />
			<div className={`${space.className}`}>
				<Component {...pageProps} />
				<Toaster position="bottom-center" reverseOrder={true} />
			</div>
		</>
	);
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
