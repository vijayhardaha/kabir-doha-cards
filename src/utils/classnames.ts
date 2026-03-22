import { clsx, type ClassValue } from 'clsx';

/**
 * Merges class names into a single string.
 *
 * @param {...ClassValue[]} inputs - The class name inputs to merge.
 * @returns {string} The merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
