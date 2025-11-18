import React, { useState } from "react";
import search from "../../assets/search.svg";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="pl-10 font-poppins pt-[60px] pb-[13px]">

    <form
      onSubmit={handleSubmit}
      className="flex items-center border rounded-lg overflow-hidden w-[532px] h-[40px] "
    >
                    <img src={search} alt="" className="w-[19.03px] h-[19px] ml-[10px]" />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search here"
        className="flex-1 px-3 py-2 text-sm focus:outline-none"
      />
       <button
          className="bg-[#EAECEC] p-[5px] mr-[6px] mt-[5px] mb-[5px] rounded text-sm font-medium text-[#4D4D4D] hover:bg-gray-200"
        >
          Search
        </button>
    </form>
    </div>
  );
};

export default SearchBar;
