import { useCallback, useEffect, useState } from 'react';

import { Country, Location } from '@/models/country';
import countryService from '@/services/country';

type Props = {
  location: Location;
  search: string;
};

function UseGetCountries({ location, search }: Props) {
  const [countries, setCountries] = useState<Array<Country>>([]);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch countries based on the search value
  // Define useCallback to avoid creating a new function on every render
  const fetchCountries = useCallback(async () => {
    // If there is a search value, fetch countries
    if (search) {
      setLoading(true);
      const countries = await countryService.getCountryBySearch(
        search,
        location
      );
      setLoading(false);
      setCountries(countries);
    }
    // If there is no search value, clear the countries, I'm assuming that the countries are not needed anymore and reduce request to the server
    else {
      setCountries([]);
    }
  }, [location, search]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return {
    countries,
    loading,
  };
}

export default UseGetCountries;
