'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { commentSchema } from "../../../actions/schemas"
import { CommentPost } from "../../../actions/comment-post-action"
import ErrorMessages from "../ErrorMessages"

const CommentForm = ({ postId, slug }: { postId: string; slug: string }) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver:zodResolver(commentSchema),
    defaultValues: { 
      content: "", 
      post_id: postId, 
      slug: slug,
    },
  })
  
  const { mutate } = useMutation({
    mutationFn: CommentPost,
    onSuccess: () => reset()                 
  })

  return(
    <form onSubmit={handleSubmit(values => mutate(values))} className=" flex flex-col mt-4">
      <label htmlFor="content">Add a comment</label>
      <textarea {...register("content")} placeholder="Write a comment..." />
      {errors.content && <ErrorMessages error={errors.content.message!} />}

      <button className="cursor-pointer bg-linear-to-r from-china-red to-china-red-dark text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-china-red hover:to-china-red-dark transition ease-in-out duration-150">Post</button>
    </form>
  )
}

export default CommentForm
