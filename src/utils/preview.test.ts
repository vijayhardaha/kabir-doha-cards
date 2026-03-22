/**
 * Unit tests for preview utility functions.
 * @package vitest
 */

import { describe, it, expect } from 'vitest';

import { calcFontSize, formatCouplet } from './preview';

describe('preview', () => {
  describe('calcFontSize', () => {
    it('should return 3rem at 600px width', () => {
      const result = calcFontSize(600);
      expect(result).toBe('3.000rem');
    });

    it('should double font size at 1200px width', () => {
      const result = calcFontSize(1200);
      expect(result).toBe('6.000rem');
    });

    it('should halve font size at 300px width', () => {
      const result = calcFontSize(300);
      expect(result).toBe('1.500rem');
    });

    it('should handle custom base font size', () => {
      const result = calcFontSize(600, 2);
      expect(result).toBe('2.000rem');
    });

    it('should handle zero width', () => {
      const result = calcFontSize(0);
      expect(result).toBe('0.000rem');
    });

    it('should return string with rem unit', () => {
      const result = calcFontSize(600);
      expect(result).toMatch(/^\d+\.\d{3}rem$/);
    });
  });

  describe('formatCouplet', () => {
    it('should split couplet by Hindi period (।)', () => {
      const couplet = 'पहली पंक्ति। दूसरी पंक्ति।';
      const result = formatCouplet(couplet);
      expect(result).toEqual(['पहली पंक्ति।', 'दूसरी पंक्ति।']);
    });

    it('should trim leading whitespace from lines', () => {
      const couplet = '  पहली पंक्ति।   दूसरी पंक्ति  ';
      const result = formatCouplet(couplet);
      expect(result).toEqual(['पहली पंक्ति।', 'दूसरी पंक्ति']);
    });

    it('should limit lines to maximum of 4', () => {
      const couplet = 'लाइन 1। लाइन 2। लाइन 3। लाइन 4। लाइन 5। लाइन 6।';
      const result = formatCouplet(couplet);
      expect(result.length).toBe(4);
    });

    it('should split by comma when format is not 2', () => {
      const couplet = 'पहला भाग, दूसरा भाग। तीसरा भाग';
      const result = formatCouplet(couplet, 4);
      expect(result).toEqual(['पहला भाग,', 'दूसरा भाग।', 'तीसरा भाग']);
    });

    it('should handle empty string', () => {
      const result = formatCouplet('');
      expect(result).toEqual([]);
    });

    it('should handle couplet with no separators', () => {
      const couplet = 'एक पंक्ति';
      const result = formatCouplet(couplet);
      expect(result).toEqual(['एक पंक्ति']);
    });

    it('should default to format 2', () => {
      const couplet = 'part1, part2। part3';
      const result = formatCouplet(couplet);
      expect(result).toEqual(['part1, part2।', 'part3']);
    });

    it('should return non-empty array for valid input', () => {
      const result = formatCouplet('Valid couplet text');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
