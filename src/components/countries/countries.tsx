'use client'

import { useMemo, useState } from 'react';

import UseGetCountries from '@/hooks/useGetCountries'

import Autocomplete from '@/components/autoComplete/autoComplete';
import CountryDetails from '@/components/countries/details/countryDetails';
import { CountriesProps, CountryAutocompleteItem } from '@/components/countries/type'
import { generateCountriesForAutocomplete, getSelectedCountry } from '@/components/countries/utilities';

export function Countries({ latLng }: CountriesProps) {

  const [search, setSearch] = useState<string>('');

  const [selectedAutocompleteItem, setSelectedAutocompleteItem] = useState<CountryAutocompleteItem>();

  const { countries, loading } = UseGetCountries({ location: latLng, search: search });

  const searchableCountries = useMemo(() => generateCountriesForAutocomplete(countries), [countries]);

  const selectedCountry = useMemo(() => getSelectedCountry(selectedAutocompleteItem?.id, countries), [countries, selectedAutocompleteItem?.id]);

  return <>
    <Autocomplete data={searchableCountries} loading={loading} setSearch={setSearch} title='title' setSelected={setSelectedAutocompleteItem} label='Find your closest country' />
    {selectedCountry && <div className='mt-3 w-full'> <CountryDetails country={selectedCountry} /></div>}
  </>
}

