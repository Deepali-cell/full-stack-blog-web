import React from "react";

const ArticleSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md"
        >
          {/* Image Skeleton */}
          <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-3"></div>

          {/* Title Skeleton */}
          <div className="h-3 bg-gray-300 dark:bg-gray-700 w-3/4 mb-2 rounded"></div>

          {/* Category Skeleton */}
          <div className="h-2 bg-gray-300 dark:bg-gray-700 w-1/3 mb-2 rounded"></div>

          {/* Author Details */}
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"></div>
            <div className="flex flex-col space-y-1">
              <div className="h-2 bg-gray-300 dark:bg-gray-700 w-20 rounded"></div>
              <div className="h-2 bg-gray-300 dark:bg-gray-700 w-14 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleSkeleton;
