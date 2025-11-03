import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="my-12 sm:my-16 lg:my-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-6 sm:p-10 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-2xl">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">About Us</h1>

        {/* Banner Image */}
        <div className="w-full h-52 sm:h-64 md:h-72 relative mb-6 rounded-xl overflow-hidden shadow-md">
          <Image
            src="https://www.vyoma-media.com/wp-content/uploads/2018/02/Banner-for-blog-.jpg"
            alt="About Us"
            fill
            className="object-cover"
          />
        </div>

        {/* Paragraphs */}
        <p className="text-base sm:text-lg leading-relaxed">
          Welcome to our article platform! Here, users can share their thoughts,
          ideas, and knowledge by writing and posting articles. Our goal is to
          create a community where people can learn, engage, and grow together
          through the power of words.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mt-4">
          Whether you are a seasoned writer or just starting, our platform
          provides a space for creative expression and meaningful discussions.
          We believe everyone has a story to tell, and by sharing our
          experiences and insights, we can inspire and educate others.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mt-4">
          <strong>Join our community today!</strong> Connect with like-minded
          individuals, receive feedback on your work, and explore a world of
          knowledge through articles written by people from diverse backgrounds.
        </p>

        {/* Button */}
        <button className="mt-6 px-5 sm:px-6 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
          Start Writing
        </button>
      </div>
    </div>
  );
};

export default Page;
