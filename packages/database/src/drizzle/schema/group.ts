import { integer, text, uuid } from "drizzle-orm/pg-core"
import { schema } from "./schema"
import { lifecycleDates } from "./utils"
import { relations, type InferSelectModel } from "drizzle-orm"
import { boardTable } from "./board"
import { organizationTable } from "./organization"
import { cardTable, type Card } from "./card"

export const groupTable = schema.table("group", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  order: integer("order").notNull(),

  boardId: uuid("board_id")
    .notNull()
    .references(() => boardTable.id),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizationTable.id),

  ...lifecycleDates,
})

export const groupRelations = relations(groupTable, ({ one, many }) => ({
  board: one(boardTable, {
    fields: [groupTable.boardId],
    references: [boardTable.id],
  }),
  organization: one(organizationTable, {
    fields: [groupTable.organizationId],
    references: [organizationTable.id],
  }),
  cards: many(cardTable),
}))

export type Group = InferSelectModel<typeof groupTable> & {
  cards?: Card[]
}
