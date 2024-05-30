import { Country } from "@/models/country";

export const filterCountry = (
  countries: Array<Country>,
  search: string,
  lat: number,
  lng: number,
): Array<Country> => {
  const filterCountries = countries.filter(country =>
    country.name
      .trim()
      .toLocaleLowerCase()
      .startsWith(search.trim().toLocaleLowerCase()),
  );
  return sortCountries(filterCountries, lat, lng);
};

const sortCountries = (
  countries: Array<Country>,
  selectedLat: number,
  selectedLng: number,
): Array<Country> => {
  return countries.sort(function (a, b) {
    return (
      distance(selectedLat, selectedLng, a.latlng[0] , a.latlng[1]) -
      distance(selectedLat, selectedLng, b.latlng[0] , b.latlng[1])
    );
  });
};

const distance = function (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
};
