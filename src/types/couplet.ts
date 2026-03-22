/**
 * Represents a single Kabir doha as plain text.
 */
export type Couplet = string;

/**
 * Represents a list of couplets returned by the API.
 */
export type CoupletList = Couplet[];

/**
 * Defines the normalized response returned by couplet fetch utilities.
 */
export interface FetchCoupletsResponse {
  data: CoupletList;
  error: string | null;
}
