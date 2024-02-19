'use client'
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType>({searchQuery:'',setSearchQuery:()=>{}});

export const SearchProvider = ({ children }:{children:React.ReactNode}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

