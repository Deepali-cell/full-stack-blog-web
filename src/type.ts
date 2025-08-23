// types.ts
import type { Prisma } from "@prisma/client";

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

// Define the type for Comments with the included author
export type CommentWithAuthor = Prisma.CommentsGetPayload<{
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

// Define the type for Likes
export type LikesPayload = Prisma.LikesGetPayload<null>;

// ✅ Add the new UserPayload type here
export type UserPayload = Prisma.UserGetPayload<null>;

// Define the props for the ShowSingleArticle component
export interface ShowSingleArticleProps {
  article: Prisma.ArticlesGetPayload<{
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
  initialComments: CommentWithAuthor[];
  initialLikes: LikesPayload[];
  isLiked: boolean;
}

// ✅ Add the ArticleType definition here
export type ArticleType = {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage: string;
  createdAt: Date;
  authorId: string;
  author: {
    name: string;
    email: string;
    imageUrl: string | null;
  };
  comments: {
    id: string;
    body: string;
    authorId: string;
    articleId: string;
    createdAt: Date;
  }[];
};
