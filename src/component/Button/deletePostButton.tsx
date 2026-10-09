'use client'

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { DeletePost } from "../../../actions/delete-post-action"

const DeleteButton = ({ id }:{ id:string }) => {
  const {mutate} = useMutation({
     mutationFn: DeletePost,
     onSettled: () => toast("Your posts has been deleted")
  })
   return(
    <>
      <button onClick={() => mutate(id)} className="rounded-xl p-3 text-china-red border border-china-red hover:bg-china-red hover:text-white">
        Delete Post
      </button>
    </>
   )
}

export default DeleteButton