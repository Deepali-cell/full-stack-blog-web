import { ShowSingleArticle } from "@/components/allArticles/ShowSingleArticle";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[]>;
}

const Page = async ({ params }: PageProps) => {
  const article = await prisma.articles.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-600">Article Not Found.</p>
      </div>
    );
  }

  return <ShowSingleArticle article={article} />;
};

export default Page;
