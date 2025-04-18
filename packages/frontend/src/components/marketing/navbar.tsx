import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {}

export const Navbar = (props: Props) => {
  return (
    <div className="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-xs">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-(--breakpoint-2xl)">
        <Logo />

        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
