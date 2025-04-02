"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "./Toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-black bg-opacity-90 shadow-lg z-50 px-6 py-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
      {/* Logo */}
      <Link href={"/"}>
        <div className="text-black dark:text-white text-2xl font-bold">
          DeepCode
        </div>
      </Link>

      {/* Search Bar */}
      <div className="flex-grow mx-4">
        <SearchInput />
      </div>

      {/* Theme Toggle and Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        <Toggle />

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Navigation Links and Auth Buttons for Medium and Larger Screens */}
      <div className="hidden md:flex items-center space-x-6 pl-10">
        <Link
          href="/articles"
          className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          Articles
        </Link>
        <Link
          href="/about"
          className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          About
        </Link>
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            Dashboard
          </Link>
        </SignedIn>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex space-x-4">
            <SignInButton>
              <Button
                variant="outline"
                className="text-black dark:text-white border-black dark:border-white"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 shadow-lg">
          <div className="px-6 py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/articles"
                  className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                >
                  About
                </Link>
              </li>
              <SignedIn>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Dashboard
                  </Link>
                </li>
              </SignedIn>
            </ul>
            <div className="mt-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <div className="flex flex-col space-y-4">
                  <SignInButton>
                    <Button
                      variant="outline"
                      className="text-black dark:text-white border-black dark:border-white"
                    >
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
