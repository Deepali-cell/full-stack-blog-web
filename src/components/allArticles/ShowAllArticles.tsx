"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Button } from "../ui/button";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Articles from "./Articles";
import ArticleSkeleton from "./ArticleSkeleton";
import { search_query } from "@/lib/fetchSearchQuery/search_query";

interface SearchGetPropType {
  searchParams?: { search?: string; page?: string };
}

const ShowAllArticles: React.FC<SearchGetPropType> = ({
  searchParams = {},
}) => {
  const searchText = searchParams?.search ?? "";
  const currentPage = parseInt(searchParams?.page ?? "1", 10);
  const limit = 3; // Number of articles per page

  const [articles, setArticles] = useState<any[]>([]);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { articles, totalArticles } = await search_query(
          searchText,
          currentPage,
          limit
        );
        setArticles(articles);
        setTotalArticles(totalArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
      setLoading(false);
    };

    fetchArticles();
  }, [searchText, currentPage]);

  const totalPages = Math.ceil(totalArticles / limit);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-14">
      <main>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4 dark:text-white">
          All Articles
        </h1>

        {loading ? <ArticleSkeleton /> : <Articles articles={articles} />}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="outline"
            className="flex items-center"
            disabled={currentPage <= 1}
            asChild
          >
            <a href={`?search=${searchText}&page=${currentPage - 1}`}>
              <MoveLeftIcon className="w-4 h-4 mr-1" />
              Prev
            </a>
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              className={`px-4 py-2 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md`}
              asChild
            >
              <a href={`?search=${searchText}&page=${i + 1}`}>{i + 1}</a>
            </Button>
          ))}

          <Button
            variant="outline"
            className="flex items-center"
            disabled={currentPage >= totalPages}
            asChild
          >
            <a href={`?search=${searchText}&page=${currentPage + 1}`}>
              Next
              <MoveRightIcon className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ShowAllArticles;
