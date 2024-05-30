
import { NextRequest, NextResponse } from 'next/server';

import { filterCountry } from '@/helper/filterCountry';
import countryService from '@/services/country';

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
      return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 });
    }

    const country_data = await countryService.getAllCountry();
    const filtered_country_data = filterCountry(country_data, search, latitude, longitude);

    return NextResponse.json(filtered_country_data);
    
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}