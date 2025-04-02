import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="my-20  max-w-4xl mx-auto p-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-6">About Us</h1>
      <Image
        src="https://www.vyoma-media.com/wp-content/uploads/2018/02/Banner-for-blog-.jpg"
        alt="About Us"
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
      />
      <p className="text-lg leading-relaxed">
        Welcome to our article platform! Here, users can share their thoughts,
        ideas, and knowledge by writing and posting articles. Our goal is to
        create a community where people can learn, engage, and grow together
        through the power of words.
      </p>
      <p className="text-lg leading-relaxed mt-4">
        Whether you are a seasoned writer or just starting, our platform
        provides a space for creative expression and meaningful discussions. We
        believe that everyone has a story to tell, and by sharing our
        experiences and insights, we can inspire and educate others.
      </p>
      <p className="text-lg leading-relaxed mt-4">
        <strong>Join our community today!</strong> Connect with like-minded
        individuals, receive feedback on your work, and discover a world of
        knowledge through articles written by people from diverse backgrounds.
      </p>
      <button className="mt-6 px-6 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
        Start Writing
      </button>
    </div>
  );
};

export default AboutPage;
