import { useCallback, useEffect, useState } from "react"

import { Country, Location } from "@/models/country"
import countryService from "@/services/country";

type Props = {
  location : Location,
  search : string

}

function UseGetCountries({location , search} :Props) {
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const fetchCountries = useCallback(async () => {
    setLoading(true)
    const countries = await countryService.getCountryBySearch(search, location);
    setLoading(false)
    setCountries(countries);
  }, [location, search]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return {
    countries,
    loading
  }
}

export default UseGetCountries