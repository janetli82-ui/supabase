'use client'

import Link from "next/link";
import { LogIn } from "../../../../actions/login-action";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "../../../../actions/schemas";
import ErrorMessages from "@/component/ErrorMessages";
import { useMutation } from "@tanstack/react-query";

const LogInForm = () => {

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver:zodResolver(logInSchema)
  })

  const {mutate, error, isPending} = useMutation({
    mutationFn: LogIn
  })

  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit((values) => mutate(values))}>
          <input {...register("email")} type="email" className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-china-red transition ease-in-out duration-150" placeholder="Email address" />
          {errors.email && <ErrorMessages error={errors.email.message!} />}
        
          <input {...register("password")} type="password" className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-china-red transition ease-in-out duration-150" placeholder="Password" />
          {errors.password && <ErrorMessages error={errors.password.message!} />}
         
          <div className="flex flex-col items-center">
            <p className="text-gray-900 mt-4"> Don't have an account? <Link href="/auth/signup" className="text-sm text-china-red hover:underline mt-4">Signup</Link></p>
          </div>
          <button className="bg-linear-to-r from-china-red to-china-red-dark text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-china-red hover:to-china-red-dark transition ease-in-out duration-150">{isPending? "Logging in" : "Log in!"}</button>
          {error && <ErrorMessages error={error.message} />}
        </form>
      </div>
    </div>
  );
}




export default LogInForm