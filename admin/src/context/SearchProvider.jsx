import React, { createContext, useContext, useState } from "react";
import { searchPosts } from "../api/post";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NoificationProvider";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const [searchResult, setSearchResult] = useState();

  const handleSearch = async (query) => {
    const {
      error,
      posts: { posts },
    } = searchPosts(query);

    // if (error) return updateNotification("error", error);
    if (error) console.log("error", error);

    const transformedPosts = posts?.map((post) => post.post);
    setSearchResult(transformedPosts);
    console.log(transformedPosts);
    navigate("/");
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
