import { createSupabaseBrowserClient } from "@/utils/supabase/server"

export async function addTodo(task: string, user_id: stri g) {
  const supabase = createSupabaseBrowserClient()
  const result = await supabase.from("todos").insert({ task, completed: false }).match({ user_id })
}