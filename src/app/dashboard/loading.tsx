"use client";

import { Loader } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full px-4">
      <Loader className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 animate-spin text-gray-500 dark:text-gray-300 transition-all" />

      <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base animate-pulse">
        Loading dashboard...
      </p>
    </div>
  );
};

export default DashboardLoading;
