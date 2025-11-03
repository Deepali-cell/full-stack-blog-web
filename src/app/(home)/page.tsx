import ArticleSkeleton from "@/components/allArticles/ArticleSkeleton";
import { Footer } from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import TopArticles from "@/components/home/TopArticles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28 xl:gap-32">
      {/* ✅ Hero Section */}
      <section className="w-full">
        <HeroSection />
      </section>

      {/* ✅ Featured Articles Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 text-black dark:text-white">
        <div className="max-w-6xl mx-auto">
          {/* ✅ Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">
            Featured Articles
          </h2>

          {/* ✅ Subtext */}
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg mb-10">
            Discover our most popular and trending content across the platform.
          </p>

          {/* ✅ Articles */}
          <Suspense fallback={<ArticleSkeleton />}>
            <TopArticles />
          </Suspense>

          {/* ✅ Button Center */}
          <div className="flex justify-center mt-10">
            <Link href="/articles">
              <Button className="px-6 py-4 text-base sm:text-lg">
                Show All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Footer Section */}
      <Footer />
    </div>
  );
};

export default Page;
