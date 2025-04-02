"use client";
import React from "react";
import { Input } from "../../ui/input";
import { useSearchParams } from "next/navigation";
import { searchInputAction } from "@/actions/searchInputAction";

const SearchInput = () => {
  const params = useSearchParams();

  return (
    <form action={searchInputAction}>
      <div className="flex-1 mx-4 max-w-md">
        <Input
          type="text"
          name="search"
          defaultValue={params.get("search") || ""}
          placeholder="Search articles..."
          className="w-full px-4 py-2 rounded-md text-black dark:text-white bg-white dark:bg-black border border-gray-600 dark:border-gray-400 focus:outline-none"
        />
      </div>
      <button type="submit" className="hidden"></button>{" "}
      {/* Triggers form submission on Enter */}
    </form>
  );
};

export default SearchInput;
