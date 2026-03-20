import { useState, useEffect, useRef, type JSX } from 'react';

import debounce from 'lodash/debounce';
import { Hind } from 'next/font/google';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { RiSearchLine } from 'react-icons/ri';

import type { SearchModalProps } from '@/types';
import { cn } from '@/utils/classnames';
import fetchCouplets from '@/utils/fetchCouplets';
import { formatCouplet } from '@/utils/preview';

const hind = Hind({ weight: ['400', '700'], subsets: ['latin', 'devanagari'] });

/**
 * Modal component for search input and results, styled similarly to Algolia's search box.
 * Provides accessibility features including keyboard navigation and screen reader support.
 *
 * @component
 * @param props - The component props
 * @returns The search modal component or null if closed
 */
const SearchModal = ({ isOpen, onClose, couplets, onSelect }: SearchModalProps): JSX.Element | null => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(couplets);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Resetting search term when modal closes
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const fetchSearchResults = debounce(async (term: string) => {
      if (term) {
        setLoading(true);

        const { data, error } = await fetchCouplets('search', term);

        if (error) {
          console.error(error);
          setSearchResults([]);
        } else {
          setSearchResults(data);
        }

        setLoading(false);
      } else {
        setSearchResults(couplets);
      }
    }, 1000);

    fetchSearchResults(searchTerm);

    return () => {
      fetchSearchResults.cancel();
    };
  }, [searchTerm, couplets]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" aria-hidden="true" onClick={onClose}></div>

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
                      {formatCouplet(text).map((line: string, lineIndex: number) => (
                        <span className="block w-full" key={lineIndex}>
                          {line}
                        </span>
                      ))}
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
