import { Suspense, type JSX } from 'react';

import type { Metadata } from 'next';
import { PiSpinnerGapLight } from 'react-icons/pi';

import MainContent from '@/components/MainContent';
import { SITE_METADATA } from '@/constants/seo';
import fetchCouplets from '@/utils/fetchCouplets';

export const metadata: Metadata = SITE_METADATA;

async function KabirDohaCards(): Promise<JSX.Element> {
  const { data } = await fetchCouplets('random');
  return <MainContent initialCouplets={data} />;
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
