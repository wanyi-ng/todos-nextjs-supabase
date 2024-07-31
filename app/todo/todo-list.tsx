'use client'
import { Reorder } from "framer-motion"
import { ChevronUpDownIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Todo } from '@/types'
import { deleteTodoById, updateTodoById, deleteAllTodosByUserId } from '@/helpers/todo/actions'

export default function TodoList({ todos, userId }: { todos: Todo[], userId: string }) {

  const [reorderTodos, setReorderTodos] = useState(todos || [])

  return (
    <section className="flex flex-col max-w-screen-xl w-full mx-auto py-16 space-y-8">
      {todos.length > 0 && (
        <button
          type="submit"
          className="self-end px-[12px] py-[10px] rounded-[4px] md:px-[20px] lg:px-[24px] text-sm border border-red-600 text-red-600 hover:shadow-sm hover:shadow-zinc-100/30 hover:bg-red-500 hover:text-zinc-50"
          onClick={() => deleteAllTodosByUserId(userId)}
        >
          Delete all
        </button>
      )}

      <Reorder.Group axis="y" values={reorderTodos} onReorder={setReorderTodos}>
      {reorderTodos.map((todo: Todo) => (
        <Reorder.Item key={todo.id} value={todo} className={`${todo.completed === true ? 'line-through' : '' } flex justify-between items-center gap-4 hover:bg-zinc-300/30 rounded-[4px] pl-4 pr-2 py-2 hover:cursor-grab`}>
          <div className='flex items-center gap-4'>
            <ChevronUpDownIcon className='size-4' />
            <input
              type='checkbox'
              defaultChecked={todo.completed}
              onClick={() => updateTodoById(todo.id, todo.completed)}
            />
            <p>{todo.task}</p>
          </div>
          <div className='flex items-center gap-6'>
            <button
              type='button'
              className='p-2 hover:scale-125 rounded-[4px] hover:text-red-500'
              onClick={() => deleteTodoById(todo.id)}
            >
              <TrashIcon className='size-4' />
            </button>
          </div>
        </Reorder.Item>
      ))}
      </Reorder.Group>
    </section>
  )
}
