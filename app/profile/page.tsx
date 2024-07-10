import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import AuthButton from "@/components/AuthButton"
import Link from "next/link"
import Footer from "@/components/Footer"


export default async function ProfilePage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <Link href="/" className="font-bold">Home</Link>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="w-full flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <Link
            href="/todo"
            className="w-max py-2 px-4 mb-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Dashboard
          </Link>

          <h2 className="font-bold text-4xl mb-4">Profile</h2>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-zinc-50">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user?.email}
              disabled
              className="px-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
