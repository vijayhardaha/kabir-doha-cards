/**
 * Fetches random Doha couplets from the server.
 *
 * @param {number} perPage - The number of couplets to fetch.
 * @returns {Promise<Array<string> | null>} The fetched couplets or null in case of error.
 */
export async function fetchCouplets(perPage = 1) {
	try {
		const response = await fetch("/api/random", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ perPage }),
		});

		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}

		const data = await response.json();

		if (data.success && data.couplets) {
			return data.couplets;
		} else {
			console.warn("No results found for random Doha.");
			return [];
		}
	} catch (error) {
		console.error("Error fetching random Doha:", error);
		return [];
	}
}

export default fetchCouplets;
