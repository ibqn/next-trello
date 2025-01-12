import { Button } from "@/components/ui/button"
import { Medal } from "lucide-react"
import Link from "next/link"

export default function MarketingPage() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex flex-row gap-x-2 rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm">
          <Medal className="h-6 w-6" />
          <span>No 1 task management</span>
        </div>

        <h1 className="mb-6 text-center text-3xl text-neutral-600 md:text-6xl">Taskify helps team move</h1>
        <div className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 py-2 pb-4 text-3xl text-white md:text-6xl">
          work forward.
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-sm text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl">
        Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your
        team work is unique - accomplish it all with Taskify.
      </div>

      <Button asChild className="mt-6" size="lg">
        <Link href="/">Get Taskify for free</Link>
      </Button>
    </div>
  )
}
