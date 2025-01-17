"use client"

import { boardQueryOptions } from "@/api/board"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { FormBoardTitle } from "../forms/form-board-title"

export const Navbar = () => {
  const { boardId } = useParams<{ boardId: string }>()
  const { data: board, isLoading } = useQuery(boardQueryOptions({ id: boardId }))
  return (
    <div className="fixed flex h-14 w-full items-center gap-x-4 bg-[#68DBFF] px-6 text-white">
      <FormBoardTitle board={board} isLoading={isLoading} />
    </div>
  )
}
