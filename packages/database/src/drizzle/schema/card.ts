import { integer, text, uuid } from "drizzle-orm/pg-core"
import { schema } from "./schema"
import { lifecycleDates } from "./utils"
import { relations, type InferSelectModel } from "drizzle-orm"
import { groupTable } from "./group"
import { organizationTable } from "./organization"

export const cardTable = schema.table("card", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),

  groupId: uuid("group_id")
    .notNull()
    .references(() => groupTable.id),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizationTable.id),

  ...lifecycleDates,
})

export const cardRelations = relations(cardTable, ({ one }) => ({
  group: one(groupTable, {
    fields: [cardTable.groupId],
    references: [groupTable.id],
  }),
  organization: one(organizationTable, {
    fields: [cardTable.organizationId],
    references: [organizationTable.id],
  }),
}))

export type Card = InferSelectModel<typeof cardTable>
