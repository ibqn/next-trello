import { z } from "zod"

export const boardSchema = z.object({
  title: z.string().min(1).max(255),
})

export type BoardSchema = z.infer<typeof boardSchema>
