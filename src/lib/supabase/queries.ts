import { createClient } from "./browserClient"
import { type QueryData } from "@supabase/supabase-js"

export const getHomePosts = async (supabase:ReturnType<typeof createClient>) => {
  return await supabase.from('Posts')
                       .select('id, title, slug, img_url, author("id", "username")')
                       .order('created_at', { ascending: false })
}

export const getSinglePost = async (slug:string, supabase:ReturnType<typeof createClient>) => {
  return await supabase.from('Posts')
                       .select('id, title, content, category_id, img_url, author("id", "username")')
                       .eq("slug", slug)
                       .single()
}

export const getCategoryBySlug = async (slug:string, supabase:ReturnType<typeof createClient>) => {
  return await supabase.from('Categories')
                       .select('id, name, slug')
                       .eq("slug", slug)
                       .single()
}

export const getPostsByCategory = async (categoryId: string, supabase:ReturnType<typeof createClient>) => {
  return await supabase.from('Posts')
                       .select('id, title, category_id, content, img_url, author("id", "username")')
                       .eq('category_id', categoryId)
}

export const getComment = async (postId:string, supabase:ReturnType<typeof createClient>) => {
  return await supabase.from('Comments')
                       .select('id, content, post_id, parent_id, user_id, Users(username)')
                       .eq('post_id', postId) 
                       .order('created_at', { ascending: false })
}

export const searchPosts = async(searchTerm:string) => {
  const supabase = createClient()
  return await supabase.from('Posts')
                       .select('title, slug')
                       .textSearch("title", searchTerm)
}


export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>

export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>

export type SearchPostsType = QueryData<ReturnType<typeof searchPosts>>

export type CategoryBySlugType = QueryData<ReturnType<typeof getCategoryBySlug>>

export type PostsByCategoryType = QueryData<ReturnType<typeof getPostsByCategory>>

export type CommentType = QueryData<ReturnType<typeof getComment>>