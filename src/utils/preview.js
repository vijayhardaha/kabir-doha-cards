/**
 * Calculates the dynamic font size based on the screen width and a base size.
 *
 * @param {number} screenWidth - The current screen width in pixels.
 * @param {number} baseWidth - The reference screen width where the base font size applies (e.g., 600px).
 * @param {number} baseFontSize - The font size at the base width (e.g., 3rem).
 * @returns {string} - The calculated font size in rem.
 */
export function calcFontSize(screenWidth, baseFontSize = 3) {
	// Calculate the ratio based on the current screen width and base width
	const ratio = screenWidth / 600;

	// Calculate the new font size
	const newFontSize = baseFontSize * ratio;

	// Return the font size as a string with 'rem' units
	return `${newFontSize}rem`; // Ensuring minimum font size of 1rem
}

/**
 * Formats a Couplet into a maximum of 4 lines, breaking by commas and new lines.
 *
 * @param {string} couplet - The couplet text to be formatted.
 * @returns {string[]} - An array of formatted lines.
 */
export function formatCouplet(couplet) {
	// Split the couplet into lines based on new lines
	const lines = couplet.split("\n").map((line) => line.trim());

	// Process each line to preserve commas and break lines appropriately
	const formattedLines = lines.reduce((acc, line) => {
		// Preserve commas by splitting on line breaks but not on commas
		const parts = line.split(/(?<=,)\s*/); // Split after each comma and trim spaces
		return [...acc, ...parts];
	}, []);

	// Ensure the number of lines does not exceed the maximum of 4
	const maxLines = 4;
	return formattedLines.slice(0, maxLines);
}
