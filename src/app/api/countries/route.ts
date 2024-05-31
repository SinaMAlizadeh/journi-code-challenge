import { NextRequest, NextResponse } from 'next/server';

import { filterCountry } from '@/helper/filterCountry';
import countryService from '@/services/country';

/**
 * GET /api/countries
 * Example: /api/countries?search=united&lat=37.7749&lng=-122.4194
 *
 * Retrieves and filters a list of countries based on the search term provided.
 * Optionally sorts results by distance from a specified location.
 *
 * @param {NextRequest} req - The request object containing query parameters.
 * @returns {NextResponse} The response object containing filtered country data or an error message.
 */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!search) {
      return NextResponse.json([]);
    }

    const latitude = Number(lat);
    const longitude = Number(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json(
        { error: 'Invalid coordinates' },
        { status: 400 }
      );
    }
    // Fetch all countries from json file
    const country_data = await countryService.getAllCountry();
    const filtered_country_data = filterCountry(
      country_data,
      search,
      latitude,
      longitude
    );

    return NextResponse.json(filtered_country_data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
