'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { replyCommentSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"


export const ReplyCommentPost = async (postdata: z.infer<typeof replyCommentSchema>) => {
  const parsedData = replyCommentSchema.parse(postdata)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")


  const { error } = await supabase.from("Comments").insert([{
    content: parsedData.content,
    post_id: parsedData.post_id,
    parent_id:parsedData.parent_id,
    user_id: user.id,
  }])

  if (error) throw new Error(error.message)

  revalidatePath(`/${parsedData.slug}`) 
}
