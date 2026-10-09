'use client'

import Link from "next/link";
import { SignUp } from "../../../../actions/signup-actions";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../../../actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessages from "@/component/ErrorMessages";


const SignUpForm = () => {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver:zodResolver(signUpSchema)
  })
  return (
    <div className="m-auto">
       <div className="max-w-75 bg-white shadow-sm overflow-hidden rounded-2xl text-[#010101]">
        <form onSubmit={handleSubmit(values=> SignUp(values))} className="relative flex flex-col pt-8 px-6 pb-6 gap-4 text-center">
          <span className="font-bold text-2xl">Sign up</span>
          <span className="text-lg text-[#666]">Create a free account with your email.</span>
          <div className="overflow-hidden rounded-lg bg-white mt-4 mb-2 w-full">
            <input {...register("username")} type="text" className="border-0 outline-none h-10 w-full border-b border-gray-200 text-sm py-2 px-3.75" placeholder="Username" />
            {errors.username && <ErrorMessages error={errors.username.message!} />}
            
            <input {...register("email")}  type="email" className="border-0 outline-none h-10 w-full border-b border-gray-200 text-sm py-2 px-3.75" placeholder="Email" />
            {errors.email && <ErrorMessages error={errors.email.message!} />}

            <input {...register("password")}  type="password" className="border-0 outline-none h-10 w-full border-b border-gray-200 text-sm py-2 px-3.75" placeholder="Password" />
            {errors.password && <ErrorMessages error={errors.password.message!} />}
          </div>
          <button className="bg-china-red text-white border-0 rounded-3xl py-2.5 px-4 text-xl font-medium cursor-pointer transition-colors duration-300 ease-in-out hover:bg-china-red-dark">Sign up</button>
        </form>
        <div className="p-4 text-sm bg-gray-50 text-gray-700">
          <p>Have an account? <Link href="/auth/login" className="font-bold text-china-red transition-colors duration-300 ease-in-out hover:text-china-red-dark hover:underline">Log in</Link> </p>
        </div>
      </div>
    </div>
  );
}

 
export default SignUpForm