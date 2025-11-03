import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";

const Article_Dashboard = ({
  articleLength,
  commentsLength,
}: {
  articleLength: number;
  commentsLength: number;
}) => {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10 space-y-8 w-full">
      {/* ✅ Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Blog Dashboard
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your content and analytics.
          </p>
        </div>

        <Link
          href="/dashboard/articles/createArticle"
          className="w-full sm:w-auto"
        >
          <Button className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <PlusCircle className="h-5 w-5" />
            New Article
          </Button>
        </Link>
      </div>

      {/* ✅ Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ✅ Articles Card */}
        <Card className="p-4 sm:p-5 shadow-md rounded-xl transition hover:scale-[1.01]">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-semibold">
              Total Articles
            </CardTitle>
            <FileText className="h-6 w-6 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold">
              {articleLength}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              +5 from last month
            </p>
          </CardContent>
        </Card>

        {/* ✅ Comments Card */}
        <Card className="p-4 sm:p-5 shadow-md rounded-xl transition hover:scale-[1.01]">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-semibold">
              Total Comments
            </CardTitle>
            <MessageCircle className="h-6 w-6 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold">
              {commentsLength}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              12 awaiting moderation
            </p>
          </CardContent>
        </Card>

        {/* ✅ Extra card for future expansion */}
        <Card className="hidden lg:block p-4 sm:p-5 shadow-md rounded-xl opacity-0 pointer-events-none">
          {/* Leaving this for balance on 3-column large screens */}
        </Card>
      </div>
    </div>
  );
};

export default Article_Dashboard;
