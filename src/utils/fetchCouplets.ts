import type { FetchCoupletsResponse, FetchType } from '@/types';

/**
 * Fetches Doha couplets from the server.
 *
 * @param type - The type of fetch: 'random' or 'search'
 * @param search - Optional search term for search type
 * @returns The fetched couplets with any error message
 */
export async function fetchCouplets(type: FetchType, search?: string): Promise<FetchCoupletsResponse> {
  const randomNumber = Math.round(Math.random() * (200 - 1)) + 1;
  const body = type === 'search' ? { search: String(search) } : { page: String(randomNumber) };

  let errorMessage: string | null = null;
  let results: string[] = [];

  try {
    const params = new URLSearchParams(
      Object.entries(body).filter(([, v]) => v !== undefined) as [string, string][]
    ).toString();

    const response = await fetch(`https://kabir-ke-dohe-api.vercel.app/api/couplets/search?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success && data.data && data.data.posts) {
      results = data.data.posts;
    } else {
      throw new Error('No results found for random Doha.');
    }
  } catch (error: Error | unknown) {
    errorMessage = error instanceof Error ? error.message : 'Unknown error occurred while fetching couplets';
  }

  return { data: results, error: errorMessage };
}

export default fetchCouplets;
