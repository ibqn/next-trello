"use client"

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/utils/class-names"
import { ComponentProps, PropsWithChildren, useState } from "react"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { boardSchema, BoardSchema } from "database/src/validators/board"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"
import { ApiResponse, ErrorResponse } from "database/src/types"
import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { boardListQueryOptions, postBoard } from "@/api/board"

type Props = ComponentProps<typeof PopoverContent> & PropsWithChildren

export const FormPopover = ({ children, side = "bottom", sideOffset = 0, className, ...props }: Props) => {
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const form = useForm<BoardSchema>({ defaultValues: { title: "" }, resolver: zodResolver(boardSchema) })

  const isDisabled = form.formState.isSubmitting

  const queryClient = useQueryClient()

  const { mutate: createBoard } = useMutation({
    mutationFn: postBoard,
    onSuccess: async () => {
      console.log("created board")
      await queryClient.invalidateQueries({ queryKey: boardListQueryOptions().queryKey })
      setResponse({ success: true, message: "Board created" })
      toast("Create board Success", { description: "Board created" })
    },
    onError: (error) => {
      let message = "Failed to create board"
      if (error instanceof AxiosError) {
        const response = error.response?.data as ErrorResponse
        message = response.error
      }
      setResponse({ success: false, error: message })
      toast("Create board failed", { description: message })
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data)
    createBoard(data)
  })

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent sideOffset={sideOffset} side={side} {...props} className={cn("w-80 pt-3", className)}>
        <div className="text-center text-sm font-medium text-neutral-600">Create board</div>
        <PopoverClose asChild>
          <Button variant="ghost" className="absolute right-2 top-2 h-auto p-2 text-neutral-600">
            <XIcon className="size-4" />
          </Button>
        </PopoverClose>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        autoComplete="username"
                        placeholder="Username"
                        disabled={isDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {response?.success && <FormSuccess message={response.message} />}
            {response?.success === false && <FormError message={response.error} />}

            <Button type="submit" className="w-full" disabled={isDisabled}>
              Create board
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
