"use client"

import { HelpCircleIcon, User2Icon } from "lucide-react"
import { Hint } from "@/components/hint"
import { FormPopover } from "@/components/forms/form-popover"
import { useQuery } from "@tanstack/react-query"
import { boardListQueryOptions } from "@/api/board"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export const BoardList = () => {
  const { data: boards, isLoading } = useQuery(boardListQueryOptions())

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2 text-lg font-semibold text-neutral-700">
        <User2Icon className="size-6" />
        Your boards
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards?.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video size-full overflow-hidden rounded-sm bg-cover bg-center bg-no-repeat p-2"
          >
            <div className="absolute inset-0 bg-sky-500/10 transition group-hover:bg-sky-500/40" />
            <p className="relative font-semibold text-sky-700/90 hover:text-sky-700">{board.title}</p>
          </Link>
        )) ??
          (isLoading && Array.from({ length: 8 }, (_, i) => <Skeleton key={i} className="aspect-video size-full" />))}

        <FormPopover sideOffset={10} side="right">
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
        </FormPopover>
      </div>
    </div>
  )
}
