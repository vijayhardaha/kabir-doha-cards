'use client';

import type { JSX } from 'react';

import { TfiReload } from 'react-icons/tfi';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { cn } from '@/utils/classNameUtils';
import { showToast } from '@/utils/toast';

/**
 * RandomButton component triggers the randomization of the Doha.
 * Provides visual indication of loading state and tooltip functionality.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function(string): void} props.setCouplet - Function to set the random Doha.
 * @param {boolean} props.loading - Indicates if a request is in progress.
 * @param {function(boolean): void} props.setLoading - Function to set the loading state.
 * @returns {JSX.Element} The rendered button component.
 */
const RandomButton = ({
  setCouplet,
  loading,
  setLoading,
}: {
  setCouplet: (arg0: string) => void;
  loading: boolean;
  setLoading: (arg0: boolean) => void;
}): JSX.Element => {
  /**
   * Fetches a random Doha from the server and updates the state with the couplet.
   * Displays appropriate toast notifications for success or failure.
   * Prevents duplicate requests while already loading.
   *
   * @async
   * @function fetchRandomDoha
   * @returns {Promise<void>} Resolves once the Doha is fetched and state is updated.
   */
  const fetchRandomDoha = async (): Promise<void> => {
    if (loading) return; // Prevent multiple simultaneous requests.

    setLoading(true);

    try {
      const response = await fetch('/api/random', { method: 'POST', headers: { 'Content-Type': 'application/json' } });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.couplet) {
        setCouplet(data.couplet);
        // Announce success to screen readers
        const srAnnouncement = document.getElementById('sr-announcement');
        if (srAnnouncement) {
          srAnnouncement.textContent = 'New random Doha loaded successfully';
        }
      } else {
        console.warn('No results found for random Doha.');
        showToast('No Doha found, try again!', 'error');
      }
    } catch (error) {
      console.error('Error fetching random Doha:', error);
      showToast('Error fetching Doha, try again!', 'error');
    } finally {
      setLoading(false); // Reset loading state after the request completes.
    }
  };

  return (
    <>
      {/* Initialize React Tooltip with id */}
      <ReactTooltip id="random-doha-tooltip" />

      {/* Visually hidden announcement for screen readers */}
      <div id="sr-announcement" className="sr-only" aria-live="polite"></div>

      <button
        onClick={fetchRandomDoha}
        className={cn('random-btn', { 'cursor-not-allowed opacity-75': loading })}
        aria-label="Get Random Doha"
        aria-busy={loading}
        data-tooltip-id="random-doha-tooltip"
        data-tooltip-content="Get a random Doha"
        disabled={loading}
      >
        <TfiReload aria-hidden="true" size={30} className={loading ? 'animate-spin' : ''} />
        <span className="sr-only">{loading ? 'Loading random Doha...' : 'Get Random Doha'}</span>
      </button>
    </>
  );
};

export default RandomButton;
