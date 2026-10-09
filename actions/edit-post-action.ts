'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { postSchema } from "./schemas"
import { slugify } from "../src/lib/supabase/slugify"
import z from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { UploadImage } from "@/lib/supabase/uploadImage"

export const EditPost = async ({postdata, postId} : {postdata:z.infer<typeof postSchema>, postId:string}) => {
  const parsedData = postSchema.parse(postdata)

  const supabase = await createClient()
  const {data: {user}} = await supabase.auth.getUser()
  
  if(!user) throw new Error("Unauthorized access!")
  
  const slug = slugify(parsedData.title)

  const imageUrls: string[] = []
    
  if(parsedData.img_url && parsedData.img_url.length > 0) {
    for (const file of parsedData.img_url) {
      const url = await UploadImage(file)
      imageUrls.push(url)
    }
  }

  const { error } = await supabase.from("Posts").update([{
    title: parsedData.title,
    content: parsedData.content,
    category_id: parsedData.category_id,
    img_url: imageUrls.length > 0 ? imageUrls : null,       
    author: user.id,
    slug, 
  }]).eq("id", postId).select("slug").single().throwOnError()

 

  if(error) console.log(error)

  revalidatePath("/")
  redirect(`/${slug}`)
}