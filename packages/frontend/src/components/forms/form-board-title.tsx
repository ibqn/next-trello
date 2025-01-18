"use client"

import type { Board } from "database/src/drizzle/schema/board"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { boardSchema, BoardSchema } from "database/src/validators/board"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useUpdateBoard } from "@/hooks/use-update-board"
import { cn } from "@/utils/class-names"
import { useClickOutside } from "@mantine/hooks"

type Props = {
  board?: Board | null
  isLoading: boolean
}

export const FormBoardTitle = ({ board, isLoading }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<BoardSchema>({
    resolver: zodResolver(boardSchema),
    defaultValues: { title: board?.title ?? "" },
    mode: "onBlur",
  })

  const ref = useClickOutside(() => setIsEditing(false))

  const isDisabled = form.formState.isSubmitting

  const { mutate: updateBoard } = useUpdateBoard()

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      form.setFocus("title")
    })
  }

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
    const id = board?.id
    if (!id) {
      return
    }
    updateBoard({ id, ...data }, { onSuccess: () => setIsEditing(false) })
  })

  useEffect(() => {
    form.setValue("title", board?.title ?? "")
  }, [board, form])

  return (
    <>
      {isEditing ? (
        <Form {...form}>
          <form ref={ref} className="flex flex-1" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-start space-y-0">
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="board title..."
                      disabled={isDisabled}
                      className={cn(
                        "h-7 w-64 border-none bg-transparent px-2 py-1 text-lg font-bold",
                        "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 md:text-lg"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Button onClick={enableEditing} variant="transparent" className="h-auto w-auto p-1 px-2 text-lg font-bold">
          {board?.title ?? (isLoading && <Skeleton className="h-5 w-32" />)}
        </Button>
      )}
    </>
  )
}
