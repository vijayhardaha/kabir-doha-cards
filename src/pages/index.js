import PropTypes from "prop-types";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import MainContent from "@/components/MainContent";

/**
 * Home page component that displays either a loading indicator or the main content.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.couplets - Array of couplets to display in the main content.
 * @param {boolean} props.isLoading - Boolean indicating if the data is still loading.
 * @returns {JSX.Element} The rendered component.
 */
export default function Home({ couplets, isLoading }) {
	return (
		<div>
			<Header />
			<div className="container mx-auto">{isLoading ? <Loader /> : <MainContent couplets={couplets} />}</div>
			<Footer />
		</div>
	);
}

Home.propTypes = {
	couplets: PropTypes.arrayOf(PropTypes.string).isRequired,
	isLoading: PropTypes.bool.isRequired,
};

/**
 * Fetches random dohas from the server-side API and returns them as props.
 * Handles errors and validates the response data structure.
 *
 * @async
 * @function
 * @returns {Promise<{ props: { couplets: Array<Object>, isLoading: boolean } }>} The props object containing the initial dohas and loading state.
 */
export async function getServerSideProps() {
	try {
		// Sends a POST request to the dohas API to fetch random dohas.
		const res = await fetch("https://kabirkedohe.vercel.app/api/couplets", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ orderBy: "random", perPage: 10 }),
		});

		// Checks if the HTTP response status is OK (status in the range 200-299).
		if (!res.ok) {
			throw new Error(`Network response was not ok: ${res.statusText}`);
		}

		// Parses the JSON data from the response.
		const data = await res.json();

		// Validates the data structure to ensure it contains the expected properties.
		if (data.success && data.data && data.data.couplets) {
			const coupletsArray = data.data.couplets.map((c) => c.couplet_hindi);
			return {
				props: { couplets: coupletsArray, isLoading: false },
			};
		} else {
			console.warn("Invalid data structure:", data);
			return {
				// Return an empty array if the data is invalid
				props: { couplets: [], isLoading: false },
			};
		}
	} catch (error) {
		// Catches and logs any errors that occur during the fetch or data processing.
		console.error("Error fetching dohas:", error);
		return {
			// Return an empty array in case of an error
			props: { couplets: [], isLoading: false },
		};
	}
}
