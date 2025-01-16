import { text, uuid } from "drizzle-orm/pg-core"
import { schema } from "./schema"
import { lifecycleDates } from "./utils"
import type { InferSelectModel } from "drizzle-orm"

export const boardTable = schema.table("board", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),

  ...lifecycleDates,
})

export type Board = InferSelectModel<typeof boardTable>
