import { z } from "zod"

export const organizationSchema = z.object({
  name: z.string().min(3).max(32),
  slug: z.string().min(3).max(32),
})

export type OrganizationSchema = z.infer<typeof organizationSchema>
