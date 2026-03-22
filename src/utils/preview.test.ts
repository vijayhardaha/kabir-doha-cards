/**
 * Tests for the preview utility helpers.
 */

import { describe, it, expect } from 'vitest';

import { calcFontSize, formatCouplet } from './preview';

// Group the preview helper tests by module.
describe('preview', () => {
  // Group the tests for the exported helper.
  describe('calcFontSize', () => {
    // Verify a single expected behavior.
    it('should return 3rem at 600px width', () => {
      const result = calcFontSize(600);
      // Assert the expected output for this scenario.
      expect(result).toBe('3.000rem');
    });

    // Verify a single expected behavior.
    it('should double font size at 1200px width', () => {
      const result = calcFontSize(1200);
      // Assert the expected output for this scenario.
      expect(result).toBe('6.000rem');
    });

    // Verify a single expected behavior.
    it('should halve font size at 300px width', () => {
      const result = calcFontSize(300);
      // Assert the expected output for this scenario.
      expect(result).toBe('1.500rem');
    });

    // Verify a single expected behavior.
    it('should handle custom base font size', () => {
      const result = calcFontSize(600, 2);
      // Assert the expected output for this scenario.
      expect(result).toBe('2.000rem');
    });

    // Verify a single expected behavior.
    it('should handle zero width', () => {
      const result = calcFontSize(0);
      // Assert the expected output for this scenario.
      expect(result).toBe('0.000rem');
    });

    // Verify a single expected behavior.
    it('should return string with rem unit', () => {
      const result = calcFontSize(600);
      // Assert the expected output for this scenario.
      expect(result).toMatch(/^\d+\.\d{3}rem$/);
    });
  });

  // Group the tests for the exported helper.
  describe('formatCouplet', () => {
    // Verify a single expected behavior.
    it('should split couplet by Hindi period (।)', () => {
      const couplet = 'पहली पंक्ति। दूसरी पंक्ति।';
      const result = formatCouplet(couplet);
      // Assert the expected output for this scenario.
      expect(result).toEqual(['पहली पंक्ति।', 'दूसरी पंक्ति।']);
    });

    // Verify a single expected behavior.
    it('should trim leading whitespace from lines', () => {
      const couplet = '  पहली पंक्ति।   दूसरी पंक्ति  ';
      const result = formatCouplet(couplet);
      // Assert the expected output for this scenario.
      expect(result).toEqual(['पहली पंक्ति।', 'दूसरी पंक्ति']);
    });

    // Verify a single expected behavior.
    it('should limit lines to maximum of 4', () => {
      const couplet = 'लाइन 1। लाइन 2। लाइन 3। लाइन 4। लाइन 5। लाइन 6।';
      const result = formatCouplet(couplet);
      // Assert the expected output for this scenario.
      expect(result.length).toBe(4);
    });

    // Verify a single expected behavior.
    it('should split by comma when format is not 2', () => {
      const couplet = 'पहला भाग, दूसरा भाग। तीसरा भाग';
      const result = formatCouplet(couplet, 4);
      // Assert the expected output for this scenario.
      expect(result).toEqual(['पहला भाग,', 'दूसरा भाग।', 'तीसरा भाग']);
    });

    // Verify a single expected behavior.
    it('should handle empty string', () => {
      const result = formatCouplet('');
      // Assert the expected output for this scenario.
      expect(result).toEqual([]);
    });

    // Verify a single expected behavior.
    it('should handle couplet with no separators', () => {
      const couplet = 'एक पंक्ति';
      const result = formatCouplet(couplet);
      // Assert the expected output for this scenario.
      expect(result).toEqual(['एक पंक्ति']);
    });

    // Verify a single expected behavior.
    it('should default to format 2', () => {
      const couplet = 'part1, part2। part3';
      const result = formatCouplet(couplet);
      // Assert the expected output for this scenario.
      expect(result).toEqual(['part1, part2।', 'part3']);
    });

    // Verify a single expected behavior.
    it('should return non-empty array for valid input', () => {
      const result = formatCouplet('Valid couplet text');
      // Assert the expected output for this scenario.
      expect(Array.isArray(result)).toBe(true);
      // Assert the expected output for this scenario.
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
