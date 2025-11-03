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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8">
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6 
          md:gap-8"
      >
        {articles.slice(0, 3).map((article) => (
          <Card
            key={article.id}
            className="overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/singlearticle/${article.id}`}>
              <Image
                src={article.featuredImage}
                alt={article.title}
                width={400}
                height={250}
                className="w-full h-48 sm:h-44 md:h-48 lg:h-40 object-cover"
              />
            </Link>

            <CardContent className="p-4">
              <h3 className="text-lg md:text-xl font-semibold line-clamp-2 mb-2">
                {article.title}
              </h3>

              {article.category && (
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                  {article.category}
                </span>
              )}

              <div className="flex items-center gap-3 mt-2">
                <Avatar className="w-9 h-9">
                  {article.author?.imageUrl ? (
                    <AvatarImage src={article.author.imageUrl} />
                  ) : (
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Default"
                    />
                  )}
                  <AvatarFallback>
                    {article.author?.name?.[0] || "U"}
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
