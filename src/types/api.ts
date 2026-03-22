/**
 * Lists the supported API fetch modes for loading couplets.
 */
export type FetchType = 'random' | 'search';

/**
 * Describes the query options used when fetching couplets.
 */
export interface FetchOptions {
  type: FetchType;
  search?: string;
}
