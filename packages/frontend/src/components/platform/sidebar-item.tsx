import type { Organization } from "database/src/drizzle/schema/organization"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/utils/class-names"
import { ActivityIcon, Building2Icon, CreditCardIcon, LayoutIcon, SettingsIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type Props = {
  isActive: boolean
  isExpanded: boolean
  setExpanded: (id: string) => void
  organization: Organization
}

export const SidebarItem = ({ organization, setExpanded, isActive, isExpanded }: Props) => {
  const routes = [
    { label: "Boards", icon: LayoutIcon, href: `/organization/${organization.slug}` },
    { label: "Activity", icon: ActivityIcon, href: `/organization/${organization.slug}/activity` },
    { label: "Settings", icon: SettingsIcon, href: `/organization/${organization.slug}/settings` },
    { label: "Billing", icon: CreditCardIcon, href: `/organization/${organization.slug}/billing` },
  ]

  const router = useRouter()
  const pathname = usePathname()

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => setExpanded(organization.id)}
        className={cn(
          "flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative size-7">
            <Building2Icon />
          </div>
          <span className="text-sm font-medium capitalize">{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.label}
            onClick={() => {
              router.push(route.href)
            }}
            variant="ghost"
            size="sm"
            className={cn(
              "mb-1 w-full justify-start pl-10 font-normal",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
          >
            <route.icon className="size-5" />
            <span>{route.label}</span>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}
