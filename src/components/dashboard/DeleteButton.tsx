"use client";

import React, { startTransition, useState } from "react";
import { deleteArticleAction } from "@/actions/deleteArticleAction";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  articleId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setIsPending(true);
    setError(null);

    startTransition(async () => {
      const res = await deleteArticleAction(articleId);

      if (res.errors?.formErrors?.length) {
        setError(res.errors.formErrors.join(", "));
      } else {
        router.refresh(); // ✅ Refresh after deletion
      }

      setIsPending(false);
    });
  };

  return (
    <div>
      <Button
        onClick={handleDelete}
        disabled={isPending}
        variant="ghost"
        size="sm"
        className="bg-red-600 text-white"
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default DeleteButton;
