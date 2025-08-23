import Navbar from "@/components/home/Header/Navbar";
import { Suspense } from "react";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading navbar...</div>}>
        <Navbar />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
