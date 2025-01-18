import type { Group } from "database/src/drizzle/schema/group"
import { GroupHeader } from "@/components/group/group-header"
import { Draggable } from "@hello-pangea/dnd"

type Props = {
  group: Group
  index: number
}

export const GroupItem = ({ group, index }: Props) => {
  return (
    <Draggable draggableId={group.id} index={index}>
      {(provided) => (
        <li {...provided.draggableProps} ref={provided.innerRef} className="h-full w-[272px] shrink-0 select-none">
          <div {...provided.dragHandleProps} className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
            <GroupHeader group={group} />
          </div>
        </li>
      )}
    </Draggable>
  )
}
