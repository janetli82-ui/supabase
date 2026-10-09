'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { logInSchema } from "./schemas"
import z from "zod"

export const LogIn = async(userdata:z.infer<typeof logInSchema>) => {
  const parseData = logInSchema.parse(userdata)

  const supabase = await createClient()
  const {error} = await supabase.auth.signInWithPassword(parseData)

  if(error) throw error

  redirect('/')
}