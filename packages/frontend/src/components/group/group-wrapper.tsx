import { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const GroupWrapper = (props: Props) => {
  return <div className="h-full w-[272px] shrink-0 select-none">{props.children}</div>
}
