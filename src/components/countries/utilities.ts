import { CountryAutocompleteItem } from "@/components/countries/type";

import { Country } from "@/models/country";

export const generateCountriesForAutocomplete = (countries : Array<Country>) : Array<CountryAutocompleteItem>  => {
  return countries.map((country) => ({
    title : country.name,
    id : country.alpha2Code
   }))
}

export const getSelectedCountry = (countryAlpha : string | undefined, countries : Array<Country>) : Country | undefined  => {
  if(countryAlpha)
  return countries.find((country) => country.alpha2Code === countryAlpha);
}