"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Prisma } from "@prisma/client";
import React from "react";

interface CommentListProps {
  comments: Prisma.CommentsGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
}

const CommentsList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="flex flex-col space-y-2">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="flex items-start space-x-4 p-4 ">
            {/* Avatar Section */}
            <Avatar className="h-12 w-12 border-2 border-gray-300">
              <AvatarImage
                src={comment.author.imageUrl || " "}
                alt="Author Avatar"
              />
              <AvatarFallback>{comment.author.name || "CN"}</AvatarFallback>
            </Avatar>

            {/* Comment Content */}
            <div className="flex flex-col">
              <p className="font-semibold">{comment.author.name}</p>
              <p className="text-gray-700">{comment.body}</p>
              <span className="text-sm text-gray-500">
                {comment.createdAt.toDateString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
