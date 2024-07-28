"use server"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return redirect("/login")

  return user
}

export async function readUserSession() {
  noStore()
  const supabase = createSupabaseServerClient()
  return await supabase.auth.getSession()
}

export async function signIn(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  return redirect('/todo')
};

export async function signUp(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const origin = headers().get("origin")
  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    }
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check email to continue sign in process')
};

export async function signOut() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  return redirect("/login");
};