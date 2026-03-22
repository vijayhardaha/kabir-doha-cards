import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names and resolves conflicting Tailwind utility classes.
 *
 * @param {...ClassValue[]} inputs - The class name inputs to merge.
 * @returns {string} The merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
