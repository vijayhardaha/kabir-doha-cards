import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes
 * to avoid conflicts and redundancies.
 *
 * @param {...any} inputs - A list of class name inputs, which can include strings,
 * arrays, or objects. These inputs are processed by `clsx` to handle conditional
 * class names and then merged by `twMerge` to resolve Tailwind CSS conflicts.
 * @returns {string} - A single string of combined and merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
