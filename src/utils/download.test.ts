/**
 * Tests for the download utility helpers.
 */

import { describe, it, expect } from 'vitest';

import { getFileName } from './download';

// Group the download helper tests by module.
describe('download', () => {
  // Group the tests for the exported helper.
  describe('getFileName', () => {
    // Verify a single expected behavior.
    it('should start with kabir-doha-image prefix', () => {
      const filename = getFileName();
      // Assert the expected output for this scenario.
      expect(filename.startsWith('kabir-doha-image_')).toBe(true);
    });

    // Verify a single expected behavior.
    it('should end with .png extension', () => {
      const filename = getFileName();
      // Assert the expected output for this scenario.
      expect(filename.endsWith('.png')).toBe(true);
    });

    // Verify a single expected behavior.
    it('should contain date and time segments', () => {
      const filename = getFileName();
      const pattern = /^kabir-doha-image_\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2}\.png$/;
      // Assert the expected output for this scenario.
      expect(filename).toMatch(pattern);
    });

    // Verify a single expected behavior.
    it('should not contain spaces', () => {
      const filename = getFileName();
      // Assert the expected output for this scenario.
      expect(filename.includes(' ')).toBe(false);
    });

    // Verify a single expected behavior.
    it('should be a valid string', () => {
      const filename = getFileName();
      // Assert the expected output for this scenario.
      expect(typeof filename).toBe('string');
      // Assert the expected output for this scenario.
      expect(filename.length).toBeGreaterThan(0);
    });
  });
});
