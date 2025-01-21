"use client"

import { useMobileSideBar } from "@/hooks/use-mobile-sidebar"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { VisuallyHidden } from "@/components/visually-hidden"

export const MobileSidebar = () => {
  const onClose = useMobileSideBar((state) => state.close)
  const isOpen = useMobileSideBar((state) => state.isOpen)
  const toggle = useMobileSideBar((state) => state.toggle)

  const pathname = usePathname()

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <>
      <Button onClick={toggle} size="sm" className="block md:hidden" variant="ghost">
        <MenuIcon className="size-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={toggle}>
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
        </VisuallyHidden>
        <SheetContent className="p-2 pt-20" side="left">
          <Sidebar storageKey="mobile-sidebar-state" />
        </SheetContent>
      </Sheet>
    </>
  )
}
