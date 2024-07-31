import Link from "next/link"
import { redirect } from "next/navigation"
import { getUser } from "@/helpers/auth/actions"
import { getTodosByUserId } from "@/helpers/todo/actions"
import { Todo } from "@/types"
import AuthButton from "@/components/AuthButton"
import TodoForm from "./todo-form"
import TodoList from "./todo-list"

export default async function TodoPage() {
  const user = await getUser()
  if (!user) return redirect("/login")

  const todos: Todo[] = await getTodosByUserId(user.id)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <Link href="/" className="font-bold">
              Home
            </Link>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="w-full flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <TodoForm userId={user.id} />
          <TodoList userId={user.id} todos={todos} />
        </main>
      </div>
    </div>
  )
}