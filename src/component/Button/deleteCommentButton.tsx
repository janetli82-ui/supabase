"use client"

import { DeleteComment } from "../../../actions/delete-comment-post-action";


export default function DeleteCommentButton({ commentId, slug }: { commentId: string; slug: string }) {
  return (
    <button onClick={() => DeleteComment(commentId, slug)} className="rounded-xl p-2 text-china-red border border-china-red hover:bg-china-red hover:text-white">
      Delete
    </button>
  )
}