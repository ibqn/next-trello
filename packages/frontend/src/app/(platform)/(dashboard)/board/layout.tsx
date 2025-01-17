import { Navbar } from "@/components/board/navbar"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function BoardLayout({ children }: Props) {
  return (
    <div className="relative flex w-full flex-1 flex-col gap-10 pt-14">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl pt-20 md:pt-24 2xl:max-w-screen-xl">{children}</main>
    </div>
  )
}
