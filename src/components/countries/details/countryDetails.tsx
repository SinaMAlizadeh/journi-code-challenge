
import DetailsItem from "@/components/countries/details/item/detailsItem"
import NextImage from "@/components/NextImage"

import { Country } from "@/models/country"

type Props = {
  country: Country
}

function CountryDetails({ country }: Props) {
  return <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow text-left">
    <NextImage
      useSkeleton
      className='w-10'
      src={country.flags.png}
      width='180'
      height='180'
      alt='Icon' />
    <h5 className="my-2 text-2xl font-semibold tracking-tight">{country?.name}</h5>
    <div className="flex flex-col gap-4">
      <DetailsItem title='Capital' value={country?.capital} />
      <DetailsItem title='Population' value={country?.population.toLocaleString()} />
      <DetailsItem title='Area' value={country?.area?.toLocaleString() + " km²"} />
      <DetailsItem title='NativeName' value={country?.nativeName} />
      <DetailsItem title='Timezones' value={country?.timezones.toString()} />
    </div>
  </div>
}

export default CountryDetails