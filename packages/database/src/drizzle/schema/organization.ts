import { integer, primaryKey, text, uuid } from "drizzle-orm/pg-core"
import { userTable } from "./auth"
import { schema } from "./schema"
import { relations } from "drizzle-orm"
import { lifecycleDates } from "./utils"

export const organizationTable = schema.table("organization", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),

  ...lifecycleDates,
})

export const organizationRelations = relations(
  organizationTable,
  ({ many }) => ({
    users: many(userOrganizationTable),
  })
)

export const userOrganizationTable = schema.table(
  "user_organization",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizationTable.id),

    ...lifecycleDates,
  },
  (t) => [primaryKey({ columns: [t.userId, t.organizationId] })]
)
