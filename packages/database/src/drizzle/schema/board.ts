import { text, uuid } from "drizzle-orm/pg-core"
import { schema } from "./schema"
import { lifecycleDates } from "./utils"

export const boardTable = schema.table("board", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),

  ...lifecycleDates,
})
