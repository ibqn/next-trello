import { useForm } from "react-hook-form"
import { GroupWrapper } from "./group-wrapper"
import { Button } from "@/components/ui/button"
import { PlusIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useClickOutside } from "@mantine/hooks"
import { Input } from "@/components/ui/input"
import { groupSchema, GroupSchema } from "database/src/validators/group"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useCreateGroup } from "@/hooks/use-create-group"

export const GroupForm = () => {
  const [isEditing, setIsEditing] = useState(false)
  const ref = useClickOutside(() => setIsEditing(false))
  const { boardId } = useParams<{ boardId: string }>()

  const form = useForm<GroupSchema>({
    resolver: zodResolver(groupSchema),
    defaultValues: { title: "", boardId },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      form.setFocus("title")
    })
  }

  const { mutate: createGroup } = useCreateGroup()

  const isDisabled = form.formState.isSubmitting

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
    createGroup(data, { onSuccess: () => setIsEditing(false) })
  })

  return (
    <GroupWrapper>
      {isEditing ? (
        <Form {...form}>
          <form ref={ref} onSubmit={handleSubmit} className="w-full space-y-4 rounded-md bg-[#f1f2f4] p-4 shadow-md">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="h-7 px-2 py-1 text-sm font-medium"
                      placeholder="group title..."
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-2">
              <Button type="submit" className="h-auto py-1.5" disabled={isDisabled}>
                Add group
              </Button>

              <Button className="h-8" variant="ghost">
                <XIcon className="text-rose-700" />
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Button
          variant="secondary"
          className="flex w-full flex-row items-center justify-start rounded-md bg-[#f1f2f4] p-3 text-sm font-medium transition hover:bg-[#f1f2f4]/80"
          onClick={enableEditing}
        >
          <PlusIcon className="size-4" />
          Add a group
        </Button>
      )}
    </GroupWrapper>
  )
}
