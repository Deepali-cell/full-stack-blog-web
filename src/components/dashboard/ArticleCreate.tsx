"use client";
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { createArticleAction } from "@/actions/createArticleAction";
import Link from "next/link";

const ReactQuill = dynamic(
  () => import("react-quill-new").then((mod) => mod.default),
  { ssr: false }
);

const ArticleCreate = () => {
  const [content, setContent] = useState("");
  const [formState, action, isPending] = useActionState(createArticleAction, {
    errors: {},
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4 py-6 sm:px-6 bg-background">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl bg-background text-foreground p-4 sm:p-6">
        {/* ✅ Header */}
        <CardHeader className="text-xl sm:text-2xl font-semibold text-center mb-2">
          Create a New Article
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ✅ Title */}
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="font-medium text-sm sm:text-base"
              >
                Title
              </label>
              <Input
                type="text"
                name="title"
                placeholder="Enter your article title..."
                className="mt-2"
              />
              {formState.errors.title && (
                <span className="text-red-500 text-sm mt-1">
                  {formState.errors.title}
                </span>
              )}
            </div>

            {/* ✅ Category */}
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="font-medium text-sm sm:text-base"
              >
                Category
              </label>
              <select
                className="mt-2 p-2 border rounded-md bg-background text-foreground focus:ring focus:ring-gray-500"
                name="category"
              >
                <option>Technology</option>
                <option>Web Development</option>
                <option>Programming</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-500 text-sm mt-1">
                  {formState.errors.category}
                </span>
              )}
            </div>

            {/* ✅ Featured Image */}
            <div className="flex flex-col">
              <label
                htmlFor="featuredImage"
                className="font-medium text-sm sm:text-base"
              >
                Featured Image
              </label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
                className="mt-2"
              />
              {formState.errors.featuredImage && (
                <span className="text-red-500 text-sm mt-1">
                  {formState.errors.featuredImage}
                </span>
              )}
            </div>

            {/* ✅ Content (Quill Editor) */}
            <div className="flex flex-col">
              <label className="font-medium text-sm sm:text-base">
                Content
              </label>
              <div className="mt-2 rounded-md bg-white dark:bg-gray-800">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="h-[200px] sm:h-[250px] md:h-[300px]"
                />
              </div>
              {formState.errors.content && (
                <span className="text-red-500 text-sm mt-1">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto"
              >
                {isPending ? "Loading..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCreate;
