import { HelpCircleIcon, User2Icon } from "lucide-react"
import { Hint } from "@/components/hint"

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2 text-lg font-semibold text-neutral-700">
        <User2Icon className="size-6" />
        Your boards
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div
          role="button"
          className="relative flex aspect-video size-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
        >
          <p className="text-sm">Create a new board</p>
          <span className="text-xs italic">5 remaining</span>
          <Hint
            sideOffset={40}
            description={
              <span>
                Free Organizations can have up to 5 open boards. For unlimited boards, upgrade to a paid plan.
              </span>
            }
          >
            <HelpCircleIcon className="absolute bottom-2 right-2 size-4" />
          </Hint>
        </div>
      </div>
    </div>
  )
}
