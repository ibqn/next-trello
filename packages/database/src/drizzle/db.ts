import { drizzle } from "drizzle-orm/postgres-js"
import { z } from "zod"
import {
  sessionRelations,
  sessionTable,
  userRelations,
  userTable,
} from "./schema/auth"
import { uploadRelations, uploadTable } from "./schema/upload"
import {
  organizationRelations,
  organizationTable,
  userOrganizationTable,
} from "./schema/organization"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})

export const processEnv = envSchema.parse(process.env)

export const db = drizzle(processEnv.DATABASE_URL, {
  schema: {
    user: userTable,
    userRelations,
    session: sessionTable,
    sessionRelations,
    upload: uploadTable,
    uploadRelations,
    organization: organizationTable,
    userOrganization: userOrganizationTable,
    organizationRelations,
  },
})
