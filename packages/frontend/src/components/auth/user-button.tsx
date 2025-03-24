"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { getSignout } from "@/api/auth"
import { useRouter } from "next/navigation"
import { getQueryClient } from "@/lib/query-client"

export const UserButton = () => {
  const router = useRouter()
  const queryClient = getQueryClient()
  const { mutate: signout } = useMutation({
    mutationFn: getSignout,
    onSettled: async () => {
      queryClient.setQueryData(["user"], null)
    },
  })

  const handleSignOut = () => {
    console.log("Sign out")
    signout()
    router.push("/sign-in")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-9">
          <AvatarImage src={undefined} />
          <AvatarFallback className="bg-linear-to-r from-slate-100 to-slate-200">
            <User size={19} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
