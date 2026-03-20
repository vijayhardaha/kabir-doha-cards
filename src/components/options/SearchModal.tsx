import { useState, useEffect, useRef, type JSX } from 'react';

import debounce from 'lodash/debounce';
import { Hind } from 'next/font/google';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { RiSearchLine } from 'react-icons/ri';

import { cn } from '@/utils/classNameUtils';

const hind = Hind({ weight: ['400', '700'], subsets: ['latin', 'devanagari'] });

/**
 * Modal component for search input and results, styled similarly to Algolia's search box.
 * Provides accessibility features including keyboard navigation and screen reader support.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function(): void} props.onClose - Function to close the modal.
 * @param {Array<string>} props.couplets - List of default couplets to display.
 * @param {function(string): void} props.onSelect - Function to handle the selection of a Doha.
 * @returns {JSX.Element|null} The search modal component or null if closed.
 */
const SearchModal = ({
  isOpen,
  onClose,
  couplets,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  couplets: Array<string>;
  onSelect: (arg0: string) => void;
}): JSX.Element | null => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(couplets);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the search input

  // Flag to track if event listeners should be attached
  const [shouldAttachListeners, setShouldAttachListeners] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldAttachListeners(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // Disable body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setShouldAttachListeners(false);
      setSearchTerm('');
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = '';
    }

    // Cleanup function to ensure scrolling is restored when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!shouldAttachListeners) return;

    /**
     * Handles keydown events to close the modal on Escape key press.
     * @param {KeyboardEvent} event - The keyboard event.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shouldAttachListeners, onClose]);

  useEffect(() => {
    /**
     * Fetches search results based on the search term with a debounce delay.
     * @param {string} term - The search term.
     */
    const fetchSearchResults = debounce(async (term: string) => {
      if (term) {
        setLoading(true);
        try {
          const response = await fetch('/api/search', {
            method: 'POST',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: term }),
          });

          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }

          const data = await response.json();

          if (data.success && data.results) {
            setSearchResults(data.results);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults(couplets);
      }
    }, 1000);

    fetchSearchResults(searchTerm);

    // Cleanup the debounce function on unmount
    return () => {
      fetchSearchResults.cancel();
    };
  }, [searchTerm, couplets]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" aria-hidden="true" onClick={onClose}></div>

      {/* Modal */}
      <div
        role="dialog"
        aria-labelledby="search-modal-title"
        aria-modal="true"
        className="fixed inset-0 z-50 h-screen w-screen overflow-x-hidden overflow-y-auto px-5"
      >
        <div
          ref={modalRef}
          role="document"
          className="relative mx-auto mt-20 mb-0 w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg"
          tabIndex={-1}
        >
          <span className="sr-only" id="search-modal-title">
            Search for Kabir Doha
          </span>
          <div className="flex items-center border-b border-stone-200 px-4 py-2">
            <RiSearchLine className="mr-3 block h-7 w-7 text-stone-500" aria-hidden="true" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for Doha..."
              className={cn(
                'w-full rounded-lg border-none bg-white px-2 py-2 pl-0 text-sm placeholder-stone-400 outline-hidden'
              )}
              aria-label="Search for Doha"
              ref={inputRef}
            />
            <PiSpinnerGapLight
              size={24}
              className={cn('ml-2', { 'animate-spin': loading, hidden: !loading })}
              aria-hidden={!loading}
            />
            {loading && <span className="sr-only">Loading search results</span>}

            <button
              onClick={onClose}
              className="ml-2 cursor-pointer rounded-lg border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-500 shadow-md hover:text-stone-700 active:scale-95"
              aria-label="Close search"
            >
              <span aria-hidden="true">Esc</span>
              <span className="sr-only">Close search dialog</span>
            </button>
          </div>

          {/* Search results */}
          <div className="relative py-2" aria-live="polite" aria-atomic="true">
            {loading && (
              <div className="bg-opacity-35 absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-stone-200">
                <PiSpinnerGapLight size={30} className="animate-spin" aria-hidden="true" />
                <span className="sr-only">Searching...</span>
              </div>
            )}

            {searchResults.length > 0 ? (
              <ul className="m-0 list-none p-0">
                {searchResults.map((text, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onSelect(text)}
                      className={cn(
                        'block w-full border-b border-stone-100 px-6 py-3 text-left text-sm font-medium tracking-wide whitespace-pre-wrap hover:bg-stone-100 focus:bg-stone-200 focus:outline-hidden',
                        hind.className,
                        { 'border-b-0': index === searchResults.length - 1 }
                      )}
                      aria-label={`Select doha: ${text.substring(0, 30)}...`}
                    >
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-6 py-3 text-lg font-semibold text-stone-500" role="status">
                No results found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
