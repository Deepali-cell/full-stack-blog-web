import React from "react";
import ArticleEdit from "../../../../../components/dashboard/ArticleEdit";
import { prisma } from "@/lib/prisma";

interface EditArticleParamType {
  params: Promise<{ id: string }>;
}
const page: React.FC<EditArticleParamType> = async ({ params }) => {
  const id = (await params).id;
  const article = await prisma.articles.findUnique({
    where: { id },
  });
  if (!article)
    return (
      <div>
        <p>Article Not found</p>
      </div>
    );
  return <ArticleEdit article={article} />;
};

export default page;
