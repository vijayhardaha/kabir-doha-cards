/**
 * Generates a unique identifier of a given length.
 *
 * @param {number} [length=8] - The length of the unique identifier to generate. Defaults to 8.
 * @returns {string} A unique identifier string.
 */
export const generateUniqueId = (length = 8) => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

/**
 * Extracts the file extension from a base64 data URL.
 *
 * @param {string} dataUrl - The base64 data URL from which to extract the file extension.
 * @returns {string} The file extension extracted from the data URL.
 */
export const extractExtensionFromBase64 = (dataUrl) => {
	const mimeType = dataUrl.split(",")[0];
	const extension = mimeType.split("/")[1].split(";")[0];
	return extension;
};
