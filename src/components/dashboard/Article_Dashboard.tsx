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
    <>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Blog Dashboard</h1>
            <p className="text-gray-500">Manage your content and analytics.</p>
          </div>
          <Link href={"/dashboard/articles/createArticle"}>
            <Button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <PlusCircle className="h-5 w-5" />
              <span>New Article</span>
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 shadow-lg rounded-lg">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Total Articles
              </CardTitle>
              <FileText className="h-6 w-6 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articleLength}</div>
              <p className="text-sm text-gray-500">+5 from last month.</p>
            </CardContent>
          </Card>

          <Card className="p-4 shadow-lg rounded-lg">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Total comments
              </CardTitle>
              <MessageCircle className="h-6 w-6 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commentsLength}</div>

              <p className="text-sm text-gray-500">12 awaiting moderation.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Article_Dashboard;
