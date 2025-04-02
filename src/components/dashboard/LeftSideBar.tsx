"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const LeftSideBar = () => {
  const [open, setopen] = useState(false);

  return (
    <>
      {/* small size screen */}
      <Sheet open={open} onOpenChange={setopen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden p-2">
            <LayoutDashboard className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-gray-100 dark:bg-gray-900"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <DashboardSideBar />
        </SheetContent>
      </Sheet>

      {/* large size screen */}
      <div className="hidden md:flex flex-col h-screen w-[250px] border-r bg-background p-4 shadow-md dark:bg-gray-900">
        <DashboardSideBar />
      </div>
    </>
  );
};

export default LeftSideBar;

const DashboardSideBar = () => {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        <Link href={"/"}>DeepCode</Link>
      </h1>
      <nav>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center space-x-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-md transition-all"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-lg font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/comments", label: "Comments", icon: MessageCircle },
];
