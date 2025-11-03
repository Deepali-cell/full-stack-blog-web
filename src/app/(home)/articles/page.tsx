import ArticlesList from "@/components/allArticles/ArticlesList";
import { Suspense } from "react";

export default function Page() {
  return (
    // ✅ Wrap the client component in a Suspense boundary
    <Suspense fallback={<div>Loading articles...</div>}>
       <ArticlesList />;
    </Suspense>
  );
}
