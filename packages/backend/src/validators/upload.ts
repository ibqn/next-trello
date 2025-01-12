import { z } from "zod"

export const uploadSchema = z.object({
  file: z.instanceof(File),
  description: z.string().optional(),
  isPublic: z.coerce.boolean().optional(),
})

export type UploadSchema = z.infer<typeof uploadSchema>
