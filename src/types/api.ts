export type FetchType = 'random' | 'search';

export interface FetchOptions {
  type: FetchType;
  search?: string;
}
