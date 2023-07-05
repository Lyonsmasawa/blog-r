import { useState } from "react";
import { useSearch } from "../context/SearchProvider";
import { AiOutlineClose } from "react-icons/ai";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const { handleSearch, resetSearch, searchResult } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleSearch(query);
  };

  const handleReset = () => {
    resetSearch();
    setQuery("");
  };
  const handleKeyDown = (e) => {
    if (e.key == "Escape") {
      resetSearch();
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Search..."
        className="border border-gray-500 outline-none rounded p-1 focus:ring-1 ring-blue-500 w-56"
      />
      {!searchResult?.length && (
        <button
          onClick={handleReset}
          className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"
        >
          <AiOutlineClose />
        </button>
      )}
    </form>
  );
};

export default SearchForm;
