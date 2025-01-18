"use client"

import { boardQueryOptions } from "@/api/board"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { GroupForm } from "@/components/group/group-form"
import { Group } from "database/src/drizzle/schema/group"
import { useEffect, useState } from "react"
import { GroupItem } from "@/components/group/group-item"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"

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
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="groups" type="group" direction="horizontal">
        {(provided) => (
          <ol {...provided.droppableProps} ref={provided.innerRef} className="flex flex-1 flex-row gap-3">
            {groupData.map((group, index) => (
              <GroupItem key={group.id} group={group} index={index} />
            ))}
            {provided.placeholder}
            <GroupForm />
            <div className="w-1 shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
