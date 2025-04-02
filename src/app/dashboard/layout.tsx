import LeftSideBar from "@/components/dashboard/LeftSideBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <div className="flex">
        <LeftSideBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
