"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query-client"
import { useRouter, useSearchParams } from "next/navigation"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { organizationListQueryOptions, postSelectOrganization } from "@/api/organization"
import { ArrowRight, BuildingIcon } from "lucide-react"
import { Organization } from "database/src/drizzle/schema/organization"
import { ErrorResponse } from "database/src/types"

export const SelectOrgForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/"

  const queryClient = getQueryClient()

  const { data: organizations } = useQuery(organizationListQueryOptions())

  const { mutate: selectOrganization } = useMutation({
    mutationFn: postSelectOrganization,
    onSuccess: async (organization: Organization | null) => {
      console.log("Select organization success")

      toast("Organization selected successfully", { description: "Welcome back" })
      await queryClient.invalidateQueries({ queryKey: ["user"] })
      router.push(`/organization/${organization?.slug}`)
    },
    onError: (error) => {
      let message = "Select organization failed"

      if (error instanceof AxiosError) {
        const response = error.response?.data as ErrorResponse
        message = response.error
      }
      toast("Select organization failed", { description: message })
    },
  })

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-lg font-semibold">
        <CardTitle>Select organization</CardTitle>
        <CardDescription>Choose an organization to continue</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-4">
        {organizations?.map((organization) => (
          <div key={organization.id} className="flex w-full items-center justify-between gap-2">
            <button onClick={() => selectOrganization(organization.id)} className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md bg-gray-200">
                <BuildingIcon className="size-6" />
              </div>

              <span className="font-semibold capitalize">{organization.name}</span>
            </button>
            <button onClick={() => selectOrganization(organization.id)} className="flex">
              <ArrowRight className="size-4" />
            </button>
          </div>
        )) ?? <div className="text-sm italic text-muted-foreground">No organizations yet found</div>}

        <div className="relative w-full self-center text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
        <Button size="sm" variant="link" asChild className="px-0 font-normal">
          <Link href="/create-org">Create organization</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
