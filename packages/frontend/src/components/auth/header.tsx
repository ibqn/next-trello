import { GroupIcon } from "lucide-react"

type Props = {
  label: string
}

export const Header = ({ label }: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <div className="flex flex-row gap-x-2">
        <GroupIcon size={30} />
        <h1 className="text-3xl font-semibold">Next-Trello</h1>
      </div>

      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
