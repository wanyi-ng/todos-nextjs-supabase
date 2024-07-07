import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import TodoForm from "./todo-form"


export default async function TodoPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return redirect("/login")

  return (
    <main className="flex flex-col min-h-screen h-full p-24">
      <TodoForm userId={user.id} />
    </main>
  )
}
