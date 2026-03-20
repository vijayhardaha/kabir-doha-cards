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
 * @param {number} format - The number of lines to format the couplet into (default is 2).
 * @returns {string[]} - An array of formatted lines.
 */
export function formatCouplet(couplet: string, format: number = 2): string[] {
  // Split the couplet into lines based on new lines
  let lines: string[] = couplet
    .split(/(?<=।)(?!।)\s*/)
    .map((line: string) => line.trim())
    .flat();

  if (format !== 2) {
    lines = lines.map((line) => line.split(/(?<=,)\s*/)).flat();
  }

  return lines.filter(Boolean).slice(0, 4);
}
