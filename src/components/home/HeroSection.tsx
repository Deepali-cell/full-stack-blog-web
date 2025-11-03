import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-16 lg:py-24 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* ✅ Left Side */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Explore the World <br /> Through Words.
          </h1>

          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
            DeepCode Blog – Explore, Learn, and Grow! 🚀 Dive into expert
            insights, latest trends, and inspiring ideas.
          </p>

          {/* ✅ Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 w-full sm:w-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
              Start Reading
            </button>

            <button className="px-6 py-3 w-full sm:w-auto bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition shadow-md dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300">
              Explore Topics
            </button>
          </div>
        </div>

        {/* ✅ Right Side - Image */}
        <div className="flex-1 flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-[280px] sm:w-[400px] md:w-[480px] lg:w-[500px]">
            <Image
              src="https://lh5.googleusercontent.com/proxy/WMrC7Cd8mrCPClO_tRNivU5NSRftP0E-_WZfaEfsjvF2l_XCSW47sU5efv4bL9_mroIPDVbVFC7apG57I6Ql1WtxNHhg1UYHXKK818aX5tr55Y0PsXAD-DNPyA"
              alt="blog-image"
              width={500}
              height={350}
              className="rounded-lg object-cover w-full h-[200px] sm:h-[260px] md:h-[300px] lg:h-[330px]"
            />
          </div>
        </div>
      </div>

      {/* ✅ Bottom Stats Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500">1k+</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Published Articles
          </p>
        </div>

        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-500">50+</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Expert Writers
          </p>
        </div>

        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-500">
            10M+
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Monthly Readers
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
