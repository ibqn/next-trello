import { text, uuid } from "drizzle-orm/pg-core"
import { schema } from "./schema"
import { lifecycleDates } from "./utils"
import { relations, type InferSelectModel } from "drizzle-orm"
import { organizationTable } from "./organization"
import { groupTable, type Group } from "./group"

export const boardTable = schema.table("board", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizationTable.id),
  title: text("title").notNull(),

  ...lifecycleDates,
})

export const boardRelations = relations(boardTable, ({ one, many }) => ({
  organization: one(organizationTable, {
    fields: [boardTable.organizationId],
    references: [organizationTable.id],
  }),
  groups: many(groupTable),
}))

export type Board = InferSelectModel<typeof boardTable> & {
  groups?: Group[]
}
