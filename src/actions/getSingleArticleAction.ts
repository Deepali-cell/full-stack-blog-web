"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { UserPayload } from "@/type";

// Define a type for the data we will return
export type ArticlePayload = Prisma.ArticlesGetPayload<{
  include: {
    author: {
      select: {
        name: true;
        email: true;
        imageUrl: true;
      };
    };
  };
}>;

export type CommentsPayload = Prisma.CommentsGetPayload<{
  include: {
    author: {
      select: {
        name: true;
        email: true;
        imageUrl: true;
      };
    };
  };
}>[];

export type LikesPayload = Prisma.LikesGetPayload<null>[];

interface ArticleData {
  article: ArticlePayload | null;
  comments: CommentsPayload;
  likes: LikesPayload;
  isLiked: boolean;
}

export async function getArticleDataAction(id: string): Promise<ArticleData> {
  try {
    const article = await prisma.articles.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, email: true, imageUrl: true } },
      },
    });

    if (!article) {
      return {
        article: null,
        comments: [],
        likes: [],
        isLiked: false,
      };
    }

    const comments = await prisma.comments.findMany({
      where: { articleId: article.id },
      include: {
        author: { select: { name: true, email: true, imageUrl: true } },
      },
    });

    const likes = await prisma.likes.findMany({
      where: { articleId: article.id },
    });

    const { userId } = await auth();
    let user: UserPayload | null = null;
    let isLiked = false;

    if (userId) {
      user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
      });
      if (user) {
        isLiked = likes.some((like) => like.authorId === user?.id);
      }
    }

    return {
      article,
      comments,
      likes,
      isLiked,
    };
  } catch (error) {
    console.error("Error fetching article data:", error);
    return {
      article: null,
      comments: [],
      likes: [],
      isLiked: false,
    };
  }
}
