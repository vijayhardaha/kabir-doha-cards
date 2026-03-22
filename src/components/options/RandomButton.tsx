import type { JSX } from 'react';

import { PiSpinnerGapLight } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import type { RandomButtonProps } from '@/types';
import fetchCouplets from '@/utils/fetch-couplets';
import { showToast } from '@/utils/toast';

/**
 * Button that fetches and applies a random doha to the current options.
 *
 * Disables itself while a fetch is in flight and shows toast feedback
 * on error or when no results are found.
 *
 * @param {RandomButtonProps} props - The current options and updater.
 * @returns {JSX.Element} The rendered randomize button.
 */
export default function RandomButton({ options, updateOptions }: RandomButtonProps): JSX.Element {
  const handleClick = async (): Promise<void> => {
    // Prevent concurrent fetches while the component is already loading.
    if (options.loading) return;

    updateOptions({ loading: true });

    const { data, error } = await fetchCouplets('random');

    if (error) {
      console.error(error);
      showToast(error, 'error');
      updateOptions({ loading: false });
    } else if (data && data.length > 0) {
      updateOptions({ couplet: data[0], loading: false });
    } else {
      console.warn('No results found for random Doha.');
      showToast('No Doha found, try again!', 'error');
      updateOptions({ loading: false });
    }
  };

  return (
    <>
      <ReactTooltip id="random-doha-tooltip" />

      <button
        onClick={handleClick}
        className="icon-btn random-btn"
        aria-label="Get Random Doha"
        aria-busy={options.loading}
        data-tooltip-id="random-doha-tooltip"
        data-tooltip-content="Get a random Doha"
        disabled={options.loading}
      >
        {options.loading ? (
          <PiSpinnerGapLight aria-hidden="true" size={30} className="animate-spin" />
        ) : (
          <TfiReload aria-hidden="true" size={30} />
        )}
      </button>
    </>
  );
}
