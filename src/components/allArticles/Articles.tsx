import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Prisma } from "@prisma/client";

interface AllArticlesProp {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
}

const Articles: React.FC<AllArticlesProp> =  ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-xl dark:text-white text-black">No Articles Found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden shadow-md">
            <Link href={`/singlearticle/${article.id}`}>
              <Image
                src={article.featuredImage}
                alt={article.title}
                width={300}
                height={180}
                className="w-full h-40 object-cover"
              />
            </Link>
            <CardContent className="p-3">
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>

              {/* Category Badge */}
              {article.category && (
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                  {article.category}
                </span>
              )}

              <div className="flex items-center space-x-2 mt-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      article.author?.imageUrl ||
                      "https://github.com/shadcn.png"
                    }
                    alt={article.author?.name || "Author"}
                  />
                  <AvatarFallback>
                    {article.author?.name ? article.author.name[0] : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {article.author?.name || "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(article.createdAt).toDateString()} •{" "}
                    {article.comments?.length ?? 0} Comments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Articles;
