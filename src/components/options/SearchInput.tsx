import { useState, type JSX } from 'react';

import { RiSearchLine } from 'react-icons/ri';

import SearchModal from '@/components/options/SearchModal';
import type { SearchInputProps } from '@/types';

/**
 * Opens the searchable modal for selecting a different doha.
 *
 * @param {SearchInputProps} props - The component props.
 * @returns {JSX.Element} The rendered search input controls.
 */
const SearchInput = ({ updateOptions, couplets }: SearchInputProps): JSX.Element => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (): void => {
    setIsSearchOpen(true);
  };

  const handleSelectDoha = (selectedDoha: string): void => {
    updateOptions({ couplet: selectedDoha });
    setIsSearchOpen(false);
  };

  return (
    <>
      <div className="search-input__toggle">
        <button
          onClick={handleSearch}
          aria-label="Open doha search"
          aria-haspopup="dialog"
          className="search-input__toggle"
        >
          <RiSearchLine aria-hidden="true" className="search-input__toggle-icon" />
        </button>
      </div>

      <div className="search-input__mobile">
        <div className="search-input__mobile-wrapper">
          <span className="search-input__mobile-icon">
            <RiSearchLine aria-hidden="true" />
          </span>
          <input
            type="text"
            value=""
            placeholder="Looking for a specific doha? Search here…"
            onClick={handleSearch}
            readOnly
            aria-label="Search doha"
            aria-haspopup="dialog"
            className="search-input__mobile-field"
          />
        </div>
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
