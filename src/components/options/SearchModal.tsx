import { useState, useEffect, useRef, type JSX } from 'react';

import debounce from 'lodash/debounce';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { RiSearchLine } from 'react-icons/ri';

import type { SearchModalProps } from '@/types';
import { cn } from '@/utils/classnames';
import fetchCouplets from '@/utils/fetchCouplets';
import { formatCouplet } from '@/utils/preview';

/**
 * Renders the modal used to search and select available couplets.
 *
 * @param {SearchModalProps} props - The component props.
 * @returns {JSX.Element | null} The rendered search modal.
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
      // Move focus directly to search so keyboard users can start typing immediately.
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

    // Lock background scroll while the modal is active.
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

    // Debounce network search requests so typing does not trigger one request per keystroke.
    fetchSearchResults(searchTerm);

    return () => {
      fetchSearchResults.cancel();
    };
  }, [searchTerm, couplets]);

  if (!isOpen) return null;

  return (
    <>
      <div className="search-modal__overlay" aria-hidden="true" onClick={onClose}></div>

      <div role="dialog" aria-labelledby="search-modal-title" aria-modal="true" className="search-modal__container">
        <div ref={modalRef} role="document" className="search-modal__content" tabIndex={-1}>
          <span className="sr-only" id="search-modal-title">
            Search for Kabir Doha
          </span>
          <div className="search-modal__header">
            <RiSearchLine className="search-modal__search-icon" aria-hidden="true" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for Doha..."
              className={cn('search-modal__input')}
              aria-label="Search for Doha"
              ref={inputRef}
            />
            <PiSpinnerGapLight
              size={24}
              className={cn('search-modal__spinner', { 'search-modal__spinner--hidden': !loading })}
              aria-hidden={!loading}
            />
            {loading && <span className="sr-only">Loading search results</span>}

            <button onClick={onClose} className="search-modal__close" aria-label="Close search">
              <span aria-hidden="true">Esc</span>
            </button>
          </div>

          <div className="search-modal__results" aria-live="polite" aria-atomic="true">
            {loading && (
              <div className="search-modal__results-overlay">
                <PiSpinnerGapLight
                  size={30}
                  className="search-modal__results-spinner animate-spin"
                  aria-hidden="true"
                />
                <span className="sr-only">Searching...</span>
              </div>
            )}

            {searchResults.length > 0 ? (
              <ul className="search-modal__list">
                {searchResults.map((text, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onSelect(text)}
                      className={cn('search-modal__item', {
                        'search-modal__item--last': index === searchResults.length - 1,
                      })}
                      aria-label={`Select doha: ${text.substring(0, 30)}...`}
                    >
                      {formatCouplet(text).map((line: string, lineIndex: number) => (
                        <span className="search-modal__item-line" key={lineIndex}>
                          {line}
                        </span>
                      ))}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="search-modal__empty" role="status">
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
