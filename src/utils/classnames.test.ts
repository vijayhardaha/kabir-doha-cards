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
      expect(cn('btn')).toBe('btn');
    });

    // Verify a single expected behavior.
    it('should handle multiple string classes', () => {
      // Assert the expected output for this scenario.
      expect(cn('btn', 'btn-primary', 'mt-2')).toBe('btn btn-primary mt-2');
    });

    // Verify a single expected behavior.
    it('should ignore undefined values', () => {
      // Assert the expected output for this scenario.
      expect(cn('btn', undefined, 'mt-2')).toBe('btn mt-2');
    });

    // Verify a single expected behavior.
    it('should ignore boolean false values', () => {
      // Assert the expected output for this scenario.
      expect(cn('btn', false, 'mt-2')).toBe('btn mt-2');
    });

    // Verify a single expected behavior.
    it('should include class when condition is true', () => {
      const isActive = true;
      // Assert the expected output for this scenario.
      expect(cn('btn', isActive && 'active', 'mt-2')).toBe('btn active mt-2');
    });

    // Verify a single expected behavior.
    it('should handle object with boolean values', () => {
      const isActive = true;
      const isDisabled = false;
      // Assert the expected output for this scenario.
      expect(cn('btn', { active: isActive, disabled: isDisabled })).toBe('btn active');
    });

    // Verify a single expected behavior.
    it('should handle array of strings', () => {
      // Assert the expected output for this scenario.
      expect(cn(['btn', 'mt-2'], 'btn-primary')).toBe('btn mt-2 btn-primary');
    });

    // Verify a single expected behavior.
    it('should handle mixed inputs', () => {
      const isActive = true;
      const isDisabled = false;
      // Assert the expected output for this scenario.
      expect(cn('btn', ['mt-2', 'btn-primary'], { active: isActive, disabled: isDisabled })).toBe(
        'btn mt-2 btn-primary active'
      );
    });

    // Verify a single expected behavior.
    it('should handle empty string', () => {
      // Assert the expected output for this scenario.
      expect(cn('')).toBe('');
    });

    // Verify a single expected behavior.
    it('should ignore null values', () => {
      // Assert the expected output for this scenario.
      expect(cn('btn', null as unknown as string, 'mt-2')).toBe('btn mt-2');
    });
  });
});
