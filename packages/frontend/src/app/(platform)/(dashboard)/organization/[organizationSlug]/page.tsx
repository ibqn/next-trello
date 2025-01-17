import { BoardList } from "@/components/board-list"
import { Info } from "@/components/info"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import { getOrganizationBySlug } from "database/src/queries/organization"

type Props = {
  params: Promise<{
    organizationSlug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { organizationSlug } = await params
  const organization = await getOrganizationBySlug(organizationSlug)
  const title = organization?.name ?? undefined

  return { title }
}

export default function OrganizationIdPage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  )
}
