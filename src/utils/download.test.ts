/**
 * Unit tests for download utility functions.
 * @package vitest
 */

import { describe, it, expect } from 'vitest';

import { extractExtensionFromBase64, generateUniqueId } from './download';

describe('download', () => {
  describe('generateUniqueId', () => {
    it('should generate ID with default length of 8', () => {
      const id = generateUniqueId();
      expect(id.length).toBe(8);
    });

    it('should generate ID with custom length', () => {
      const id = generateUniqueId(16);
      expect(id.length).toBe(16);
    });

    it('should generate ID with length of 1', () => {
      const id = generateUniqueId(1);
      expect(id.length).toBe(1);
    });

    it('should only contain alphanumeric characters', () => {
      const id = generateUniqueId(100);
      expect(id).toMatch(/^[A-Za-z0-9]+$/);
    });

    it('should return a string', () => {
      const id = generateUniqueId();
      expect(typeof id).toBe('string');
    });

    it('should generate different IDs on each call', () => {
      const id1 = generateUniqueId(8);
      const id2 = generateUniqueId(8);
      expect(id1).not.toBe(id2);
    });
  });

  describe('extractExtensionFromBase64', () => {
    it('should extract jpeg extension from data URL', () => {
      const dataUrl = 'data:image/jpeg;base64,/9j/4AAQ';
      const ext = extractExtensionFromBase64(dataUrl);
      expect(ext).toBe('jpeg');
    });

    it('should extract png extension from data URL', () => {
      const dataUrl = 'data:image/png;base64,iVBORw0KGgo=';
      const ext = extractExtensionFromBase64(dataUrl);
      expect(ext).toBe('png');
    });

    it('should extract gif extension from data URL', () => {
      const dataUrl = 'data:image/gif;base64,R0lGODlhAQ==';
      const ext = extractExtensionFromBase64(dataUrl);
      expect(ext).toBe('gif');
    });

    it('should extract webp extension from data URL', () => {
      const dataUrl = 'data:image/webp;base64,UklGRlY=';
      const ext = extractExtensionFromBase64(dataUrl);
      expect(ext).toBe('webp');
    });

    it('should handle data URL without base64 prefix', () => {
      const dataUrl = 'data:image/png;base64';
      const ext = extractExtensionFromBase64(dataUrl);
      expect(ext).toBe('png');
    });

    it('should extract extension when base64 data follows', () => {
      const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
      const ext = extractExtensionFromBase64(dataUrl);
      expect(ext).toBe('jpeg');
    });
  });
});
