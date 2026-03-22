/**
 * Tests for the share utility helpers.
 */

import { describe, it, expect, vi } from 'vitest';

import { getShareUrl } from './share';

vi.mock('./seo', () => ({ getBaseUrl: () => 'https://kabirke-dohe.com' }));

// Group the share helper tests by module.
describe('share', () => {
  // Group the tests for the exported helper.
  describe('getShareUrl', () => {
    // Verify a single expected behavior.
    it('should generate WhatsApp share URL with default platform', () => {
      const url = getShareUrl();
      // Assert the expected output for this scenario.
      expect(url).toContain('https://wa.me/');
      // Assert the expected output for this scenario.
      expect(url).toContain('text=');
    });

    // Verify a single expected behavior.
    it('should generate WhatsApp URL when platform is whatsapp', () => {
      const url = getShareUrl('whatsapp');
      // Assert the expected output for this scenario.
      expect(url).toContain('https://wa.me/');
    });

    // Verify a single expected behavior.
    it('should generate WhatsApp URL when platform is wa', () => {
      const url = getShareUrl('wa');
      // Assert the expected output for this scenario.
      expect(url).toContain('https://wa.me/');
    });

    // Verify a single expected behavior.
    it('should generate Twitter URL when platform is twitter', () => {
      const url = getShareUrl('twitter');
      // Assert the expected output for this scenario.
      expect(url).toContain('https://twitter.com/intent/tweet');
    });

    // Verify a single expected behavior.
    it('should generate Twitter URL when platform is x', () => {
      const url = getShareUrl('x');
      // Assert the expected output for this scenario.
      expect(url).toContain('https://twitter.com/intent/tweet');
    });

    // Verify a single expected behavior.
    it('should encode message in URL', () => {
      const url = getShareUrl();
      const decodedUrl = decodeURIComponent(url);
      // Assert the expected output for this scenario.
      expect(decodedUrl).toContain('Check out this amazing Kabir Doha Cards maker!');
      // Assert the expected output for this scenario.
      expect(decodedUrl).toContain('https://kabirke-dohe.com');
    });

    // Verify a single expected behavior.
    it('should throw error for unsupported platform', () => {
      // Assert the expected output for this scenario.
      expect(() => getShareUrl('facebook' as 'whatsapp')).toThrow('Unsupported platform');
    });

    // Verify a single expected behavior.
    it('should include text parameter in URL', () => {
      const url = getShareUrl();
      // Assert the expected output for this scenario.
      expect(url).toMatch(/[?&]text=/);
    });
  });
});
