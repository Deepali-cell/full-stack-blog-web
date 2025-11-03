"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import LikeButton from "./articlesActionComponents/LikeButton";
import CommentsList from "./articlesActionComponents/CommentsList";
import CommentInput from "./articlesActionComponents/CommentInput";
import type { ShowSingleArticleProps } from "../../type";

export function ShowSingleArticle({
  article,
  initialComments,
  initialLikes,
  isLiked,
}: ShowSingleArticleProps) {
  return (
    <div className="min-h-screen py-10">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Section */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
          {/* Left side */}
          <div className="flex-1">
            {/* Category */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-blue-500 px-3 py-1 text-xs sm:text-sm text-white font-semibold">
                {article.category}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight dark:text-blue-600 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Author Section */}
            <div className="flex items-center gap-4 dark:text-white">
              <Avatar className="h-12 w-12 border-2 border-gray-300">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold">{article.author.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(article.createdAt).toDateString()} • 12 min read
                </p>
              </div>
            </div>
          </div>

          {/* Right side (Image) */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm h-48 sm:h-56 md:h-64">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </header>

        {/* Article Content */}
        <section
          className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none mb-14 dark:text-white leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>

      {/* Like + Comments Section */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <LikeButton
          likes={initialLikes}
          articleId={article.id}
          isLiked={isLiked}
        />

        <div className="mt-6">
          <CommentInput articleId={article.id} />
        </div>

        <div className="mt-10">
          <CommentsList comments={initialComments} />
        </div>
      </div>
    </div>
  );
}
