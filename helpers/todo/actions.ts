'use server'
import { createSupabaseServerClient } from "@/utils/supabase/server"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"

export async function getTodosByUserId(user_id: string) {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from('todos').select('*').eq('user_id', user_id)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function addTodo(task: string, user_id: string) {
  const supabase = createSupabaseServerClient()
  const result = await supabase.from("todos").insert({ task, completed: false, user_id })

  revalidatePath("/todo")
  return JSON.stringify(result)
}