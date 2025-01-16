"use client"

import { organizationQueryOptions } from "@/api/organization"
import { useQuery } from "@tanstack/react-query"
import { BuildingIcon, CreditCardIcon } from "lucide-react"
import { Skeleton } from "./ui/skeleton"

export const Info = () => {
  const { data: organization, isLoading } = useQuery(organizationQueryOptions())

  return (
    <div className="flex items-center gap-x-4">
      <div className="h-[60px] w-[60px]">
        <BuildingIcon className="size-full" />
      </div>

      <div className="space-y-1">
        {isLoading ? (
          <Skeleton className="h-7 w-32" />
        ) : (
          <p className="text-xl font-semibold capitalize">{organization?.name}</p>
        )}

        <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
          <CreditCardIcon className="size-3" />
          {isLoading ? <Skeleton className="h-3 w-12" /> : <span>Free</span>}
        </div>
      </div>
    </div>
  )
}
