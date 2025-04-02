import Navbar from "@/components/home/Header/Navbar";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
