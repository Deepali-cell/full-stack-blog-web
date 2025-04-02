"use server";
import { createArticleSchema } from "@/schemas/createArticleSchema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface editArticleReturnType {
  errors: {
    title?: string[];
    category?: string[];
    content?: string[];
    featuredImage?: string[];
    formErrors?: string[];
  };
}

export const editArticleAction = async (
  articleId: string,
  prevState: editArticleReturnType,
  formData: FormData
): Promise<editArticleReturnType> => {
  // Validate form data
  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { errors: { formErrors: ["You have to log in first"] } };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!existingUser) {
    return {
      errors: {
        formErrors: [
          "User not found. Please register before Editing an article.",
        ],
      },
    };
  }

  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });
  if (!existingArticle) {
    return {
      errors: {
        formErrors: ["Article not found."],
      },
    };
  }

  // Handle image upload only if a new image is provided
  let imageUrl = existingArticle.featuredImage;
  const imageFile = formData.get("featuredImage") as File | null;

  if (imageFile && imageFile.name !== "undefined") {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: "auto" }, (error, result) => {
              if (error) reject(error);
              else resolve(result as UploadApiResponse);
            })
            .end(buffer);
        }
      );

      imageUrl = uploadResponse.secure_url;
    } catch (error: unknown) {
      console.log(error);
      return {
        errors: { featuredImage: ["Failed to upload the article image."] },
      };
    }
  }

  // Update the article
  try {
    await prisma.articles.update({
      where: { id: articleId },
      data: {
        title: result.data.title,
        content: result.data.content,
        category: result.data.category,
        featuredImage: imageUrl, // Keep old or update with new image
      },
    });
  } catch (error: unknown) {
    return {
      errors: {
        formErrors: [
          error instanceof Error
            ? error.message
            : "Something went wrong on the server while editing the article.",
        ],
      },
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
