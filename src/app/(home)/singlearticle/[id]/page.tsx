import { getArticleDataAction } from "@/actions/getSingleArticleAction";
import { ShowSingleArticle } from "@/components/allArticles/ShowSingleArticle";

// ⚠️ Change the component signature to handle `params` as a Promise
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { article, comments, likes, isLiked } = await getArticleDataAction(id);

  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-600">Article Not Found</p>
      </div>
    );
  }

  return (
    <ShowSingleArticle
      article={article}
      initialComments={comments}
      initialLikes={likes}
      isLiked={isLiked}
    />
  );
}
