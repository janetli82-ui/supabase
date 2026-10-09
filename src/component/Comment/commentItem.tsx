import { CommentType, SinglePostType } from "@/lib/supabase/queries";
import DeleteCommentButton from "../Button/deleteCommentButton";
import ReplyCommentButton from "../Button/replyCommentButton";
import type { User } from "@supabase/supabase-js"

const CommentItem = ({ comments, comment, user, postdata, slug, depth }:{comments: CommentType | null, comment: CommentType[number], user: User | null, postdata: SinglePostType | null, slug:string, depth:number}) => {
  return (
    <div className="border-l-2 border-border pl-2" style={{ marginLeft: depth * 10 }}>
      <p>{comment.content}</p>
      <p className="text-right text-sm text-muted">
        created by {comment.Users.username}
      </p>
      <div className="flex items-center gap-2 mt-2 mb-2">
        {user &&
          (user.id === comment.user_id ||
            user.id === postdata!.author.id) && (
            <DeleteCommentButton commentId={comment.id} slug={slug} />
          )}
        {user && (
          <ReplyCommentButton
            postId={postdata!.id}
            parentId={comment.id}
            slug={slug}
          />
        )}
      </div>{" "}
      {comments!
        .filter((c) => c.parent_id === comment.id)
        .map((c) => (
          <div key={c.id} >
            <CommentItem
              comment={c}
              comments={comments}
              user={user}
              postdata={postdata}
              slug={slug}
              depth={depth + 1} 
            />
          </div>
        ))}
    </div>
  );
};

export default CommentItem;
