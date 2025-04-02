import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});
