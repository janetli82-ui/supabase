'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"

export const DeleteComment = async (commentId: string, slug: string) => {
  const supabase = await createClient()
  const { error } = await supabase.from('Comments').delete().eq('id', commentId)

  if (error) throw new Error(error.message)

  revalidatePath(`/${slug}`)
}