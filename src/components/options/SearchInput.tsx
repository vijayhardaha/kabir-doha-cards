import { useCallback, useState, type JSX } from 'react';

import { RiSearchLine } from 'react-icons/ri';

import type { SearchInputProps } from '@/types';

import SearchDrawer from './SearchDrawer';

/**
 * Opens the searchable drawer for selecting a different doha.
 *
 * @param {SearchInputProps} props - The component props.
 * @returns {JSX.Element} The rendered search input controls.
 */
const SearchInput = ({ updateOptions, couplets }: SearchInputProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectDoha = useCallback(
    (selectedDoha: string): void => {
      updateOptions({ couplet: selectedDoha });
      setIsOpen(false);
    },
    [updateOptions]
  );

  return (
    <div className="search-input__toggle">
      <div className="search-input__toggle-wrapper">
        <span className="search-input__toggle-icon">
          <RiSearchLine aria-hidden="true" />
        </span>
        <input
          name="search-input"
          id="search-input"
          type="text"
          value=""
          placeholder="Looking for a specific doha? Search here…"
          onClick={() => setIsOpen(true)}
          readOnly
          aria-label="Search doha"
          aria-haspopup="dialog"
          className="search-input__toggle-field"
        />
      </div>

      <SearchDrawer open={isOpen} onClose={() => setIsOpen(false)} couplets={couplets} onSelect={handleSelectDoha} />
    </div>
  );
};

export default SearchInput;
