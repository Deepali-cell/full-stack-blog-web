"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import DeleteButton from "./DeleteButton";

interface RecentarticlesType {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
      likes: true;
      author: { select: { name: true; email: true; imageUrl: true } };
    };
  }>[];
}

const RecentArticles: React.FC<RecentarticlesType> = ({ articles }) => {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mx-2 sm:mx-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          Recent Articles
        </h1>
      </div>

      {/* No Articles Found */}
      {!articles.length ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-xl sm:text-2xl font-medium dark:text-gray-300">
            No Articles Found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full rounded-md border border-gray-200 dark:border-gray-700">
          <Table className="min-w-max sm:min-w-full">
            {/* Table Header */}
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead className="whitespace-nowrap px-4 py-3">
                  Title
                </TableHead>
                <TableHead className="whitespace-nowrap px-4 py-3">
                  Status
                </TableHead>
                <TableHead className="whitespace-nowrap px-4 py-3">
                  Comments
                </TableHead>
                <TableHead className="whitespace-nowrap px-4 py-3">
                  Likes
                </TableHead>
                <TableHead className="whitespace-nowrap px-4 py-3">
                  Date
                </TableHead>
                <TableHead className="whitespace-nowrap px-4 py-3 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {articles.map((article) => (
                <TableRow
                  key={article.id}
                  className="border-b dark:border-gray-700"
                >
                  <TableCell className="max-w-[140px] sm:max-w-[200px] truncate">
                    {article.title}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1"
                    >
                      Published
                    </Button>
                  </TableCell>

                  <TableCell>{article.comments.length}</TableCell>
                  <TableCell>{article.likes.length}</TableCell>

                  <TableCell>
                    <span className="whitespace-nowrap text-sm">
                      {article.createdAt.toDateString()}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        href={`/dashboard/articles/editarticle/${article.id}`}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
                        >
                          Edit
                        </Button>
                      </Link>

                      <div className="w-full sm:w-auto">
                        <DeleteButton articleId={article.id} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RecentArticles;
