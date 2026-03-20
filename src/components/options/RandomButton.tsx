import type { JSX } from 'react';

import { TfiReload } from 'react-icons/tfi';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import type { RandomButtonProps } from '@/types';
import { cn } from '@/utils/classnames';
import fetchCouplets from '@/utils/fetchCouplets';
import { showToast } from '@/utils/toast';

/**
 * RandomButton component triggers the randomization of the Doha.
 * Provides visual indication of loading state and tooltip functionality.
 *
 * @component
 * @param props - The component props
 * @returns The rendered button component
 */
const RandomButton = ({ options, updateOptions }: RandomButtonProps): JSX.Element => {
  const fetchRandomDoha = async (): Promise<void> => {
    if (options.loading) return;

    updateOptions({ loading: true });

    const { data, error } = await fetchCouplets('random');

    if (error) {
      console.error(error);
      showToast(error, 'error');
      updateOptions({ loading: false });
    } else {
      if (data && data.length > 0) {
        updateOptions({ couplet: data[0], loading: false });
      } else {
        console.warn('No results found for random Doha.');
        showToast('No Doha found, try again!', 'error');
        updateOptions({ loading: false });
      }
    }
  };

  return (
    <>
      <ReactTooltip id="random-doha-tooltip" />

      <button
        onClick={fetchRandomDoha}
        className={cn('random-btn', { 'cursor-not-allowed opacity-75': options.loading })}
        aria-label="Get Random Doha"
        aria-busy={options.loading}
        data-tooltip-id="random-doha-tooltip"
        data-tooltip-content="Get a random Doha"
        disabled={options.loading}
      >
        <TfiReload aria-hidden="true" size={30} />
        <span className="sr-only">{options.loading ? 'Loading random Doha...' : 'Get Random Doha'}</span>
      </button>
    </>
  );
};

export default RandomButton;
