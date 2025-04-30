'use client';

import { RHFInput, TProps } from '@/lib/rhf';
import { icons } from '@/ui';
import {
  useEffect,
  useState,
  ChangeEvent,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { FieldValues } from 'react-hook-form';

type TSearchInputProps<T extends FieldValues, R> = TProps<T> & {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  searchResult: R[] | null;
  setSearchResult: Dispatch<SetStateAction<R[] | null>>;
  notFoundMessage?: string;
  renderSearchResult?: () => ReactNode;
  onResultSelect?: (item: R[]) => void;
  selectedData: R | null;
  setSelectedData: Dispatch<SetStateAction<R | null>>;
  minChars?: number;
  debounceMs?: number;
};

export const SearchComponent = <T extends Record<string, unknown>, R>({
  inputValue,
  setInputValue,
  isSearching,
  searchResult,
  setSearchResult,
  notFoundMessage = 'Not Found',
  renderSearchResult,
  onResultSelect,
  selectedData,
  setSelectedData,
  minChars = 3,
  debounceMs = 300,
  ...props
}: TSearchInputProps<T, R>) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const LoaderIcon = icons['LoaderCircle'];
  const [showSearchResult, setShowSearchResult] = useState(false);
  const shouldShowNotFoundMessage = Array.isArray(searchResult) && searchResult.length === 0;

  useEffect(() => {
    if (inputValue.length >= minChars && !selectedData) {
      setShowSearchResult(true);
    }
    if (selectedData) {
      setShowSearchResult(false);
    }
  }, [inputValue, minChars, selectedData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchResult(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (selectedData) {
      setSelectedData(null);
    }

    if (val.length < minChars) {
      setSearchResult(null);
    }
  };

  const handleFocus = () => {
    if (searchResult && !selectedData) {
      setShowSearchResult(true);
    }
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <RHFInput
        {...props}
        onChange={handleInputChange}
        value={inputValue}
        onFocus={() => handleFocus()}
      />

      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
        </div>
      )}

      {showSearchResult && (
        <div className="absolute z-10 mt-1 w-full rounded-md  bg-card shadow-lg">
          {isSearching ? (
            <div className="text-2 p-2 text-muted-foreground">Searching...</div>
          ) : shouldShowNotFoundMessage ? (
            <div className="text-2 p-2 text-muted-foreground">{notFoundMessage}</div>
          ) : (
            renderSearchResult && renderSearchResult()
          )}
        </div>
      )}
    </div>
  );
};
