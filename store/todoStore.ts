import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { createClient } from "@/utils/supabase/client"
import { Todo } from "@/types"

interface TodoState {
  todos: Todo[],
  loadTodos: (user_id: string) => Promise<void>,
  addTodo: (task: string, user_id: string) => Promise<void>,
  deleteTodo: (id: string) => Promise<void>,
  deleteAllTodos: (user_id: string) => Promise<void>,
  markTodoCompleted: (id: string, currentState: boolean) => any,
  // markTodoCompleted: (todo: Todo) => Promise<void>,
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        loadTodos: async (user_id: string) => {
          const supabase = createClient()

          const { data, error } = await supabase.from('todos').select().match({ user_id })

          if (error) {
            return console.error(error)
          } else if (data) {
            // Sort todos to have completed ones at the bottom
            const sortedTodos = data.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1)

            set((state) => ({
              todos: sortedTodos
            }))
          }
        },
        addTodo: async (task: string, user_id: string) => {
          const supabase = createClient()
          const { data, error } = await supabase.from('todos').insert({ task, completed: false, user_id }).select()

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
        markTodoCompleted: async (id: string, completedStatus: boolean) => {
          const supabase = createClient()

          const { error } = await supabase.from('todos').update({ completed: !completedStatus }).match({ id })

          if (error) return console.error(error)

          set((state) => {
            const updatedTodos = state.todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)

            // Sort todos to have completed ones at the bottom
            const sortedTodos = updatedTodos.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1)

            return {
              todos: sortedTodos,
            }
          })
        },
      }),
      { name: 'todos' }
    )
  )
)