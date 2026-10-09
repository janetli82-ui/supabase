import { createClient } from "@/lib/supabase/serverClient";
import { getComment, getSinglePost } from "../../../lib/supabase/queries";
import DeleteButton from "@/component/Button/deletePostButton";
import Link from "next/link";
import Comment from "@/component/Comment/comment";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await getSinglePost(slug, supabase);
  const isAuthor: boolean =
    user && data && user.id === data.author.id ? true : false;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border border-border rounded-2xl mb-4 p-4 bg-white shadow-sm mt-3 m-auto min-w-sm">
        {data && (
          <div className="flex flex-col justify-center w-full">
            <h2 className="text-2xl text-center p-3">{data.title}</h2>
            <p className="text-center mb-2">{data.content}</p>
            <p className="text-right text-muted text-sm">
              Created by {data!.author.username}
            </p>
            <div className="flex justify-center items-center gap-2 mt-2">
              {data.img_url &&
                data.img_url.map((img, index) => (
                  <img src={img} alt={img} key={index} className="w-30 h-fit"/>
                ))}
            </div>
            {isAuthor && (
              <div className="flex flex-col gap-4">
                <div className="flex mt-4 gap-6 justify-between">
                  <DeleteButton id={data.id} />
                  <Link
                    href={`/${slug}/edit`}
                    className="rounded-xl p-3 text-china-red border border-china-red hover:bg-china-red hover:text-white"
                  >
                    Edit Post
                  </Link>
                </div>
              </div>
            )}
            <div className="mt-6">
              <h3 className="font-bold">Comments</h3>
              <Comment params={params} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
