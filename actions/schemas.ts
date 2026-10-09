import { z } from "zod"

export const logInSchema = z.object({
  email:z.email("Zod says incorrect email pattern!"),
  password: z.string().min(6, "Zod says no! Passwords must be 6 characters!!")
})

export const signUpSchema = z.object({
  email:z.email("Zod says incorrect email pattern!"),
  password: z.string().min(6, "Zod says no! Passwords must be 6 characters!!"),
  username: z.string().min(6, "You have at least 6 characters!")
})

export const postSchema = z.object({
  title:z.string().min(6, "Your title must be at least 6 characters long!"),
  content: z.string().min(1, "Content is required"),
  category_id: z.uuid("Please select a category"),
  img_url: z.array(z.instanceof(File)).optional(),
})

export const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  post_id: z.uuid(),
  slug: z.string(),
})

export const replyCommentSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
  post_id: z.uuid(),
  parent_id: z.uuid(),
  slug: z.string(),
})