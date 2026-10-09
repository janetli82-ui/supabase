"use client"

import { DeleteComment } from "../../../actions/delete-comment-post-action";
import { TiDeleteOutline } from "react-icons/ti";

export default function DeleteCommentButton({ commentId, slug }: { commentId: string; slug: string }) {
  return (
    <button onClick={() => DeleteComment(commentId, slug)} className="cursor-pointer">
     <TiDeleteOutline />
    </button>
  )
}