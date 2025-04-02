"use client";
import { like_dislikeAction } from "@/actions/like_dislikeAction";
import { Likes } from "@prisma/client";
import {  ThumbsUp } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";

interface likeBtnprop {
  articleId: string;
  likes: Likes[];
  isLiked: boolean;
}
const LikeButton: React.FC<likeBtnprop> = ({ articleId, likes, isLiked }) => {
  const [optimisticLike, setoptimisticLike] = useOptimistic(likes.length);
  const [isPending, startTransition] = useTransition();

  const handleLikeAndDisLikeBtn = async () => {
    startTransition(async () => {
      setoptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1);
      await like_dislikeAction(articleId);
    });
  };
  return (
    <div className="flex space-x-6 items-center p-4 border-t border-gray-200">
      {/* Thumbs Up Button with Like Count */}
      <form onSubmit={handleLikeAndDisLikeBtn}>
        <div className="flex flex-col items-center">
          <button
            disabled={isPending}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
          >
            <ThumbsUp className="text-xl" />
          </button>
          <span className="text-sm text-gray-500">{optimisticLike} Likes</span>
        </div>
      </form>
    </div>
  );
};

export default LikeButton;
