import React, { createContext, useContext, useState } from "react";
import { searchPosts } from "../api/post";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState();

  const handleSearch = async (query) => {
    const { error, posts: {posts} } = searchPosts(query);

    if (error) return console.log(error);
    const transformedPosts = posts?.map((post) => post.post);
    setSearchResult(transformedPosts);
    console.log(transformedPosts);
  };

  const resetSearch = () => {
    setSearchResult([]);
  };

  return (
    <SearchContext.Provider value={{ searchResult, handleSearch, resetSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
export default SearchProvider;
