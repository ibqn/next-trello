import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {}

export const Footer = (props: Props) => {
  return (
    <div className="fixed bottom-0 flex w-full items-center border-b bg-slate-100 p-4">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-(--breakpoint-2xl)">
        <Logo />

        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/sign-in">Privacy Policy</Link>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/sign-up">Terms of Service</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
