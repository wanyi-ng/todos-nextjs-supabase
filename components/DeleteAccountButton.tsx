'use client'
import { deleteUser } from "@/helpers/auth/actions"

export default function DeleteAccountButton({ userId }: { userId: string }) {

  const handleDeleteAccount = async () => {
    await deleteUser(userId)
  }

  return (
    <button onClick={handleDeleteAccount} className="py-2 px-4 rounded-md no-underline border border-1 border-red-500 text-red-500 hover:bg-red-600/80 hover:text-white transition-all duration-150">
      Delete Account
    </button>
  )
}
