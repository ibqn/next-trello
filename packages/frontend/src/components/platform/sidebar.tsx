"use client"

import { organizationListQueryOptions, organizationQueryOptions } from "@/api/organization"
import { useLocalStorage } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { Button } from "../ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { Accordion } from "../ui/accordion"
import { SidebarItem } from "./sidebar-item"

export const Sidebar = () => {
  const [exapded, setExpanded] = useLocalStorage<Record<string, any>>("sidebar-state", {})

  const { data: organization, isLoading: isOrganizationLoading } = useQuery(organizationQueryOptions())
  const { data: organizationList, isLoading: isOrganizationListLoading } = useQuery(organizationListQueryOptions())

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

      <Accordion type="multiple" className="space-y-2">
        {organizationList?.map((org) => (
          <SidebarItem
            key={org.id}
            organization={org}
            isActive={organization?.id === org.id}
            isExpanded={false}
            setExpanded={setExpanded}
          />
        ))}
      </Accordion>
    </>
  )
}
