/**
 * Calculates a responsive font size based on the preview width.
 *
 * @param {number} screenWidth - The current preview width in pixels.
 * @param {number} [baseFontSize=3] - The base font size in rem.
 * @returns {string} The calculated font size in rem.
 */
export function calcFontSize(screenWidth: number, baseFontSize: number = 3): string {
  const ratio = screenWidth / 600;
  const newFontSize = baseFontSize * ratio;
  return `${parseFloat(newFontSize.toString()).toFixed(3)}rem`;
}

/**
 * Splits a couplet into display lines for the preview layout.
 *
 * @param {string} couplet - The couplet text to format.
 * @param {number} [format=2] - The requested line formatting mode.
 * @returns {string[]} The formatted lines, limited to four entries.
 */
export function formatCouplet(couplet: string, format: number = 2): string[] {
  // Split on a single danda while leaving double-danda punctuation intact.
  let lines: string[] = couplet
    .split(/(?<=।)(?!।)\s*/)
    .map((line: string) => line.trim())
    .flat();

  if (format !== 2) {
    lines = lines.map((line) => line.split(/(?<=,)\s*/)).flat();
  }

  return lines.filter(Boolean).slice(0, 4);
}
