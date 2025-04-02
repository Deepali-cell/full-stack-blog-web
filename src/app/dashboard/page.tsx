import Article_Dashboard from "@/components/dashboard/Article_Dashboard";
import RecentArticles from "@/components/dashboard/Recent_Articles";
import { prisma } from "@/lib/prisma";
import React from "react";

const Page = async () => {
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        comments: true,
        likes : true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    }),
    prisma.comments.count(),
  ]);

  const articleLength = articles.length;
  const commentsLength = totalComments;

  return (
    <>
      <Article_Dashboard
        articleLength={articleLength}
        commentsLength={commentsLength}
      />
      <RecentArticles articles={articles} />
    </>
  );
};

export default Page;
