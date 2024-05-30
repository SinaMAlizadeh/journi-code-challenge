
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import AutoCompleteItem from '@/components/autoComplete/components/AutoCompleteItem';
import { AutocompleteItem, AutocompleteKey } from '@/components/autoComplete/type';
import TimesButton from '@/components/buttons/TimesButton';
import Input from '@/components/input/input';
import Loading from '@/components/Loading';


type AutocompleteProps<T extends AutocompleteItem, K extends AutocompleteKey<T>> = {
  data: Array<T>;
  title: K;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<T | undefined>>;
  loading?: boolean;
};

const Autocomplete = <T extends AutocompleteItem, K extends AutocompleteKey<T>>({
  data,
  title,
  search,
  setSearch,
  setSelected,
  loading,
}: AutocompleteProps<T, K>) => {
  const [showResults, setShowResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) && !resultsRef.current?.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSelected(undefined);
    setShowResults(true);
  };

  const handleSelectItem = (item: T) => {
    setSelected(item);
    setSearch(item[title].toString());
    setShowResults(false);
    setHighlightedIndex(-1);
  };

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

  const clearSearch = () => {
    setSearch('');
    if (setSelected)
      setSelected(undefined);
    setShowResults(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="relative w-full">
      <div className="flex rounded-mds w-full">
        <Input
          ref={inputRef}
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
        />
        {search && !loading && (
          <TimesButton onClick={clearSearch} />
        )}
        {loading && <div className='absolute right-2 top-2'>  <Loading /></div>}
      </div>
      {showResults && data.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute border mt-1 rounded-md bg-white w-full max-h-60 overflow-y-auto z-10"
        >
          {data.map((item, index) => (
            <AutoCompleteItem title={item[title].toString()} key={index} highlightedIndex={highlightedIndex} index={index} itemRefs={itemRefs} onMouseEnter={() => setHighlightedIndex(index)} onClick={() => handleSelectItem(item)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
