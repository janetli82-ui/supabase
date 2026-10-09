import { createClient } from "@/lib/supabase/serverClient"
import CreatePostForm from "./createForm"

export default async function CreatePage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("Categories").select("id, name")

  return <CreatePostForm categories={categories!} />
}
