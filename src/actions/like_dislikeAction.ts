"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const like_dislikeAction = async (articleId: string) => {
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
  const exsistingLike = await prisma.likes.findFirst({
    where: { articleId: articleId, authorId: exsistingUser.id },
  });
  if (exsistingLike) {
    await prisma.likes.delete({
      where: { id: exsistingLike.id },
    });
  } else {
    await prisma.likes.create({
      data: {
        articleId: articleId,
        authorId: exsistingUser.id,
      },
    });
  }

  revalidatePath(`/singlearticle/${articleId}`);
};
