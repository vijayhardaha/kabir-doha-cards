import type { JSX } from 'react';

import { PiSpinnerGapLight } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import type { RandomButtonProps } from '@/types';
import fetchCouplets from '@/utils/fetch-couplets';
import { showToast } from '@/utils/toast';

const RandomButton = ({ options, updateOptions }: RandomButtonProps): JSX.Element => {
  const handleClick = async (): Promise<void> => {
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
        className="icon-btn"
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
};

export default RandomButton;
