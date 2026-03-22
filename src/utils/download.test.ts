/**
 * Tests for the download utility helpers.
 */

import { describe, it, expect } from 'vitest';

import { extractExtensionFromBase64, generateUniqueId } from './download';

// Group the download helper tests by module.
describe('download', () => {
  // Group the tests for the exported helper.
  describe('generateUniqueId', () => {
    // Verify a single expected behavior.
    it('should generate ID with default length of 8', () => {
      const id = generateUniqueId();
      // Assert the expected output for this scenario.
      expect(id.length).toBe(8);
    });

    // Verify a single expected behavior.
    it('should generate ID with custom length', () => {
      const id = generateUniqueId(16);
      // Assert the expected output for this scenario.
      expect(id.length).toBe(16);
    });

    // Verify a single expected behavior.
    it('should generate ID with length of 1', () => {
      const id = generateUniqueId(1);
      // Assert the expected output for this scenario.
      expect(id.length).toBe(1);
    });

    // Verify a single expected behavior.
    it('should only contain alphanumeric characters', () => {
      const id = generateUniqueId(100);
      // Assert the expected output for this scenario.
      expect(id).toMatch(/^[A-Za-z0-9]+$/);
    });

    // Verify a single expected behavior.
    it('should return a string', () => {
      const id = generateUniqueId();
      // Assert the expected output for this scenario.
      expect(typeof id).toBe('string');
    });

    // Verify a single expected behavior.
    it('should generate different IDs on each call', () => {
      const id1 = generateUniqueId(8);
      const id2 = generateUniqueId(8);
      // Assert the expected output for this scenario.
      expect(id1).not.toBe(id2);
    });
  });

  // Group the tests for the exported helper.
  describe('extractExtensionFromBase64', () => {
    // Verify a single expected behavior.
    it('should extract jpeg extension from data URL', () => {
      const dataUrl = 'data:image/jpeg;base64,/9j/4AAQ';
      const ext = extractExtensionFromBase64(dataUrl);
      // Assert the expected output for this scenario.
      expect(ext).toBe('jpeg');
    });

    // Verify a single expected behavior.
    it('should extract png extension from data URL', () => {
      const dataUrl = 'data:image/png;base64,iVBORw0KGgo=';
      const ext = extractExtensionFromBase64(dataUrl);
      // Assert the expected output for this scenario.
      expect(ext).toBe('png');
    });

    // Verify a single expected behavior.
    it('should extract gif extension from data URL', () => {
      const dataUrl = 'data:image/gif;base64,R0lGODlhAQ==';
      const ext = extractExtensionFromBase64(dataUrl);
      // Assert the expected output for this scenario.
      expect(ext).toBe('gif');
    });

    // Verify a single expected behavior.
    it('should extract webp extension from data URL', () => {
      const dataUrl = 'data:image/webp;base64,UklGRlY=';
      const ext = extractExtensionFromBase64(dataUrl);
      // Assert the expected output for this scenario.
      expect(ext).toBe('webp');
    });

    // Verify a single expected behavior.
    it('should handle data URL without base64 prefix', () => {
      const dataUrl = 'data:image/png;base64';
      const ext = extractExtensionFromBase64(dataUrl);
      // Assert the expected output for this scenario.
      expect(ext).toBe('png');
    });

    // Verify a single expected behavior.
    it('should extract extension when base64 data follows', () => {
      const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
      const ext = extractExtensionFromBase64(dataUrl);
      // Assert the expected output for this scenario.
      expect(ext).toBe('jpeg');
    });
  });
});
