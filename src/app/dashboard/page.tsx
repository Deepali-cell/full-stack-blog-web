import Article_Dashboard from "@/components/dashboard/Article_Dashboard";
import RecentArticles from "@/components/dashboard/Recent_Articles";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  // 1️⃣ Get logged-in user
  const user = await currentUser();

  if (!user) {
    return <p>Please log in to see your dashboard</p>;
  }

  // 2️⃣ Find this user in your DB (using clerkUserId)
  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!dbUser) {
    return <p>User not found in DB</p>;
  }

  // 3️⃣ Fetch only this user's articles
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      where: { authorId: dbUser.id }, // ✅ Filter by this user's id
      orderBy: { createdAt: "desc" },
      include: {
        comments: true,
        likes: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    }),
    prisma.comments.count({
      where: { article: { authorId: dbUser.id } }, // ✅ Count this user's comments
    }),
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
