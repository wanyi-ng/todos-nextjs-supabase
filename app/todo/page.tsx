import Link from "next/link"
import { redirect } from "next/navigation"
import { getUser } from "@/helpers/auth/actions"
import { getTodosByUserId } from "@/helpers/todo/actions"
import { ChevronUpDownIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Todo } from "@/types"
import AuthButton from "@/components/AuthButton"
import TodoForm from "./todo-form"

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

          <section className="flex flex-col max-w-screen-xl w-full mx-auto py-16 space-y-8">
            {todos.length > 0 && (
              <button
                type="submit"
                className="self-end px-[12px] py-[10px] rounded-[4px] md:px-[20px] lg:px-[24px] text-sm border border-red-600 text-red-600 hover:shadow-sm hover:shadow-zinc-100/30 hover:bg-red-500 hover:text-zinc-50"
                // onClick={() => deleteAllUserTodos(user.id)}
              >
                Delete all
              </button>
            )}

            {todos.map((todo) => (
              <li key={todo.id} className={`${todo.completed === true ? 'line-through' : '' } flex justify-between items-center gap-4 hover:bg-zinc-300/30 rounded-[4px] pl-4 pr-2 py-2 hover:cursor-grab`}>
                <div className='flex items-center gap-4'>
                  <ChevronUpDownIcon className='size-4' />
                  <input
                    type='checkbox'
                    defaultChecked={todo.completed}
                    // onClick={() => updateTodoById(todo.id, todo.completed)}
                  />
                  <p>{todo.task}</p>
                </div>
                <div className='flex items-center gap-6'>
                  <button
                    type='button'
                    className='p-2 hover:scale-125 rounded-[4px] hover:text-red-500'
                    // onClick={() => deleteTodoById(item.id)}
                  >
                    <TrashIcon className='size-4' />
                  </button>
                  <button type='button' className='p-2 hover:scale-125'>
                    <PencilSquareIcon className='size-4' />
                  </button>
                </div>
              </li>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}