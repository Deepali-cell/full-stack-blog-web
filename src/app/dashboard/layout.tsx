import LeftSideBar from "@/components/dashboard/LeftSideBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex">
      {/* ✅ Sidebar (already responsive inside component) */}
      <LeftSideBar />

      {/* ✅ Main Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
