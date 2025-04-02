import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.string().min(3).max(50),
});
