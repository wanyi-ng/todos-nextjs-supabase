'use client'
import { addTodo } from '@/helpers/todo/actions'
import { useState } from 'react'

export default function TodoForm({ userId }: { userId: string }) {
  const [todo, setTodo] = useState("")

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addTodo(todo, userId)
    setTodo("")
  }

  return (
    <form onSubmit={handleAddTodo} className="flex justify-center items-center gap-3">
      <label htmlFor="todo">Enter a task: </label>
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        name="todo"
        className="px-[12px] py-[6px] rounded-[4px] flex-1 bg-transparent border border-zinc-800 focus:border-zinc-100 focus:shadow-md"
        required
      />
      <button type="submit" className="px-[12px] py-[10px] rounded-[4px] md:px-[20px] lg:px-[24px] text-sm text-zinc-50 bg-zinc-950 hover:shadow-sm hover:shadow-zinc-100/30 hover:bg-zinc-800">Add</button>
    </form>
  )
}