/**
 * Unit tests for share utility functions.
 * @package vitest
 */

import { describe, it, expect, vi } from 'vitest';

import { getShareUrl } from './share';

vi.mock('./seo', () => ({ getBaseUrl: () => 'https://kabirke-dohe.com' }));

describe('share', () => {
  describe('getShareUrl', () => {
    it('should generate WhatsApp share URL with default platform', () => {
      const url = getShareUrl();
      expect(url).toContain('https://wa.me/');
      expect(url).toContain('text=');
    });

    it('should generate WhatsApp URL when platform is whatsapp', () => {
      const url = getShareUrl('whatsapp');
      expect(url).toContain('https://wa.me/');
    });

    it('should generate WhatsApp URL when platform is wa', () => {
      const url = getShareUrl('wa');
      expect(url).toContain('https://wa.me/');
    });

    it('should generate Twitter URL when platform is twitter', () => {
      const url = getShareUrl('twitter');
      expect(url).toContain('https://twitter.com/intent/tweet');
    });

    it('should generate Twitter URL when platform is x', () => {
      const url = getShareUrl('x');
      expect(url).toContain('https://twitter.com/intent/tweet');
    });

    it('should encode message in URL', () => {
      const url = getShareUrl();
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).toContain('Check out this amazing Kabir Doha Cards maker!');
      expect(decodedUrl).toContain('https://kabirke-dohe.com');
    });

    it('should throw error for unsupported platform', () => {
      expect(() => getShareUrl('facebook' as 'whatsapp')).toThrow('Unsupported platform');
    });

    it('should include text parameter in URL', () => {
      const url = getShareUrl();
      expect(url).toMatch(/[?&]text=/);
    });
  });
});
