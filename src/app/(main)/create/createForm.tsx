'use client'

import { useForm } from "react-hook-form"
import { postSchema } from "../../../../actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessages from "@/component/ErrorMessages"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "../../../../actions/create-post-action"
import { useState } from "react"

const CreatePostForm = ({categories} :{ categories: any[]}) => {
  const [files, setFiles] = useState<File[]>([])
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver:zodResolver(postSchema)
  })
  
  const {mutate, error} = useMutation({
    mutationFn: CreatePost
  })
  
 
  return(
    <div className="mx-auto grow">
      <h1 className="text-4xl text-center mb-5 mt-6">Create a Post</h1>
      <form onSubmit={handleSubmit(values => mutate({...values, img_url:files}))} className="flex flex-col w-full m-auto border-china-red border-3 rounded-2xl p-4 text-left">
        <label htmlFor="title">Add a title</label>
        <input id="title" {...register("title")} className="bg-white text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-china-red transition ease-in-out duration-150"  />
        {errors.title && <ErrorMessages error={errors.title.message!} />}

        <label htmlFor="content">Add some content</label>
        <textarea id="content" {...register("content")} className="bg-white text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-china-red transition ease-in-out duration-150" ></textarea>
        {errors.content && <ErrorMessages error={errors.content.message!} />}

        <label htmlFor="img_url">Add images(optional)</label>
        <input id="img_url" type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []))} className="bg-white text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-china-red transition ease-in-out duration-150"></input>

        <select {...register("category_id")}>
          <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>   
                {category.name}
              </option>
          ))}
        </select>
        {errors.category_id && <ErrorMessages error={errors.category_id.message!} />}

        <button className="cursor-pointer bg-linear-to-r from-china-red to-china-red-dark text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-china-red hover:to-china-red-dark transition ease-in-out duration-150">Create Post</button>
        {error && <ErrorMessages error={error.message} />}
      </form>
    </div>
  )
}

export default CreatePostForm

