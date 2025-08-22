"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Articles from "./Articles";
import ArticleSkeleton from "./ArticleSkeleton";
import { search_query } from "@/lib/fetchSearchQuery/search_query";

export type ArticleType = {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage: string;
  createdAt: Date;
  authorId: string; // <-- add this
  author: {
    name: string;
    email: string;
    imageUrl: string | null;
  };
  comments: {
    id: string;
    body: string;
    authorId: string;
    articleId: string;
    createdAt: Date;
  }[];
};

const ShowAllArticles = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchText = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = 3;

  const [articles, setArticles] = useState<ArticleType[]>([]);
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

  // Function to change page without reloading
  const changePage = (page: number) => {
    router.push(`?search=${searchText}&page=${page}`);
  };

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
            onClick={() => changePage(currentPage - 1)}
          >
            <MoveLeftIcon className="w-4 h-4 mr-1" />
            Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              className={`px-4 py-2 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            className="flex items-center"
            disabled={currentPage >= totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Next
            <MoveRightIcon className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ShowAllArticles;
