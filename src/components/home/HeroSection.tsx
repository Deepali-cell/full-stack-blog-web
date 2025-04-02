import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-col items-center justify-between text-center lg:text-left px-6 py-20 bg-white dark:bg-black text-black dark:text-white max-w-6xl mx-auto">
      {/* Left Side */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Explore the World Through Words.
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            DeepCode Blog – Explore, Learn, and Grow! 🚀 Dive into expert
            insights, latest trends, and inspiring ideas.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
              Start Reading
            </button>
            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition shadow-md dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300">
              Explore Topics
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[350px] sm:w-[500px]">
            <Image
              src="https://lh5.googleusercontent.com/proxy/WMrC7Cd8mrCPClO_tRNivU5NSRftP0E-_WZfaEfsjvF2l_XCSW47sU5efv4bL9_mroIPDVbVFC7apG57I6Ql1WtxNHhg1UYHXKK818aX5tr55Y0PsXAD-DNPyA"
              alt="blog-image"
              height={300}
              width={450}
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mt-16 w-full">
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-4xl font-bold text-blue-500">1k+</h2>
          <p className="text-gray-600 dark:text-gray-300">Published Articles</p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-4xl font-bold text-green-500">50+</h2>
          <p className="text-gray-600 dark:text-gray-300">Expert Writers</p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-4xl font-bold text-purple-500">10M+</h2>
          <p className="text-gray-600 dark:text-gray-300">Monthly Readers</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
