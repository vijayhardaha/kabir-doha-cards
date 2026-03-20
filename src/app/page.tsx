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
    <div className="relative mx-auto aspect-square h-full w-full max-w-[700px] border-2 border-dashed border-stone-100">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <PiSpinnerGapLight aria-hidden="true" className="text-primary-600 animate-spin" size={36} />
        <p className="text-lg text-stone-700">Loading...</p>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <div className="main-container mt-8 mb-8">
      <Suspense fallback={<LoadingFallback />}>
        <KabirDohaCards />
      </Suspense>
    </div>
  );
}
