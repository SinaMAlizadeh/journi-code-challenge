
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

    let country_data = await countryService.getAllCountry();
    
    if (search) {
      country_data = filterCountry(
        country_data,
        search.toString(),
        Number(lat?.toString()),
        Number(lng?.toString()),
      );
      
    }
    console.log(country_data)
    return NextResponse.json(country_data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}