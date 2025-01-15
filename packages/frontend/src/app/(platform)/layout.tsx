import { validateRequest } from "@/auth"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default async function PlatformLayout({ children }: Props) {
  const { user } = await validateRequest()
  if (!user) {
    return redirect("/sign-in")
  }

  if (!user.organizationId) {
    return redirect("/select-org")
  }

  return children
}
