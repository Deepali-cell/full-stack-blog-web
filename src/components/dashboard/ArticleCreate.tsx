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
    <div className="flex justify-center items-center min-h-screen bg-background p-6">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl bg-background text-foreground p-6">
        <CardHeader className="text-2xl font-semibold text-center mb-4">
          Create a New Article
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title Input */}
            <div className="flex flex-col">
              <label htmlFor="title" className="font-medium">
                Title
              </label>
              <Input
                type="text"
                name="title"
                placeholder="Enter your article title..."
                className="mt-2"
              />
              {formState.errors.title && (
                <span className="text-red-500 sm">
                  {formState.errors.title}
                </span>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="category" className="font-medium">
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
                <span className="text-red-500 text-sm">
                  {formState.errors.category}
                </span>
              )}
            </div>

            {/* Featured Image */}
            <div className="flex flex-col">
              <label htmlFor="featuredImage" className="font-medium">
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
                <span className="text-red-500 text-sm">
                  {formState.errors.featuredImage}
                </span>
              )}
            </div>

            {/* Content Editor */}
            <div className="flex flex-col">
              <label htmlFor="content" className="font-medium">
                Content
              </label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="mt-2 rounded-md"
              />
              {formState.errors.content && (
                <span className="text-red-500 text-sm">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <Link href={`/dashboard`}>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending ? "loading..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCreate;
