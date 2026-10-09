import { getSinglePost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import EditPostForm from "./editForm"


export default async function EditPage({params}:{params:{slug:string}}) {
  const {slug} = await params
  const supabase = await createClient()
  const {data:{user}} = await supabase.auth.getUser()
  const { data: categories } = await supabase.from("Categories").select("id, name")
  const { data } = await getSinglePost(slug, supabase)
  if(user && data && user.id !== data.author.id)
    redirect("/")
   
  return <EditPostForm categories={categories!} initialValues={{title:data!.title, content:data!.content, category_id: data!.category_id, img_url:[]}} postId={data!.id}/>
}


