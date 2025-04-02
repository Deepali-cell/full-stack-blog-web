"use client";

import { Loader } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="w-12 h-12 animate-spin text-gray-500" />
    </div>
  );
};

export default DashboardLoading;
