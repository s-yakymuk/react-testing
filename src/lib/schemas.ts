import { z } from "zod";

export const addEditMovieSchema = z.object({
  id: z.union([z.literal(""), z.string().min(1)]),
  adult: z.boolean(),
  genre_ids: z.array(z.string().min(1)).min(1, "Select at least one genre"),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string().min(1, "Overview is required"),
  release_date: z.string(),
  title: z.string().min(1, "Title is required"),
});

export type AddEditMovieSchema = Zod.infer<typeof addEditMovieSchema>;
