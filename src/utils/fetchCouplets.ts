type fetchType = 'random' | 'search';

/**
 * Fetches random Doha couplets from the server.
 *
 * @param {number} perPage - The number of couplets to fetch.
 * @returns {Promise<Array<string> | null>} The fetched couplets or null in case of error.
 */
export async function fetchCouplets(
  type: fetchType,
  search?: string
): Promise<{ data: string[]; error: string | null }> {
  const randomNumber = Math.round(Math.random() * (200 - 1)) + 1; // Random page number for random fetch
  const body =
    type === 'search'
      ? { search: search, sort_by: 'text_hi', sort_order: 'asc', per_page: 10 }
      : { per_page: 1, page: randomNumber };

  let errorMessage: string | null = null;
  let results: string[] = [];

  try {
    const response = await fetch('https://kabir-ke-dohe-api.vercel.app/api/couplets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success && data.data && data.data.posts) {
      results = data.data.posts.map((c: Record<string, unknown>) => c.text_hi);
    } else {
      throw new Error('No results found for random Doha.');
    }
  } catch (error: Error | unknown) {
    errorMessage = error instanceof Error ? error.message : 'Unknwn error occurred while fetching couplets';
  }

  return { data: results, error: errorMessage };
}

export default fetchCouplets;
