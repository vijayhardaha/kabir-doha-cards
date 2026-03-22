/**
 * Unit tests for image utility functions.
 * @package vitest
 */

import { describe, it, expect } from 'vitest';

import { getFileName } from './image';

describe('image', () => {
  describe('getFileName', () => {
    it('should start with kabir-doha-image prefix', () => {
      const filename = getFileName();
      expect(filename.startsWith('kabir-doha-image_')).toBe(true);
    });

    it('should end with .png extension', () => {
      const filename = getFileName();
      expect(filename.endsWith('.png')).toBe(true);
    });

    it('should contain date and time segments', () => {
      const filename = getFileName();
      const pattern = /^kabir-doha-image_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.png$/;
      expect(filename).toMatch(pattern);
    });

    it('should not contain spaces', () => {
      const filename = getFileName();
      expect(filename.includes(' ')).toBe(false);
    });

    it('should be a valid string', () => {
      const filename = getFileName();
      expect(typeof filename).toBe('string');
      expect(filename.length).toBeGreaterThan(0);
    });
  });
});
