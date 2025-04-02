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
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mx-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Articles
        </h1>
      </div>
      {!articles.length ? (
        <div className="flex justify-center items-center">
          <p className="text-2xl">No Articles Found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-full border border-gray-200 dark:border-gray-700">
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {articles.map((article) => {
                return (
                  <TableRow key={article.id} className="border-b">
                    <TableCell>{article.title}</TableCell>
                    <TableCell>
                      <span className="text-blue-500 font-medium"></span>
                      <Button className="flex items-center gap-2 mg-black">
                        Published
                      </Button>
                    </TableCell>
                    <TableCell>{article.comments.length}</TableCell>
                    <TableCell>{article.likes.length}</TableCell>
                    <TableCell>{article.createdAt.toDateString()}</TableCell>
                    <TableCell className="flex gap-x-4">
                      <Link
                        href={`/dashboard/articles/editarticle/${article.id}`}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-green-600 text-white"
                        >
                          Edit
                        </Button>
                      </Link>
                      <DeleteButton articleId={article.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RecentArticles;
