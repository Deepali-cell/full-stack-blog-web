import ShowAllArticles from "@/components/allArticles/ShowAllArticles";
import { Suspense } from "react";

export default function Page() {
  return (
    // ✅ Wrap the client component in a Suspense boundary
    <Suspense fallback={<div>Loading articles...</div>}>
      <ShowAllArticles />
    </Suspense>
  );
}
