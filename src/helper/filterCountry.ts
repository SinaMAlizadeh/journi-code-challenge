import { Country } from '@/models/country';

// Filter countries based on the search value
// First filter by search value, then sort by distance from the selected location
export const filterCountry = (
  countries: Array<Country>,
  search: string,
  lat: number,
  lng: number
): Array<Country> => {
  // Filter by starting characters
  // We need trim() to remove any leading or trailing spaces
  const filterCountries = countries.filter((country) =>
    country.name
      .trim()
      .toLocaleLowerCase()
      .startsWith(search.trim().toLocaleLowerCase())
  );
  // Sort the filtered countries based on the distance from the selected location
  return sortCountries(filterCountries, lat, lng);
};

// Sort countries based on the distance from the selected location
const sortCountries = (
  countries: Array<Country>,
  selectedLat: number,
  selectedLng: number
): Array<Country> => {
  return countries.sort(function (a, b) {
    return (
      distance(selectedLat, selectedLng, a.latlng[0], a.latlng[1]) -
      distance(selectedLat, selectedLng, b.latlng[0], b.latlng[1])
    );
  });
};

/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 * https://en.wikipedia.org/wiki/Haversine_formula
 * @param lat1 - Latitude of the first point
 * @param lon1 - Longitude of the first point
 * @param lat2 - Latitude of the second point
 * @param lon2 - Longitude of the second point
 * @returns The distance between the two points in kilometers
 */
// Calculate the distance between two points on the Earth's surface
const distance = function (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Convert degrees to radians
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;

  // Apply Haversine formula
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; // Convert to kilometers
  return dist;
};
