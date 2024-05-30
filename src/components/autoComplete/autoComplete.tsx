
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';

import AutoCompleteInput from '@/components/autoComplete/components/AutoCompleteInput';
import AutoCompleteItem from '@/components/autoComplete/components/AutoCompleteItem';
import ResultContainer from '@/components/autoComplete/components/ResultContainer';
import UseHandleClickOutSide from '@/components/autoComplete/hooks/useHandleClickOutSide';
import { AutocompleteItem, AutocompleteKey } from '@/components/autoComplete/type';


type AutocompleteProps<T extends AutocompleteItem, K extends AutocompleteKey<T>> = {
  data: Array<T>;
  title: K;
  label?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<T | undefined>>;
  loading?: boolean;
  noResultsMessage?: string;
};

const Autocomplete = <T extends AutocompleteItem, K extends AutocompleteKey<T>>({
  data,
  label,
  title,
  setSearch,
  setSelected,
  loading,
  noResultsMessage = "There is no results"
}: AutocompleteProps<T, K>) => {
  const [showResults, setShowResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [filter, setFilter] = useState<string>('');
  const debouncedValue = useDebounce<string>(filter, 500);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  UseHandleClickOutSide({ inputRef, resultsRef, setShowResults });

  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < itemRefs.current.length) {
      const highlightedItem = itemRefs.current[highlightedIndex];
      if (highlightedItem && resultsRef.current) {
        const { top: containerTop, bottom: containerBottom } = resultsRef.current.getBoundingClientRect();
        const { top: itemTop, bottom: itemBottom } = highlightedItem.getBoundingClientRect();
        if (itemTop < containerTop) {
          highlightedItem.scrollIntoView({ block: 'nearest' });
        } else if (itemBottom > containerBottom) {
          highlightedItem.scrollIntoView({ block: 'nearest' });
        }
      }
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % data.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex + data.length - 1) % data.length);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleSelectItem(data[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setSelected(undefined);
    setShowResults(true);
  };

  const handleSelectItem = (item: T) => {
    setSelected(item);
    setSearch(item[title].toString());
    setFilter(item[title].toString());
    setShowResults(false);
    setHighlightedIndex(-1);
  };

  const clearSearch = () => {
    setSearch('');
    setFilter('');
    setSelected(undefined);
    setShowResults(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="relative w-full">
      <AutoCompleteInput clearSearch={clearSearch} filter={filter} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} inputRef={inputRef} label={label || 'Search'} loading={loading || false} />

      {showResults && data.length > 0 && (
        <ResultContainer resultsRef={resultsRef}>
          {data.map((item, index) => (
            <AutoCompleteItem title={item[title].toString()} key={index} highlightedIndex={highlightedIndex} index={index} itemRefs={itemRefs} onMouseEnter={() => setHighlightedIndex(index)} onClick={() => handleSelectItem(item)} />
          ))}
        </ResultContainer>
      )}

      {showResults && debouncedValue && data.length == 0 && (
        <ResultContainer resultsRef={resultsRef}>
          <small className="block p-2 text-gray-400">{noResultsMessage}</small>
        </ResultContainer>
      )}
    </div >
  );
};

export default Autocomplete;
