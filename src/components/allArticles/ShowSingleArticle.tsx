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
      <main className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-blue-500 px-4 py-1 text-sm text-white font-semibold">
                {article.category}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight dark:text-blue-600 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 dark:text-white">
              <Avatar className="h-12 w-12 border-2 border-gray-300">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold dark:text-white">
                  {article.author.name}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(article.createdAt).toDateString()} • {12} min read
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            <Image
              src={article.featuredImage}
              alt={article.title}
              width={350}
              height={250}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <section
          className="prose prose-lg dark:prose-invert max-w-none mb-12 dark:text-white leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>

      <div className="mx-auto px-6">
        <LikeButton
          likes={initialLikes}
          articleId={article.id}
          isLiked={isLiked}
        />
        <CommentInput articleId={article.id} />
        <CommentsList comments={initialComments} />
      </div>
    </div>
  );
}
