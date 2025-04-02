"use client"; // Mark this file as a Client Component

import React, { FormEvent, startTransition, useActionState } from "react";
import { deleteArticleAction } from "@/actions/deleteArticleAction";
import { Button } from "../ui/button";

interface DeleteButtonProps {
  articleId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const [formState, action, isPending] = useActionState(
    deleteArticleAction.bind(null, articleId),
    { errors: {} }
  );

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      action();
    });
  };

  return (
    <form onSubmit={handleDelete}>
      <Button
        type="submit"
        disabled={isPending}
        variant="ghost"
        size="sm"
        className="bg-red-600 text-white"
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
      {formState.errors?.formErrors && (
        <span className="text-red-500 text-sm">
          {formState.errors.formErrors.join(", ")}
        </span>
      )}
    </form>
  );
};

export default DeleteButton;
