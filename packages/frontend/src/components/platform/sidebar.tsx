"use client"

import { organizationListQueryOptions, organizationQueryOptions } from "@/api/organization"
import { useLocalStorage } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { Accordion } from "@/components/ui/accordion"
import { SidebarItem } from "@/components/platform/sidebar-item"
import { Skeleton } from "@/components/ui/skeleton"

export const Sidebar = () => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>({ key: "sidebar-state", defaultValue: {} })

  const { data: selectedOrganization, isLoading: isOrganizationLoading } = useQuery(organizationQueryOptions())
  const { data: organizationList, isLoading: isOrganizationListLoading } = useQuery(organizationListQueryOptions())

  const accordionValues = Object.keys(expanded).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key)
    }
    return acc
  }, [])

  const toggleExpanded = (id: string) => setExpanded({ ...expanded, [id]: !expanded[id] })

  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Organizations</span>
        <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
          <Link href="/select-org">
            <PlusIcon className="size-4" />
          </Link>
        </Button>
      </div>

      {isOrganizationListLoading && isOrganizationLoading ? (
        <div className="flex flex-col gap-y-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-4">
              <Skeleton className="h-7 w-full" />
              <div className="flex flex-col gap-y-4 pl-10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-7 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Accordion type="multiple" className="space-y-2" value={accordionValues}>
          {selectedOrganization &&
            organizationList?.map((organization) => (
              <SidebarItem
                key={organization.id}
                organization={organization}
                isActive={selectedOrganization?.id === organization.id}
                isExpanded={expanded[organization.id]}
                setExpanded={toggleExpanded}
              />
            ))}
        </Accordion>
      )}
    </>
  )
}
