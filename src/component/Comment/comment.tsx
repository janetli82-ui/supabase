import { getComment, getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import CommentItem from "./commentItem";
import CommentForm from "../CommentForm";

const Comment = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await getSinglePost(slug, supabase);
  const { data: comments } = await getComment(data!.id, supabase);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mt-2 border p-2 rounded-xl border-china-red">
      {comments!
        .filter((c) => c.parent_id === null)
        .map((c) => (
          <div key={c.id}>
            <CommentItem comment={c} comments={comments} user={user} postdata={data} slug={slug} depth={0}/>
          </div>
        ))}
      {user ? (
        <CommentForm postId={data!.id} slug={slug} />
      ) : (
        <p>Please Log in to comment</p>
      )}
    </div>
  );
};

export default Comment;
