import HomePosts from "@/component/HomePosts";
import { getHomePosts } from "../../lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";


export const revalidate = 600
export default async function Home() {
  const supabase = await createClient()
  const { data } = await getHomePosts(supabase);

  return (
    <div className="flex flex-col gap-3 m-4">
      <h1 className="text-4xl text-center text-ink font-bold my-8">
        Welcome to Chinese Snacks Community
      </h1>
      {data && <HomePosts posts={data} />}
    </div>
  );
}
