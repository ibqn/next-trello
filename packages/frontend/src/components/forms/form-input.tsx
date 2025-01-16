import type { ComponentProps } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils/class-names"

type Props = ComponentProps<"input"> & {
  label: string
  errors?: string
}

export const FormInput = ({ label, className, ...props }: Props) => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {label && (
          <Label htmlFor={props.id} className="text-sm font-semibold text-neutral-700">
            {label}
          </Label>
        )}

        <Input
          {...props}
          className={cn("h-7 px-2 py-1 text-sm", className, props.error ? "border-red-500" : "border-gray-300")}
        />
      </div>
    </div>
  )
}
