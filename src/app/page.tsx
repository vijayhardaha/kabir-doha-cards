import { Suspense, type JSX } from 'react';

import type { Metadata } from 'next';
import { PiSpinnerGapLight } from 'react-icons/pi';

import MainContent from '@/components/MainContent';
import { SITE_METADATA } from '@/constants/seo';
import fetchCouplets from '@/utils/fetchCouplets';

export const metadata: Metadata = SITE_METADATA;

/**
 * Fetches an initial random doha and renders the interactive client shell.
 *
 * @returns {Promise<JSX.Element>} The server-rendered main content.
 */
async function KabirDohaCards(): Promise<JSX.Element> {
  const { data } = await fetchCouplets('random');
  const selectedCouplet = data?.[0] || '';
  return <MainContent initialCouplets={data} initialCouplet={selectedCouplet} />;
}

function LoadingFallback(): JSX.Element {
  return (
    <div className="loading-fallback">
      <div className="loading-fallback__content">
        <PiSpinnerGapLight aria-hidden="true" className="loading-fallback__spinner" size={36} />
        <p className="loading-fallback__text">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Renders the landing page for generating customized Kabir doha cards.
 *
 * @returns {JSX.Element} The rendered home page.
 */
export default function Home(): JSX.Element {
  return (
    <div className="container">
      <p className="site-description">
        Create beautiful, personalized Kabir Doha cards with ease. Share spiritual wisdom and celebrate special
        occasions with timeless teachings from Kabir.
      </p>
      <Suspense fallback={<LoadingFallback />}>
        <KabirDohaCards />
      </Suspense>
    </div>
  );
}
