import { NextResponse } from "next/server";

/**
 * Handles the API request to fetch search results from an external API.
 *
 * @async
 * @function POST
 * @param {Object} request - The request object.
 * @returns {Promise<NextResponse>} The API response with the search results.
 */
export async function POST(request) {
	try {
		const { search } = await request.json();

		if (!search) {
			return NextResponse.json({ success: false, message: "Search term is required" }, { status: 400 });
		}

		const response = await fetch("https://kabir-ke-dohe-api.vercel.app/api/couplets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				s: search,
				exactMatch: true,
				searchWithin: "couplet",
				orderBy: "couplet_hindi",
				order: "ASC",
				perPage: 10,
			}),
		});

		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}

		const data = await response.json();

		if (data.success && data.data && data.data.couplets) {
			const results = data.data.couplets.map((c) => c.couplet_hindi);
			return NextResponse.json({ success: true, results });
		}

		return NextResponse.json({ success: false, message: "No results found" }, { status: 404 });
	} catch (error) {
		console.error("Error fetching data from external API:", error);
		return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
	}
}
