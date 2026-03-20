import { useState, type JSX } from 'react';

import { RiSearchLine } from 'react-icons/ri';

import SearchModal from '@/components/options/SearchModal';
import type { SearchInputProps } from '@/types';

/**
 * SearchInput component allows users to search and select a Doha from a list.
 * Provides both desktop and mobile interfaces for searching.
 *
 * @component
 * @param props - The component props
 * @returns The rendered search input component
 */
const SearchInput = ({ setCouplet, couplets }: SearchInputProps): JSX.Element => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  /**
   * Opens the search modal.
   */
  const handleSearch = (): void => {
    setIsSearchOpen(true);
  };

  /**
   * Handles the selection of a Doha from search results.
   *
   * @param selectedDoha - The selected Doha text
   */
  const handleSelectDoha = (selectedDoha: string): void => {
    setCouplet(selectedDoha);
    setIsSearchOpen(false);
  };

  return (
    <>
      <div className="relative hidden md:inline-flex">
        <button
          onClick={handleSearch}
          aria-label="Open doha search"
          aria-haspopup="dialog"
          className="focus:border-primary-600 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-stone-100 bg-stone-100 px-2 py-2 text-base text-stone-700 outline-hidden focus:ring-4 focus:ring-green-100"
        >
          <RiSearchLine aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Search for doha</span>
        </button>
      </div>

      <div className="relative md:hidden">
        <span className="absolute top-2/4 left-3 -translate-y-2/4">
          <RiSearchLine aria-hidden="true" className="h-5 w-5 text-stone-400" />
        </span>
        <input
          type="text"
          value=""
          placeholder="Looking for a specific doha? Search here…"
          onClick={handleSearch}
          readOnly
          aria-label="Search doha"
          aria-haspopup="dialog"
          className="focus:border-primary-600 h-12 w-full cursor-pointer truncate rounded-lg border-2 border-stone-100 bg-stone-100 px-4 py-2 pl-9 text-base text-stone-700 outline-hidden transition-all duration-300 ease-in-out focus:ring-4 focus:ring-green-100"
        />
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        couplets={couplets}
        onSelect={handleSelectDoha}
        aria-labelledby="search-modal-title"
      />
    </>
  );
};

export default SearchInput;
