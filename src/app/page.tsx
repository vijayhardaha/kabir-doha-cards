import { Suspense, type JSX } from 'react';

import { PiSpinnerGapLight } from 'react-icons/pi';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MainContent from '@/components/MainContent';
import { DEFAULT_SEO } from '@/constants/seo';
import { getSiteUrl } from '@/utils/url';

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
    images: [{ url: `${siteBaseUrl}${DEFAULT_SEO.image}`, width: 800, height: 600, alt: 'Kabir Doha Cards Thumbnail' }],
  },
  twitter: {
    card: 'summary_large_image',
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
async function fetchKabirCouplets(): Promise<string[]> {
  try {
    const response = await fetch('https://kabir-ke-dohe-api.vercel.app/api/couplets', {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ per_page: 10 }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch couplets: ${response.statusText}`);
    }

    const responseData = await response.json();
    if (responseData.success && responseData.data?.posts?.length > 0) {
      return responseData.data.posts.map((couplet: Record<string, unknown>) => couplet.text_hi);
    } else {
      console.warn('Unexpected API response structure:', responseData);
      return [];
    }
  } catch (error) {
    console.error('Error fetching Kabir couplets:', error);
    return [];
  }
}

/**
 * Component to fetch and display Kabir couplets.
 *
 * @async
 * @function KabirCoupletContent
 * @returns {Promise<JSX.Element>} The rendered content with fetched couplets.
 */
async function KabirCoupletContent(): Promise<JSX.Element> {
  const couplets = await fetchKabirCouplets();
  return <MainContent couplets={couplets} />;
}

/**
 * Home page component that displays the header, footer, and main content.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home(): JSX.Element {
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="mt-8 mb-8">
          <Suspense
            fallback={
              <>
                <div className="relative mx-auto aspect-square h-full w-full max-w-[700px] border-2 border-dashed border-stone-100">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                    <PiSpinnerGapLight aria-hidden="true" className="text-primary-600 animate-spin" size={36} />
                    <p className="text-lg text-stone-700">Loading...</p>
                  </div>
                </div>
              </>
            }
          >
            <KabirCoupletContent />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
