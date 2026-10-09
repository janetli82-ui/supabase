"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { replyCommentSchema } from "../../../actions/schemas"
import { ReplyCommentPost } from "../../../actions/reply-post-action"
import { useMutation } from "@tanstack/react-query"
import ErrorMessages from "../ErrorMessages"
import { FaRegCommentDots } from "react-icons/fa6";
import { IoSendOutline } from "react-icons/io5";



export default function ReplyCommentButton({ postId, parentId, slug }:{postId:string, parentId:string, slug:string}) {

  const [reply, setReply] = useState(false)
  
  const handleClick = () => {
    setReply(!reply)
  }
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
      resolver:zodResolver(replyCommentSchema),
      defaultValues: { 
        content: "", 
        post_id: postId, 
        parent_id: parentId,
        slug: slug,
      },
    })
  const { mutate } = useMutation({
    mutationFn: ReplyCommentPost,
    onSuccess: () => {reset(), setReply(false)}             
  })  
  return (
    <div className="flex flex-col">
      <button onClick={handleClick} className="cursor-pointer">
        <FaRegCommentDots />
      </button>
      {reply && (
        <form onSubmit={handleSubmit(values => mutate(values))} className=" flex flex-col mt-4">
          <label htmlFor="content">Reply a comment</label>
          <textarea {...register("content")} placeholder="Write a comment..." />
          {errors.content && <ErrorMessages error={errors.content.message!} />}

          <button className="cursor-pointer mt-1"><IoSendOutline /></button>
        </form>
      )}
    </div>
  )
}