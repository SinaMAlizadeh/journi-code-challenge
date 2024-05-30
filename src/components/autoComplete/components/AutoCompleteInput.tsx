import React from 'react'

import TimesButton from '@/components/buttons/TimesButton';
import Input from '@/components/input/input'
import Loading from '@/components/Loading';


type Props = {
  label: string;
  filter: string;
  loading: boolean;
  clearSearch: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>
}

function AutoCompleteInput({ label, filter, loading, inputRef, handleKeyDown, handleInputChange, clearSearch }: Props) {
  return (
    <>
      <div className='text-left'>
        <h4>
          {label}
        </h4>
      </div>
      <div className="flex rounded-mds w-full">
        <Input
          ref={inputRef}
          value={filter}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
        />
        {filter && !loading && (
          <div className='absolute right-2 top-1/2'>
            <TimesButton onClick={clearSearch} />
          </div>
        )}
        {loading && <div className='absolute right-2 top-1/2'>  <Loading /></div>}
      </div>
    </>
  )
}

export default AutoCompleteInput