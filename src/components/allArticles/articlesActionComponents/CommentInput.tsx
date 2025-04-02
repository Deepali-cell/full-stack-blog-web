"use client";
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react"; // Importing Lucide React icon
import { createCommentAction } from "@/actions/sendCommentAction";

interface commentProp {
  articleId: string;
}

const CommentInput: React.FC<commentProp> = ({ articleId }) => {
  const [comment, setComment] = useState("");
  const [formState, action, isPending] = useActionState(
    createCommentAction.bind(null, articleId),
    {
      errors: {},
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("body", comment);

    startTransition(() => {
      action(formData);
      setComment("");
    });
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-t border-gray-200">
      {/* Avatar */}
      <Avatar className="h-10 w-10 border-2 border-gray-300">
        <AvatarImage src={""} alt="User Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      {/* Form container with full width */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-1 space-x-2"
      >
        {/* Comment Input */}
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formState.errors.body && (
          <span className="text-red-500">{formState.errors.body}</span>
        )}

        {/* Send Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={isPending}
        >
          {isPending ? "loading..." : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
