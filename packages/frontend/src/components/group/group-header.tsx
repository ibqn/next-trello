import type { Group } from "database/src/drizzle/schema/group"

type Props = {
  group: Group
}

export const GroupHeader = ({ group }: Props) => {
  return <div className="flex items-start justify-between gap-2 px-2 pt-2 text-sm font-semibold">{group.title}</div>
}
