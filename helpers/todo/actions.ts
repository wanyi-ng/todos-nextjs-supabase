import { createSupabaseBrowserClient } from "@/utils/supabase/client"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"

export async function getAllTodos() {
  noStore()
  const supabase = await createSupabaseBrowserClient()
  return await supabase.from("todos").select("*")
}

export async function addTodo(task: string, user_id: string) {
  const supabase = await createSupabaseBrowserClient()
  const result = await supabase.from("todos").insert({ task, completed: false }).match({ user_id })

  revalidagePath("/todo")
  return JSON.stringify(result)
}

export async function deleteTodoById(id: string) {
  const supabase = await createSupabaseBrowserClient()
  await supabase.from("todos").delete().eq("id", id) 
  
  revalidatePath("/todo")
}

export async function updateTodoById(id: string, status: boolean) {
  const supabase = await createSupabaseBrowserClient()
  await supabase.from("todos").update({ completed: !status }).eq("id", id)
  
  revalidatePath("/todo")
}

export async function deleteAllUserTodos(user_id: string) {
  const supabase = await createSupabaseBrowserClient()
  await supabase.from("todos").delete().match({ user_id })

  revalidatePath("/todo")
}