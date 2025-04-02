"use server";
import { prisma } from "../prisma";

export const search_query = async (
  searchText: string,
  page: number = 1,
  limit: number = 5
) => {
  const skip = (page - 1) * limit; // Calculate offset

  // Fetch articles with pagination
  const articles = await prisma.articles.findMany({
    where: {
      OR: [
        { title: { contains: searchText, mode: "insensitive" } },
        { category: { contains: searchText, mode: "insensitive" } },
      ],
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
    take: limit, // Limit per page
    skip, // Offset
  });

  // Fetch total count for pagination
  const totalArticles = await prisma.articles.count({
    where: {
      OR: [
        { title: { contains: searchText, mode: "insensitive" } },
        { category: { contains: searchText, mode: "insensitive" } },
      ],
    },
  });

  return { articles, totalArticles };
};
