import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const TopArticles = async () => {
  const articles = await prisma.articles.findMany({
    orderBy: { createdAt: "desc" },
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
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {" "}
      {/* Adjusted max-width for large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {" "}
        {/* 1 column for small, 3 for large */}
        {articles.slice(0, 3).map((article) => (
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
              <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
              {article.category && (
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                  {article.category}
                </span>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <Avatar className="w-8 h-8">
                  {article.author?.imageUrl ? (
                    <AvatarImage
                      src={article.author.imageUrl}
                      alt={article.author.name}
                    />
                  ) : (
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Default Avatar"
                    />
                  )}
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
                    {article.comments.length} Comments
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

export default TopArticles;
