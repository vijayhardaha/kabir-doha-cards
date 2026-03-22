/**
 * Unit tests for toast utility functions.
 * @package vitest
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { showToast } from './toast';

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

describe('toast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('showToast', () => {
    it('should call toast.success with message and options', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Success message');
      expect(toast.success).toHaveBeenCalledWith('Success message', {
        style: { backgroundColor: '#1f2937', color: '#ffffff' },
      });
    });

    it('should call toast.error with message when type is error', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Error message', 'error');
      expect(toast.error).toHaveBeenCalledWith('Error message', {
        style: { backgroundColor: '#1f2937', color: '#ffffff' },
      });
    });

    it('should call toast.success by default when type is not specified', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Test message');
      expect(toast.success).toHaveBeenCalled();
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should use correct toast options for styling', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Styled message');
      expect(toast.success).toHaveBeenCalledWith(
        'Styled message',
        expect.objectContaining({ style: { backgroundColor: '#1f2937', color: '#ffffff' } })
      );
    });

    it('should handle empty message string', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('');
      expect(toast.success).toHaveBeenCalledWith('', expect.any(Object));
    });

    it('should handle long message string', async () => {
      const { default: toast } = await import('react-hot-toast');
      const longMessage = 'A'.repeat(1000);
      showToast(longMessage);
      expect(toast.success).toHaveBeenCalledWith(longMessage, expect.any(Object));
    });

    it('should pass correct options object structure', async () => {
      const { default: toast } = await import('react-hot-toast');
      showToast('Test', 'success');
      expect(toast.success).toHaveBeenCalledWith(
        'Test',
        expect.objectContaining({
          style: expect.objectContaining({ backgroundColor: expect.any(String), color: expect.any(String) }),
        })
      );
    });
  });
});
