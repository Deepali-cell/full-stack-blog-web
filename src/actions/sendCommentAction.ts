"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createCommentSchema } from "@/schemas/createCommentSchema";

interface createCommentReturnType {
  errors: {
    body?: string[];
    formErrors?: string[];
  };
}

export const createCommentAction = async (
  articleId: string,
  prevState: createCommentReturnType,
  formData: FormData
): Promise<createCommentReturnType> => {
  // data validation from zod
  const result = createCommentSchema.safeParse({
    body: formData.get("body"),
  });
  // if data validation have some error
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  // check user is authenticated or not by clerk
  const { userId } = await auth();
  // if user is not authenticated then redirect
  if (!userId) {
    return { errors: { formErrors: ["You have to login first"] } };
  }
  const exsistingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!exsistingUser) {
    return {
      errors: {
        formErrors: [
          "User not Found . Before creating an article first register yourself.",
        ],
      },
    };
  }
  const exsistingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });
  if (!exsistingArticle) {
    return {
      errors: {
        formErrors: ["Article not Found."],
      },
    };
  }

  try {
    await prisma.comments.create({
      data: {
        body: result.data.body,
        authorId: exsistingUser.id,
        articleId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: [
            "Something went wrong on server side while commenting on these article.",
          ],
        },
      };
    }
  }
  revalidatePath(`/singlearticle/${articleId}`);
  return { errors: {} };
};
