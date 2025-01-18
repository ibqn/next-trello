import type { Group } from "database/src/drizzle/schema/group"
import { GroupHeader } from "./group-header"

type Props = {
  group: Group
}

export const GroupItem = ({ group }: Props) => {
  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <GroupHeader group={group} />
      </div>
    </li>
  )
}
