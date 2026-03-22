/**
 * Unit tests for fetchCouplets utility functions.
 * @package vitest
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import fetchCouplets from './fetchCouplets';

describe('fetchCouplets', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      statusText: 'OK',
      json: async () => ({ success: true, data: { posts: [' couplet 1', 'couplet 2', 'couplet 3'] } }),
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return couplets data on successful fetch', async () => {
    const result = await fetchCouplets('random');
    expect(result.data).toEqual([' couplet 1', 'couplet 2', 'couplet 3']);
    expect(result.error).toBeNull();
  });

  it('should call fetch with correct URL for random type', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await fetchCouplets('random');
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('kabir-ke-dohe-api.vercel.app/api/couplets/search'),
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should call fetch with correct URL for search type', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await fetchCouplets('search', 'test query');
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('search_query=test'), expect.any(Object));
  });

  it('should include Content-Type header', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await fetchCouplets('random');
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: expect.objectContaining({ 'Content-Type': 'application/json' }) })
    );
  });

  it('should return error message when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false, statusText: 'Internal Server Error' } as Response);

    const result = await fetchCouplets('random');
    expect(result.data).toEqual([]);
    expect(result.error).toBe('Network response was not ok: Internal Server Error');
  });

  it('should return error message when response data is invalid', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      statusText: 'OK',
      json: async () => ({ success: false, data: null }),
    } as Response);

    const result = await fetchCouplets('random');
    expect(result.data).toEqual([]);
    expect(result.error).toBe('No results found for random Doha.');
  });

  it('should return error message when fetch throws', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    const result = await fetchCouplets('random');
    expect(result.data).toEqual([]);
    expect(result.error).toBe('Network error');
  });

  it('should handle unknown error during fetch', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce('Unknown error');

    const result = await fetchCouplets('random');
    expect(result.data).toEqual([]);
    expect(result.error).toBe('Unknown error occurred while fetching couplets');
  });

  it('should extract posts from successful response', async () => {
    const result = await fetchCouplets('random');
    expect(result.data).toHaveLength(3);
    expect(result.data[0]).toBe(' couplet 1');
  });
});
