export type AutocompleteItem = Record<string, string | number>;

export type AutocompleteKey<T extends AutocompleteItem> = keyof T;