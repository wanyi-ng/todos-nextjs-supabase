import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { createClient } from "@/utils/supabase/client"
import { Todo } from "@/types"

interface TodoState {
  todos: Todo[],
  loadTodos: () => Promise<void>,
  addTodo: (task: string, user_id: string) => Promise<void>,
  deleteTodo: (id: string) => Promise<void>,
  deleteAllTodos: (user_id: string) => Promise<void>,
  markTodoCompleted: (todo: Todo) => Promise<void>,
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        loadTodos: async () => {
          const supabase = createClient()

          const { data, error } = await supabase.from('todos').select()

          if (error) {
            return console.error(error)
          } else if (data) {
            set({
              todos: data
            })
            console.log(data)
          }
        },
        addTodo: async (task: string, user_id: string) => {
          const supabase = createClient()
          const { data, error } = await supabase.from('todos').insert({ task, completed: false, user_id })

          if (error) {
            return console.error(error)
          } else if (data) {
            set((state) => ({
              todos: [data[0], ...state.todos]
            }))
          }
        },
        deleteTodo: async (id: string) => {
          const supabase = createClient()

          const { error } = await supabase.from('todos').delete().match({ id })

          if (error) return console.error(error)

          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id)
          }))
        },
        deleteAllTodos: async (user_id: string) => {
          const supabase = createClient()

          const { error } = await supabase.from('todos').delete().match({ user_id })

          if (error) return console.error(error)

          set(() => ({
            todos: []
          }))
        },
        markTodoCompleted: async (todo: Todo) => {
          const supabase = createClient()

          const { error } = await supabase.from('todos').update({ ...todo, completed: !todo.completed }).match({ id: todo.id })

          if (error) return console.error(error)

          set((state) => ({
            todos: state.todos.map((t) => t.id === todo.id ? { ...todo, completed: !t.completed } : t)
          }))
        }
      }),
      { name: 'todos' }
    )
  )
)