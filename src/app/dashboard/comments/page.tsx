import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = await auth();

  // If user is not authenticated, show message
  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 max-w-lg bg-white shadow-md rounded-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-700">
            You must be logged in to view your articles and comments.
          </p>
          <a
            href="/sign-in"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  // Fetch user's articles and comments
  const articles = await prisma.articles.findMany({
    where: { authorId: user?.id },
    select: {
      id: true,
      title: true,
      comments: {
        select: {
          id: true,
          body: true,
          createdAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray-700 bg-slate-100 shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Your Articles & Comments
      </h1>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="mb-6 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">
              {article.title}
            </h2>
            {article.comments.length > 0 ? (
              <ul className="border-l-4 border-purple-500 pl-4">
                {article.comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="py-2 border-b last:border-none"
                  >
                    <p className="text-gray-700">{comment.body}</p>
                    <span className="text-sm text-gray-500">
                      By <strong>{comment.author?.name || "Unknown"}</strong> on{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet for this article.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          You haven`&apos;`t published any articles yet.
        </p>
      )}
    </div>
  );
};

export default Page;
