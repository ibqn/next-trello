"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import type { Board } from "database/src/drizzle/schema/board"
import { AlertModal } from "@/components/modals/alert-modal"
import { useDeleteBoard } from "@/hooks/use-delete-board"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { organizationQueryOptions } from "@/api/organization"

type Props = {
  board?: Board | null
}

export const BoardOptions = ({ board }: Props) => {
  const [open, setOpen] = useState(false)
  const { mutate: deleteBoard, isPending } = useDeleteBoard()
  const router = useRouter()
  const { data: organization } = useQuery(organizationQueryOptions())

  const onDeletion = () => {
    const id = board?.id
    if (!id) {
      return
    }

    deleteBoard({ id })

    if (organization) {
      router.push(`/organization/${organization.slug}`)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        message={
          <>
            Do you really want to delete <span className="italic">{board?.title}</span> board?
          </>
        }
        onClose={() => setOpen(false)}
        onDeletion={onDeletion}
        isDisabled={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Board actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)} className="text-red-600 focus:text-red-500">
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
