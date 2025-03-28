import { primaryKey, text, uuid } from "drizzle-orm/pg-core"
import { userTable } from "./auth"
import { schema } from "./schema"
import { relations, type InferSelectModel } from "drizzle-orm"
import { lifecycleDates } from "./utils"

export const organizationTable = schema.table("organization", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),

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
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizationTable.id),

    ...lifecycleDates,
  },
  (t) => [primaryKey({ columns: [t.userId, t.organizationId] })]
)

export type Organization = InferSelectModel<typeof organizationTable>
