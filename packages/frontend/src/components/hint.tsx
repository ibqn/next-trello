import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/utils/class-names"
import { ComponentProps, PropsWithChildren, ReactNode } from "react"

type Props = ComponentProps<typeof TooltipContent> &
  PropsWithChildren<{
    description: ReactNode
  }>

export const Hint = ({ children, description, sideOffset = 0, side = "bottom", className, ...props }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          {...props}
          className={cn("max-w-[220px] break-words text-sm", className)}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
