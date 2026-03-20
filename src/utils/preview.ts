/**
 * Calculates the dynamic font size based on the screen width and a base size.
 *
 * @param {number} screenWidth - The current screen width in pixels.
 * @param {number} baseWidth - The reference screen width where the base font size applies (e.g., 600px).
 * @param {number} baseFontSize - The font size at the base width (e.g., 3rem).
 * @returns {string} - The calculated font size in rem.
 */
export function calcFontSize(screenWidth: number, baseFontSize: number = 3): string {
  // Calculate the ratio based on the current screen width and base width
  const ratio = screenWidth / 600;

  // Calculate the new font size
  const newFontSize = baseFontSize * ratio;

  // Return the font size as a string with 'rem' units
  return `${parseFloat(newFontSize.toString()).toFixed(3)}rem`; // Ensuring minimum font size of 1rem
}

/**
 * Formats a Couplet into a maximum of 4 lines, breaking by commas and new lines.
 *
 * @param {string} couplet - The couplet text to be formatted.
 * @returns {string[]} - An array of formatted lines.
 */
export function formatCouplet(couplet: string): string[] {
  // Split the couplet into lines based on new lines
  const lines: string[] = couplet
    .split(/(?<=।)\s*/)
    .map((line: string) => line.trim().split(/(?<=,)\s*/))
    .flat();

  // Ensure the number of lines does not exceed the maximum of 4
  const maxLines = 4;

  return lines.slice(0, maxLines);
}
