import { Location } from "@/models/country"

export type CountriesProps = {
  latLng : Location 
}

export type CountryAutocompleteItem = {
  title : string,
  id: string
} 