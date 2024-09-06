/**
 * API route to fetch search results from an external API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const response = await fetch("https://kabirkedohe.vercel.app/api/couplets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ orderBy: "random", perPage: 1 }),
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			const data = await response.json();

			if (data.success && data.data && data.data.couplets) {
				const results = data.data.couplets.map((c) => c.couplet_hindi);
				return res.status(200).json({ success: true, couplet: results[0] });
			}

			return res.status(404).json({ success: false, message: "No results found" });
		} catch (error) {
			console.error("Error fetching data from external API:", error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	} else {
		// Handle any non-POST request methods
		return res.status(405).json({ success: false, message: "Method not allowed" });
	}
}
