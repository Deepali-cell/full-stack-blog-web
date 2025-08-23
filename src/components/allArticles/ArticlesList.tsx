// src/components/allArticles/ArticlesList.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Articles from "./Articles";
import ArticleSkeleton from "./ArticleSkeleton";
import { search_query } from "@/lib/fetchSearchQuery/search_query";
import { ArticleType } from "@/type";

export default function ArticlesList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);

  const limit = 3;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      const {
        articles,
        totalArticles,
      }: { articles: ArticleType[]; totalArticles: number } =
        await search_query(initialSearch, currentPage, limit);

      setArticles(articles);
      setTotalArticles(totalArticles);
      setLoading(false);
    };
    fetchArticles();
  }, [initialSearch, currentPage]);

  const totalPages = Math.ceil(totalArticles / limit);

  const changePage = (page: number) => {
    setCurrentPage(page);
    router.push(`?search=${initialSearch}&page=${page}`);
  };

  return (
    <div className="pt-20">
      {loading ? <ArticleSkeleton /> : <Articles articles={articles} />}
      <div className="mt-4 flex justify-center items-center gap-2">
        <Button
          disabled={currentPage <= 1}
          onClick={() => changePage(currentPage - 1)}
        >
          Prev
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button key={i + 1} onClick={() => changePage(i + 1)}>
            {i + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage >= totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
