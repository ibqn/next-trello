import { User2Icon } from "lucide-react"

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2 text-lg font-semibold text-neutral-700">
        <User2Icon className="size-6" />
        Your boards
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"></div>
    </div>
  )
}
