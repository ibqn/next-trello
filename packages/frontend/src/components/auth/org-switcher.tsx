"use client"

import { BuildingIcon, ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery } from "@tanstack/react-query"
import { organizationListQueryOptions, postSelectOrganization } from "@/api/organization"
import { userQueryOptions } from "@/api/auth"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { Organization } from "database/src/drizzle/schema/organization"
import { toast } from "sonner"
import { getQueryClient } from "@/lib/query-client"
import { Skeleton } from "../ui/skeleton"

export function OrganizationSwitcher() {
  const { data: organizations } = useQuery(organizationListQueryOptions())
  const { data: user, isLoading: isUserLoading } = useQuery(userQueryOptions())

  const queryClient = getQueryClient()

  const { mutate: selectOrganization } = useMutation({
    mutationFn: postSelectOrganization,
    onSuccess: async (organization: Organization | null) => {
      console.log("Select organization success")

      await queryClient.invalidateQueries({ queryKey: ["user"] })
      toast("Organization changed successfully", { description: "Welcome back" })
    },
  })

  const { organizationSlug } = useParams()
  console.log("organization", organizationSlug)

  useEffect(() => {
    const navigatedOrg = organizations?.find(({ slug }) => slug === organizationSlug)

    if (navigatedOrg && user?.organization && user.organization.id !== navigatedOrg.id) {
      selectOrganization(navigatedOrg.id)
    }
  }, [organizationSlug, organizations, user, selectOrganization])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between px-2">
          <div className="flex aspect-square size-6 items-center justify-center rounded-lg border bg-primary-foreground">
            <BuildingIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            {isUserLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <span className="truncate font-semibold capitalize">{user?.organization?.name ?? ""}</span>
            )}

            {/* <span className="truncate text-xs">basic</span> */}
          </div>
          <ChevronsUpDown className="ml-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">Organizations</DropdownMenuLabel>
        {organizations?.map((organization, index) => (
          <DropdownMenuItem key={organization.id} onClick={() => {}} className="gap-2 p-2">
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <BuildingIcon className="size-4 shrink-0" />
            </div>
            <span className="font-semibold capitalize">{organization.name}</span>

            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="text-sm font-medium text-muted-foreground">Add Organization</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
