# Country Search Engine

## Challenge

The challenge is to find the closest country based on the location and IP of the user.

## Demo

A live demo of the deployment can be found at [journi-code-challenge.vercel.app](https://journi-code-challenge.vercel.app/).

## Project Setup

First of all, I created a Next.js project using the `ts-nextjs-tailwind-starter` boilerplate as mentioned in the documentation. I need to use Next.js because I want to get the IP and information of the user, as well as latitude and longitude for searching the nearest countries. By doing this, I generated a server-side component to get the user's location, and each time, in each re-render or request, we don't need to get the user's location.

## Autocomplete Component

For creating the autocomplete, I didn't write it just for country information. Instead, I wrote a generic component to use with different types of models, and it can be used throughout the application with different models. The user just needs the proper information of the list based on its model to easily use the autocomplete.

### Features

- **Debounce Function**: Avoids making requests on every keystroke.
- **Keyboard Navigation**: Users can easily select between items using the arrow keys.
- **Close Result Modal**: The result modal closes when the user clicks outside the autocomplete.
- **Story Book**: Config storybook for create documentation in project

## Backend

The server side of the project contains a GET country API that filters countries based on the user's search and then sorts by the starting character of the user's entered key.

### Finding the Nearest Country

For finding the nearest country, I use the Haversine formula and sort based on the user's latitude and longitude.

## Project Structure

- **helpers**: Contains helper functions used throughout the project.
- **hooks**: Contains custom hooks.
- **models**: Contains models or types shared within the project.
- **services**: Contains all service and request calls to third-party APIs or the server.
- **components**: Contains the components used in the project.
- **app**: Contains the api and pages.

## Code Description and Samples

### Custom Hook for Fetching Country Information

The custom hook `UseGetCountries` fetches country information from the server:

```typescript
const { countries, loading } = UseGetCountries({
  location: latLng,
  search: search,
});
```

In UseGetCountries custom hooks, I use:

```typescript
const fetchCountries = useCallback(async () => {
```

Fetching data to avoid generating the function in each render and also handling the loading state by request call.

### Using `useMemo` for Results

In the country component, I use useMemo for the result of countries when we want to create a list for autocomplete:

```typescript
const searchableCountries = useMemo(
  () => generateCountriesForAutocomplete(countries),
  [countries]
);
```

It dosen't need to send all of the information to autocomplete, reducing the time of search and filter based on small models. Also, the generic model that accepts a model in autocomplete only accepts string and number fields, so we need to create appropriate data for autocomplete.

### Generic Autocomplete Component

The autocomplete component is generic. It can be used with various models and in different parts of the application.

```typescript
export type AutocompleteItem = Record<string, string | number>;
export type AutocompleteKey<T extends AutocompleteItem> = keyof T;

type AutocompleteProps<
  T extends AutocompleteItem,
  K extends AutocompleteKey<T>
> = {
  data: Array<T>;
  title: K;
  label?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<T | undefined>>;
  loading?: boolean;
  noResultsMessage?: string;
};
```

I defined:

```typescript
export type AutocompleteKey<T extends AutocompleteItem> = keyof T;
```

The model user just has to select one of the keys of the object model and can't choose a field or object key that does not exist in the model. Also, it has an auto-suggest feature.

### Handling Refs for Autocomplete Features

I define three refs for the page to handle autocomplete features:

```typescript
const inputRef = useRef<HTMLInputElement>(null);
const resultsRef = useRef<HTMLDivElement>(null);
const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
```

I create a ref for each item and add them to an array:

```typescript
const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
```

It helps to get the correct item that the user wants to highlight.

### Custom Debounce Hook

I create custom debounce hooks that can be used throughout the application:

```typescript
const debouncedValue = useDebounce<string>(filter, 500);
```

It handles the search value to reduce sending requests to the server with each key action by the user.

### Custom Hook to Handle Click Outside

I wrote a custom hook to manage and close the result modal of the search. It gets refs of the elements that should not do any action if the user clicks on them:

```typescript
const handleClickOutside = (event: MouseEvent) => {
  if (
    inputRef.current &&
    !inputRef.current.contains(event.target as Node) &&
    !resultsRef.current?.contains(event.target as Node)
  ) {
    setShowResults(false);
  }
};
```

### Handling Scroll and Highlight in Autocomplete

There are two main action functions for autocomplete:

```typescript
useEffect(() => {
  if (highlightedIndex >= 0 && highlightedIndex < itemRefs.current.length) {
    const highlightedItem = itemRefs.current[highlightedIndex];
    if (highlightedItem && resultsRef.current) {
      const { top: containerTop, bottom: containerBottom } =
        resultsRef.current.getBoundingClientRect();
      const { top: itemTop, bottom: itemBottom } =
        highlightedItem.getBoundingClientRect();
      if (itemTop < containerTop) {
        highlightedItem.scrollIntoView({ block: 'nearest' });
      } else if (itemBottom > containerBottom) {
        highlightedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }
}, [highlightedIndex]);
```

This handles the scroll of the result container. If the user works with the arrow keys to select an item, and the number of items becomes more than the height of the container, they can see the highlighted items. So I have to watch the selected or highlighted item to force the scroll to be near the item. and another is :

### Handling Key Down Events

```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'ArrowDown') {
    setHighlightedIndex((prevIndex) => (prevIndex + 1) % data.length);
  } else if (e.key === 'ArrowUp') {
    setHighlightedIndex(
      (prevIndex) => (prevIndex + data.length - 1) % data.length
    );
  } else if (e.key === 'Enter' && highlightedIndex >= 0) {
    handleSelectItem(data[highlightedIndex]);
  } else if (e.key === 'Escape') {
    setShowResults(false);
  }
};
```

This function handles and changes the index of the item for selection. The user can easily select an item using the keys, just changing the index highlighted in the function.

## Backend API

In the backend API, I wrote a GET API call with the endpoint `/api/countries?search=united&lat=37.7749&lng=-122.4194` for the query parameters. It gets user input information and responds with countries filtered by latitude and longitude.

### Getting Query Parameters

```typescript
const search = searchParams.get('search');
const lat = searchParams.get('lat');
const lng = searchParams.get('lng');
```

### Filtering Countries

First, it filters countries by using `trim()` to remove any leading or trailing spaces, and then uses `startsWith()` to search by the name of the countries:

```typescript
const filterCountries = countries.filter((country) =>
  country.name
    .trim()
    .toLocaleLowerCase()
    .startsWith(search.trim().toLocaleLowerCase())
);
```

### Sorting Results by Latitude and Longitude

The result must be sorted by latitude and longitude of the user input, so I use a helper function for sorting:

```typescript
countries.sort(function (a, b) {
  return (
    distance(selectedLat, selectedLng, a.latlng[0], a.latlng[1]) -
    distance(selectedLat, selectedLng, b.latlng[0], b.latlng[1])
  );
});
```

### Algorithm to Find Nearest Country

The algorithm for finding the nearest country is:

```typescript
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
```

That find nearset base on the location of the user
