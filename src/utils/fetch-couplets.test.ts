/**
 * Tests for the couplet fetching utility.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import fetchCouplets from './fetch-couplets';

// Group the couplet fetching tests by module.
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

  // Verify a single expected behavior.
  it('should return couplets data on successful fetch', async () => {
    const result = await fetchCouplets('random');
    // Assert the expected output for this scenario.
    expect(result.data).toEqual([' couplet 1', 'couplet 2', 'couplet 3']);
    // Assert the expected output for this scenario.
    expect(result.error).toBeNull();
  });

  // Verify a single expected behavior.
  it('should call fetch with correct URL for random type', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await fetchCouplets('random');
    // Assert the expected output for this scenario.
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('kabir-ke-dohe-api.vercel.app/api/couplets/search'),
      expect.objectContaining({ method: 'GET' })
    );
  });

  // Verify a single expected behavior.
  it('should call fetch with correct URL for search type', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await fetchCouplets('search', 'test query');
    // Assert the expected output for this scenario.
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('search_query=test'), expect.any(Object));
  });

  // Verify a single expected behavior.
  it('should include Content-Type header', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await fetchCouplets('random');
    // Assert the expected output for this scenario.
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: expect.objectContaining({ 'Content-Type': 'application/json' }) })
    );
  });

  // Verify a single expected behavior.
  it('should return error message when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false, statusText: 'Internal Server Error' } as Response);

    const result = await fetchCouplets('random');
    // Assert the expected output for this scenario.
    expect(result.data).toEqual([]);
    // Assert the expected output for this scenario.
    expect(result.error).toBe('Network response was not ok: Internal Server Error');
  });

  // Verify a single expected behavior.
  it('should return error message when response data is invalid', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      statusText: 'OK',
      json: async () => ({ success: false, data: null }),
    } as Response);

    const result = await fetchCouplets('random');
    // Assert the expected output for this scenario.
    expect(result.data).toEqual([]);
    // Assert the expected output for this scenario.
    expect(result.error).toBe('No results found for random Doha.');
  });

  // Verify a single expected behavior.
  it('should return error message when fetch throws', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    const result = await fetchCouplets('random');
    // Assert the expected output for this scenario.
    expect(result.data).toEqual([]);
    // Assert the expected output for this scenario.
    expect(result.error).toBe('Network error');
  });

  // Verify a single expected behavior.
  it('should handle unknown error during fetch', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce('Unknown error');

    const result = await fetchCouplets('random');
    // Assert the expected output for this scenario.
    expect(result.data).toEqual([]);
    // Assert the expected output for this scenario.
    expect(result.error).toBe('Unknown error occurred while fetching couplets');
  });

  // Verify a single expected behavior.
  it('should extract posts from successful response', async () => {
    const result = await fetchCouplets('random');
    // Assert the expected output for this scenario.
    expect(result.data).toHaveLength(3);
    // Assert the expected output for this scenario.
    expect(result.data[0]).toBe(' couplet 1');
  });
});
