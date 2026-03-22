'use client';

import { useLayoutEffect, useRef, useSyncExternalStore, type JSX } from 'react';

import { PiSpinnerGapLight } from 'react-icons/pi';
import { RiSearchLine } from 'react-icons/ri';

import { Drawer, useDrawerClose, type DrawerDirection } from '@/components/drawer/Drawer';
import { useSearchCouplets } from '@/hooks/useSearchCouplets';
import { cn } from '@/utils/classnames';
import { formatCouplet } from '@/utils/preview';

export interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
  couplets: string[];
  onSelect: (doha: string) => void;
}

/**
 * Inner content rendered within the Drawer context so it can access
 * the animated close handler via useDrawerClose.
 */
function SearchDrawerInner({
  couplets,
  onSelect,
}: {
  couplets: string[];
  onSelect: (doha: string) => void;
}): JSX.Element {
  const { searchTerm, searchResults, loading, setSearchTerm, resetSearch } = useSearchCouplets(couplets);
  const { close } = useDrawerClose();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = (): void => {
    resetSearch();
    close();
  };

  const handleSelect = (text: string): void => {
    resetSearch();
    onSelect(text);
    close();
  };

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className="search-drawer__header">
        <span className="sr-only" id="search-drawer-title">
          Search for Kabir Doha
        </span>
        <RiSearchLine className="search-drawer__search-icon" aria-hidden="true" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Doha..."
          className={cn('search-drawer__input')}
          aria-label="Search for Doha"
          ref={inputRef}
        />
        <PiSpinnerGapLight
          size={24}
          className={cn('search-drawer__spinner', { 'search-drawer__spinner--hidden': !loading })}
          aria-hidden={!loading}
        />
        {loading && <span className="sr-only">Loading search results</span>}

        <button onClick={handleClose} className="search-drawer__close" aria-label="Close search">
          <span aria-hidden="true">Esc</span>
        </button>
      </div>

      <div className="search-drawer__results" aria-live="polite" aria-atomic="true">
        {loading && (
          <div className="search-drawer__results-overlay">
            <PiSpinnerGapLight size={30} className="search-drawer__results-spinner animate-spin" aria-hidden="true" />
            <span className="sr-only">Searching...</span>
          </div>
        )}

        {searchResults.length > 0 ? (
          <ul className="search-drawer__list">
            {searchResults.map((text, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(text)}
                  className={cn('search-drawer__item', {
                    'search-drawer__item--last': index === searchResults.length - 1,
                  })}
                  aria-label={`Select doha: ${text.substring(0, 30)}...`}
                >
                  {formatCouplet(text).map((line: string, lineIndex: number) => (
                    <span className="search-drawer__item-line" key={lineIndex}>
                      {line}
                    </span>
                  ))}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="search-drawer__empty" role="status">
            No results found
          </p>
        )}
      </div>
    </>
  );
}

const MOBILE_QUERY = '(max-width: 639px)';

function subscribeToMediaQuery(callback: () => void): () => void {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getDirectionSnapshot(): DrawerDirection {
  return window.matchMedia(MOBILE_QUERY).matches ? 'bottom' : 'right';
}

function getServerSnapshot(): DrawerDirection {
  return 'right';
}

/**
 * Search drawer that slides in from the right on desktop and from the bottom on mobile.
 *
 * @param {SearchDrawerProps} props - The drawer props.
 * @returns {JSX.Element} The rendered search drawer.
 */
export default function SearchDrawer({ open, onClose, couplets, onSelect }: SearchDrawerProps): JSX.Element {
  const direction = useSyncExternalStore(subscribeToMediaQuery, getDirectionSnapshot, getServerSnapshot);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction={direction}
      ariaLabelledBy="search-drawer-title"
      className="search-drawer"
    >
      <SearchDrawerInner couplets={couplets} onSelect={onSelect} />
    </Drawer>
  );
}
