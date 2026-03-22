/**
 * Tests for the SEO URL helpers.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { safeCanonical, getBaseUrl } from './seo';

// Group the SEO helper tests by exported function.
describe('safeCanonical', () => {
  // Verify a single expected behavior.
  it('should remove leading slashes', () => {
    // Assert the expected output for this scenario.
    expect(safeCanonical('/about')).toBe('about');
  });

  // Verify a single expected behavior.
  it('should remove trailing slashes', () => {
    // Assert the expected output for this scenario.
    expect(safeCanonical('about/')).toBe('about');
  });

  // Verify a single expected behavior.
  it('should handle slashes on both sides', () => {
    // Assert the expected output for this scenario.
    expect(safeCanonical('/about/')).toBe('about');
  });

  // Verify a single expected behavior.
  it('should return empty string for root', () => {
    // Assert the expected output for this scenario.
    expect(safeCanonical('')).toBe('');
    // Assert the expected output for this scenario.
    expect(safeCanonical('/')).toBe('');
  });

  // Verify a single expected behavior.
  it('should handle whitespace', () => {
    // Assert the expected output for this scenario.
    expect(safeCanonical('  about  ')).toBe('about');
  });
});

// Group the SEO helper tests by exported function.
describe('getBaseUrl', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  // Verify a single expected behavior.
  it('should return localhost when no env vars set', () => {
    const url = getBaseUrl();
    // Assert the expected output for this scenario.
    expect(url).toMatch(/^https?:\/\/localhost/);
  });

  // Verify a single expected behavior.
  it('should add https:// prefix to URL without scheme', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'example.com';
    const url = getBaseUrl();
    // Assert the expected output for this scenario.
    expect(url).toBe('https://example.com');
  });

  // Verify a single expected behavior.
  it('should keep http:// scheme when already present', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'http://example.com';
    const url = getBaseUrl();
    // Assert the expected output for this scenario.
    expect(url).toBe('http://example.com');
  });

  // Verify a single expected behavior.
  it('should keep https:// scheme when already present', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    const url = getBaseUrl();
    // Assert the expected output for this scenario.
    expect(url).toBe('https://example.com');
  });

  // Verify a single expected behavior.
  it('should remove trailing slash from URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'example.com/';
    const url = getBaseUrl();
    // Assert the expected output for this scenario.
    expect(url).toBe('https://example.com');
  });

  // Verify a single expected behavior.
  it('should trim whitespace from URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = '  example.com  ';
    const url = getBaseUrl();
    // Assert the expected output for this scenario.
    expect(url).toBe('https://example.com');
  });
});
