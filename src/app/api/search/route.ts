import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles the API request to fetch search results from an external API.
 *
 * @async
 * @function POST
 * @param {NextRequest} request - The request object.
 * @returns {Promise<NextResponse>} The API response with the search results.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { search } = await request.json();

    if (!search) {
      return NextResponse.json({ success: false, message: 'Search term is required' }, { status: 400 });
    }

    const response = await fetch('https://kabir-ke-dohe-api.vercel.app/api/couplets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search: search, sort_by: 'text_hi', sort_order: 'asc', per_page: 10 }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success && data.data && data.data.posts) {
      const results = data.data.posts.map((c: Record<string, unknown>) => c.text_hi);
      return NextResponse.json({ success: true, results });
    }

    return NextResponse.json({ success: false, message: 'No results found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
