"use server";

import { redirect } from "next/navigation";

export const searchInputAction = async (formData: FormData) => {
  const searchText = formData.get("search")?.toString().trim() || "";

  if (!searchText) {
    redirect("/articles"); // Redirect to articles page without search param
  } else {
    redirect(`/articles?search=${encodeURIComponent(searchText)}`);
  }
};
