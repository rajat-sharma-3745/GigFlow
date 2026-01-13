import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl flex items-center gap-2"
    >
      {/* Input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
        focus:ring-2 focus:ring-primary-500 focus:border-transparent
        outline-none transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="cursor-pointer group flex items-center justify-center gap-2
      px-3 sm:px-4 py-3 rounded-xl
      bg-linear-to-r from-primary-600 to-primary-700
      text-white shadow-sm hover:shadow-md
      transition-all active:scale-95"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
