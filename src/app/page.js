import { Suspense } from "react";

import PropTypes from "prop-types";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import { DEFAULT_SEO } from "@/constants/seo";
import { getSiteUrl } from "@/utils/url";

const siteBaseUrl = getSiteUrl();

/**
 * Metadata for the page, including SEO and social sharing details.
 */
export const metadata = {
  title: DEFAULT_SEO.title,
  description: DEFAULT_SEO.description,
  keywords: DEFAULT_SEO.keywords,
  author: DEFAULT_SEO.author,
  openGraph: {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    url: siteBaseUrl || DEFAULT_SEO.url,
    images: [
      {
        url: `${siteBaseUrl}${DEFAULT_SEO.image}`,
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
    images: [`${siteBaseUrl}${DEFAULT_SEO.image}`],
  },
  robots: DEFAULT_SEO.robots,
  googlebot: DEFAULT_SEO.googlebot,
};

/**
 * Fetches Kabir couplets from the API.
 *
 * @async
 * @function fetchKabirCouplets
 * @returns {Promise<string[]>} An array of couplets in Hindi.
 */
async function fetchKabirCouplets() {
  try {
    const response = await fetch("https://kabir-ke-dohe-api.vercel.app/api/couplets", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderBy: "random", perPage: 10 }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch couplets: ${response.statusText}`);
    }

    const responseData = await response.json();
    if (responseData.success && responseData.data?.couplets) {
      return responseData.data.couplets.map((couplet) => couplet.couplet_hindi);
    } else {
      console.warn("Unexpected API response structure:", responseData);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Kabir couplets:", error);
    return [];
  }
}

/**
 * Component to fetch and display Kabir couplets.
 *
 * @async
 * @function KabirCoupletContent
 * @returns {JSX.Element} The rendered content with fetched couplets.
 */
async function KabirCoupletContent() {
  const couplets = await fetchKabirCouplets();
  return <MainContent couplets={couplets} />;
}

/**
 * Home page component that displays the header, footer, and main content.
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
            <KabirCoupletContent />
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
