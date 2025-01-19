import { Sidebar } from "@/components/platform/sidebar"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function OrganizationLayout({ children }: Props) {
  return (
    <main className="mx-auto flex w-full max-w-6xl grow pt-20 md:pt-24 2xl:max-w-screen-xl">
      <div className="flex flex-1 gap-x-7">
        <div className="hidden w-64 shrink-0 md:flex md:flex-col">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  )
}
