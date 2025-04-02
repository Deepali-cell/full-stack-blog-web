"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const deleteArticleAction = async (articleId: string) => {
  const { userId } = await auth();

  // If user is not authenticated, return error
  if (!userId) {
    return { errors: { formErrors: ["You have to login first"] } };
  }

  // Find the user in the database
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return {
      errors: {
        formErrors: [
          "User not found. Before deleting an article, please register first.",
        ],
      },
    };
  }

  // Check if the article exists
  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });

  if (!existingArticle) {
    return {
      errors: {
        formErrors: ["Article not found."],
      },
    };
  }

  // Delete the article
  await prisma.articles.delete({
    where: { id: articleId },
  });

  return { success: true };
};
