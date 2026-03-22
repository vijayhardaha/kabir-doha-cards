/**
 * Tests for the class name merging utility.
 */

import { describe, it, expect } from 'vitest';

import { cn } from './classnames';

// Group the class name utility tests by module.
describe('classnames', () => {
  // Group the tests for the exported helper.
  describe('cn', () => {
    // Verify a single expected behavior.
    it('should handle single string class', () => {
      // Assert the expected output for this scenario.
      expect(cn('px-4')).toBe('px-4');
    });

    // Verify a single expected behavior.
    it('should handle multiple string classes', () => {
      // Assert the expected output for this scenario.
      expect(cn('px-4', 'py-2', 'bg-red-500')).toBe('px-4 py-2 bg-red-500');
    });

    // Verify a single expected behavior.
    it('should ignore undefined values', () => {
      // Assert the expected output for this scenario.
      expect(cn('px-4', undefined, 'py-2')).toBe('px-4 py-2');
    });

    // Verify a single expected behavior.
    it('should ignore boolean false values', () => {
      // Assert the expected output for this scenario.
      expect(cn('px-4', false, 'py-2')).toBe('px-4 py-2');
    });

    // Verify a single expected behavior.
    it('should include class when condition is true', () => {
      const isActive = true;
      // Assert the expected output for this scenario.
      expect(cn('px-4', isActive && 'active', 'py-2')).toBe('px-4 active py-2');
    });

    // Verify a single expected behavior.
    it('should handle object with boolean values', () => {
      const isActive = true;
      const isDisabled = false;
      // Assert the expected output for this scenario.
      expect(cn('px-4', { active: isActive, disabled: isDisabled })).toBe('px-4 active');
    });

    // Verify a single expected behavior.
    it('should handle array of strings', () => {
      // Assert the expected output for this scenario.
      expect(cn(['px-4', 'py-2'], 'bg-red-500')).toBe('px-4 py-2 bg-red-500');
    });

    // Verify a single expected behavior.
    it('should handle mixed inputs', () => {
      const isActive = true;
      const isDisabled = false;
      // Assert the expected output for this scenario.
      expect(cn('px-4', ['py-2', 'bg-red-500'], { active: isActive, disabled: isDisabled })).toBe(
        'px-4 py-2 bg-red-500 active'
      );
    });

    // Verify a single expected behavior.
    it('should merge duplicate tailwind classes correctly', () => {
      // Assert the expected output for this scenario.
      expect(cn('px-4 py-2', 'py-2')).toBe('px-4 py-2');
    });

    // Verify a single expected behavior.
    it('should handle empty string', () => {
      // Assert the expected output for this scenario.
      expect(cn('')).toBe('');
    });

    // Verify a single expected behavior.
    it('should ignore null values', () => {
      // Assert the expected output for this scenario.
      expect(cn('px-4', null as unknown as string, 'py-2')).toBe('px-4 py-2');
    });
  });
});
