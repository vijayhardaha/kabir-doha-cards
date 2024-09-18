import { NextResponse } from "next/server";

/**
 * Handles the API request to fetch a random Doha from an external API.
 *
 * @async
 * @function POST
 * @returns {Promise<NextResponse>} The API response with the random Doha.
 */
export async function POST() {
	try {
		const response = await fetch("https://kabir-ke-dohe-api.vercel.app/api/couplets", {
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
			return NextResponse.json({ success: true, couplet: results[0] });
		}

		return NextResponse.json({ success: false, message: "No results found" }, { status: 404 });
	} catch (error) {
		console.error("Error fetching data from external API:", error);
		return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
	}
}
