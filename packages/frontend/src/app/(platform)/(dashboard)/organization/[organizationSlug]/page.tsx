import { BoardList } from "@/components/board-list"
import { Info } from "@/components/info"
import { Separator } from "@/components/ui/separator"

export default function OrganizationIdPage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  )
}
