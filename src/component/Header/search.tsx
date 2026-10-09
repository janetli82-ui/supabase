"use client";

import { searchPosts, SearchPostsType } from "@/lib/supabase/queries";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [input, setInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchPostsType | null>(
    null,
  );

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    const { data, error } = await searchPosts(input);
    if (error) throw new Error();
    setSearchResult(data);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          onChange={handleChange}
          placeholder="Search for posts"
          value={input}
          className="border border-border rounded-xl p-2 bg-white focus:outline-none focus:border focus:border-china-red"
        />
        <button onClick={handleClick} className="cursor-pointer absolute top-3.5 right-3">
          <FaSearch className="text-muted" />
        </button>
      </div>
      {searchResult && 
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {searchResult.map((result, index) =>
            <Link key={index} href={`/${result.slug}`} className="block px-4 py-3 hover:bg-linen transition-colors text-ink" onClick={() => {setSearchResult(null), setInput("")}}>{result.title}</Link>
          )}
        </div>
      
      }
    </div>
  );
};

export default Search;
