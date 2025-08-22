"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface DeleteArticleResponse {
  success?: boolean;
  errors?: { formErrors: string[] };
}

export const deleteArticleAction = async (
  articleId: string
): Promise<DeleteArticleResponse> => {
  const { userId } = await auth();

  // If user is not authenticated
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
          "User not found. Please register before deleting an article.",
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

  // Revalidate the dashboard path
  revalidatePath("/dashboard");

  return { success: true };
};
