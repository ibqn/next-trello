import { z } from "zod"

export const groupSchema = z.object({
  title: z.string().min(1).max(255),
  boardId: z.string().uuid(),
})

export type GroupSchema = z.infer<typeof groupSchema>
