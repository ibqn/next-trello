"use client"

import { boardQueryOptions } from "@/api/board"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { GroupForm } from "./group-form"
import { Group } from "database/src/drizzle/schema/group"
import { useEffect, useState } from "react"
import { GroupItem } from "./group-item"

export const GroupContainer = () => {
  const { boardId } = useParams<{ boardId: string }>()
  const { data: board, isLoading } = useQuery(boardQueryOptions({ id: boardId }))

  const [groupData, setGroupData] = useState<Group[]>([])

  console.log(board)

  useEffect(() => {
    if (board?.groups) {
      setGroupData(board.groups ?? [])
    }
  }, [board])

  return (
    <ol className="flex flex-1 flex-row gap-3">
      {groupData.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
      <GroupForm />
      <div className="w-1 shrink-0" />
    </ol>
  )
}
