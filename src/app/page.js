import { Suspense } from "react";

import PropTypes from "prop-types";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import { DEFAULT_SEO } from "@/constants/seo";
import { getSiteUrl } from "@/utils/url";

const siteUrl = getSiteUrl();

// Fetch couplets server-side if needed, or pass as props
export const metadata = {
	title: DEFAULT_SEO.title,
	description: DEFAULT_SEO.description,
	keywords: DEFAULT_SEO.keywords,
	author: DEFAULT_SEO.author,
	openGraph: {
		title: DEFAULT_SEO.title,
		description: DEFAULT_SEO.description,
		url: siteUrl || DEFAULT_SEO.url,
		images: [
			{
				url: siteUrl + DEFAULT_SEO.image,
				width: 800,
				height: 600,
				alt: "Kabir Doha Cards Thumbnail",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: DEFAULT_SEO.title,
		description: DEFAULT_SEO.description,
		images: [siteUrl + DEFAULT_SEO.image],
	},
	robots: DEFAULT_SEO.robots,
	googlebot: DEFAULT_SEO.googlebot,
};

/**
 * Fetches couplets data from the API.
 *
 * @async
 * @function
 * @returns {Promise<Array<string>>} The array of couplets in Hindi.
 */
async function fetchCouplets() {
	try {
		const res = await fetch("https://kabir-ke-dohe-api.vercel.app/api/couplets", {
			method: "POST",
			cache: "no-cache",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ orderBy: "random", perPage: 10 }),
		});

		if (!res.ok) {
			throw new Error(`Network response was not ok: ${res.statusText}`);
		}

		const data = await res.json();
		if (data.success && data.data && data.data.couplets) {
			return data.data.couplets.map((c) => c.couplet_hindi);
		} else {
			console.warn("Invalid data structure:", data);
			return [];
		}
	} catch (error) {
		console.error("Error fetching couplets:", error);
		return [];
	}
}

/**
 * Component to fetch and display couplets with loading state.
 *
 * @async
 * @function
 * @returns {JSX.Element} The content of couplets once loaded.
 */
async function CoupletContent() {
	const couplets = await fetchCouplets();
	return <MainContent couplets={couplets} />;
}

/**
 * Home page component that displays a loading indicator while the main content is being fetched.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
	return (
		<div>
			<Header />
			<div className="container mx-auto">
				<div className="mb-20">
					<Suspense fallback={<></>}>
						{/* The main content will be shown once the data is fetched */}
						<CoupletContent />
					</Suspense>
				</div>
			</div>
			<Footer />
		</div>
	);
}

Home.propTypes = {
	couplets: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
};
