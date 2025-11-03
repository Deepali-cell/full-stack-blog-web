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
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-black/90 shadow-md z-50 border-b border-gray-300 dark:border-gray-700 px-4 md:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <div className="text-black dark:text-white text-2xl font-bold">
            DeepCode
          </div>
        </Link>

        {/* Search - Hidden on small screens */}
        <div className="hidden md:block flex-grow mx-6">
          <SearchInput />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          <Toggle />

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/articles"
              className="text-black dark:text-white hover:text-gray-500"
            >
              Articles
            </Link>
            <Link
              href="/about"
              className="text-black dark:text-white hover:text-gray-500"
            >
              About
            </Link>

            <SignedIn>
              <Link
                href="/dashboard"
                className="text-black dark:text-white hover:text-gray-500"
              >
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button
                  variant="outline"
                  className="dark:text-white dark:border-white"
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-black text-white dark:bg-white dark:text-black">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 py-4">
          <div className="px-4">
            <SearchInput />

            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/articles"
                  className="text-black dark:text-white text-lg"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-black dark:text-white text-lg"
                >
                  About
                </Link>
              </li>

              <SignedIn>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-black dark:text-white text-lg"
                  >
                    Dashboard
                  </Link>
                </li>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <div className="mt-4 space-y-3">
                  <SignInButton>
                    <Button
                      variant="outline"
                      className="w-full dark:text-white dark:border-white"
                    >
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="w-full bg-black text-white dark:bg-white dark:text-black">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
