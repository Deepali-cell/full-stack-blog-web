"use server";
import { createArticleSchema } from "@/schemas/createArticleSchema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface createArticleReturnType {
  errors: {
    title?: string[];
    category?: string[];
    content?: string[];
    featuredImage?: string[];
    formErrors?: string[];
  };
}

export const createArticleAction = async (
  prevState: createArticleReturnType,
  formData: FormData
): Promise<createArticleReturnType> => {
  // data validation from zod
  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });
  // if data validation have some error
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  // check user is authenticated or not by clerk
  const { userId } = await auth();
  // if user is not authenticated then redirect
  if (!userId) {
    return { errors: { formErrors: ["You have to login first"] } };
  }
  const exsistingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!exsistingUser) {
    return {
      errors: {
        formErrors: [
          "User not Found . Before creating an article first register yourself.",
        ],
      },
    };
  }
  // article image
  const imageFile = formData.get("featuredImage") as File | null;
  if (!imageFile || imageFile.name === "undefined") {
    return {
      errors: {
        featuredImage: ["image file is required"],
      },
    };
  }
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadResponse: UploadApiResponse | undefined = await new Promise(
    (res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            rej(error);
          } else {
            res(result);
          }
        }
      );
      uploadStream.end(buffer);
    }
  );

  const imageUrl = uploadResponse?.secure_url;
  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["failed to upload the article image."],
      },
    };
  }
  try {
    await prisma.articles.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: exsistingUser.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: [
            "Something went wrong on server side while creating an article.",
          ],
        },
      };
    }
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
};
