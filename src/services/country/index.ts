import axios from 'axios';
import Countries from 'public/data/countries.json';

import { API_BASE_URL } from '@/constant/env';
import { Country, Location } from '@/models/country';


 const getCountryBySearch = async (
  search: string,
  location: Location,
) => {
  const {data}: {data: Array<Country>} = await axios.get(
    API_BASE_URL + `/api/countries?search=${search}&lat=${location.lat}&lng=${location.lng}`,
  );
  return data;
};

 const getAllCountry = async () => {
  return Countries;
};

 const countryService = { 
  getCountryBySearch,
  getAllCountry,
};

export default countryService;
