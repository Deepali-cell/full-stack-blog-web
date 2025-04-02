import ArticleSkeleton from "@/components/allArticles/ArticleSkeleton";
import { Footer } from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import TopArticles from "@/components/home/TopArticles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <div className="flex gap-20 flex-col">
        <div>
          <HeroSection />
        </div>
        <section className="px-6 py-10 text-black dark:text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Featured Articles
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
              Discover our most popular and trending content.
            </p>
            <Suspense fallback={<ArticleSkeleton />}>
              <TopArticles />
            </Suspense>
            <div className="flex justify-center mt-8">
              <Link href="/articles">
                <Button>Show All Articles</Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default page;
