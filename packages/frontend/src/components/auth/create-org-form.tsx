"use client"

import { useForm } from "react-hook-form"
import { type OrganizationSchema, organizationSchema } from "database/src/validators/organization"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query-client"
import { postSignin } from "@/api/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { ErrorResponse, SuccessResponse } from "database/src/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export const CreateOrgForm = () => {
  const [response, setResponse] = useState<SuccessResponse | ErrorResponse | null>(null)

  const form = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/"

  const queryClient = getQueryClient()

  const { mutate: signin } = useMutation({
    mutationFn: postSignin,
    onSuccess: async () => {
      console.log("Signin success")
      setResponse({ success: true, message: "Welcome back" })

      toast("Sign in success", { description: "Welcome back" })
      await queryClient.invalidateQueries({ queryKey: ["user"] })
      router.push(redirect)
    },
    onError: (error) => {
      let message = "Signin failed"

      if (error instanceof AxiosError) {
        const response = error.response?.data as ErrorResponse
        message = response.error
      }
      setResponse({ success: false, error: message })
      toast("Sign in failed", { description: message })
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data)
    signin(data)
  })

  const isDisabled = form.formState.isSubmitting

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl font-semibold">Create organization</CardTitle>
        <CardDescription className="text-balance text-sm text-muted-foreground">
          Create a new organization to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Organization name" disabled={isDisabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug URL</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="slug ..." disabled={isDisabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {response?.success && <FormSuccess message={response.message} />}
            {response?.success === false && <FormError message={response.error} />}

            <Button type="submit" className="w-full" disabled={isDisabled}>
              Create organization
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
        </div>

        <Button size="sm" variant="link" asChild className="px-0 font-normal">
          <Link href="/select-org">Select an existing organization</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
