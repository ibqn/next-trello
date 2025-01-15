"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query-client"
import { useRouter, useSearchParams } from "next/navigation"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { ErrorResponse, SuccessResponse } from "database/src/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { organizationListQueryOptions } from "@/api/organization"
import { ArrowRight, BuildingIcon } from "lucide-react"

export const SelectOrgForm = () => {
  const [response, setResponse] = useState<SuccessResponse | ErrorResponse | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/"

  const queryClient = getQueryClient()

  const { data: organizations } = useQuery(organizationListQueryOptions())

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-lg font-semibold">
        <CardTitle>Select organization</CardTitle>
        <CardDescription>Choose an organization to continue</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-4">
        {organizations?.map((org) => (
          <div key={org.id} className="flex w-full items-center justify-between gap-2">
            <Link href={`/organization/${org.slug}`} className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md bg-gray-200">
                <BuildingIcon className="size-6" />
              </div>

              <span className="font-semibold capitalize">{org.name}</span>
            </Link>
            <Link href={`/organization/${org.slug}`} className="flex">
              <ArrowRight className="size-4" />
            </Link>
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
