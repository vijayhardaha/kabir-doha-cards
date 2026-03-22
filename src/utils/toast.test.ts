/**
 * Tests for the toast utility helper.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { showToast } from './toast';

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

// Group the toast helper tests by module.
describe('toast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Group the tests for the exported helper.
  describe('showToast', () => {
    // Verify a single expected behavior.
    it('should call toast.success with message and options', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Success message');
      // Assert the expected output for this scenario.
      expect(toast.success).toHaveBeenCalledWith('Success message', {
        style: { backgroundColor: '#1f2937', color: '#ffffff' },
      });
    });

    // Verify a single expected behavior.
    it('should call toast.error with message when type is error', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Error message', 'error');
      // Assert the expected output for this scenario.
      expect(toast.error).toHaveBeenCalledWith('Error message', {
        style: { backgroundColor: '#1f2937', color: '#ffffff' },
      });
    });

    // Verify a single expected behavior.
    it('should call toast.success by default when type is not specified', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Test message');
      // Assert the expected output for this scenario.
      expect(toast.success).toHaveBeenCalled();
      // Assert the expected output for this scenario.
      expect(toast.error).not.toHaveBeenCalled();
    });

    // Verify a single expected behavior.
    it('should use correct toast options for styling', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Styled message');
      // Assert the expected output for this scenario.
      expect(toast.success).toHaveBeenCalledWith(
        'Styled message',
        expect.objectContaining({ style: { backgroundColor: '#1f2937', color: '#ffffff' } })
      );
    });

    // Verify a single expected behavior.
    it('should handle empty message string', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('');
      // Assert the expected output for this scenario.
      expect(toast.success).toHaveBeenCalledWith('', expect.any(Object));
    });

    // Verify a single expected behavior.
    it('should handle long message string', async () => {
      const { default: toast } = await import('react-hot-toast');
      const longMessage = 'A'.repeat(1000);
      showToast(longMessage);
      // Assert the expected output for this scenario.
      expect(toast.success).toHaveBeenCalledWith(longMessage, expect.any(Object));
    });

    // Verify a single expected behavior.
    it('should pass correct options object structure', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Test', 'success');
      // Assert the expected output for this scenario.
      expect(toast.success).toHaveBeenCalledWith(
        'Test',
        expect.objectContaining({
          style: expect.objectContaining({ backgroundColor: expect.any(String), color: expect.any(String) }),
        })
      );
    });
  });
});
