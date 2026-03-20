import toast from 'react-hot-toast';

import type { ToastType } from '@/types';

/**
 * Displays a toast notification based on the provided message and type.
 *
 * @param message - The message to display in the toast
 * @param type - The type of toast ('success' or 'error')
 */
export const showToast = (message: string, type: ToastType = 'success'): void => {
  const options = { style: { backgroundColor: '#1f2937', color: '#ffffff' } };

  if (type === 'success') {
    toast.success(message, options);
  } else if (type === 'error') {
    toast.error(message, options);
  } else {
    console.warn("Invalid toast type specified. Use 'success' or 'error'.");
  }
};
