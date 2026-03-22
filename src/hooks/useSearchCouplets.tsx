'use client';

import { useState, useEffect, useCallback } from 'react';

import debounce from 'lodash/debounce';

import fetchCouplets from '@/utils/fetch-couplets';

/**
 * Describes the state and actions for debounced couplet search.
 */
export interface SearchCoupletsState {
  searchTerm: string;
  searchResults: string[];
  loading: boolean;
  setSearchTerm: (term: string) => void;
  resetSearch: () => void;
}

/**
 * Manages debounced search against the couplets API, falling back to the
 * initial couplet list when the search term is empty.
 *
 * @param {string[]} couplets - The initial couplet list used as the default result set.
 * @returns {SearchCoupletsState} The search state and actions.
 */
export function useSearchCouplets(couplets: string[]): SearchCoupletsState {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(couplets);
  const [loading, setLoading] = useState(false);

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

  /** Clears the search term to show all couplets. */
  const resetSearch = useCallback((): void => {
    setSearchTerm('');
  }, []);

  return { searchTerm, searchResults, loading, setSearchTerm, resetSearch };
}
