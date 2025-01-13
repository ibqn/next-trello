import { primaryKey, text, uuid } from "drizzle-orm/pg-core"
import { userTable } from "./auth"
import { schema } from "./schema"
import { relations } from "drizzle-orm"
import { lifecycleDates } from "./utils"

export const roleTable = schema.table("role", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),

  ...lifecycleDates,
})

export const roleRelations = relations(roleTable, ({ many }) => ({
  users: many(userRoleTable),
  permissions: many(rolePermissionTable),
}))

export const userRoleTable = schema.table(
  "user_role",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id),
    roleId: uuid("role_id")
      .notNull()
      .references(() => roleTable.id),

    ...lifecycleDates,
  },
  (t) => [primaryKey({ columns: [t.userId, t.roleId] })]
)

export const permissionTable = schema.table("permission", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),

  ...lifecycleDates,
})

export const permissionRelations = relations(permissionTable, ({ many }) => ({
  roles: many(rolePermissionTable),
}))

export const rolePermissionTable = schema.table(
  "role_permission",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => roleTable.id),
    permissionId: uuid("permission_id")
      .notNull()
      .references(() => permissionTable.id),

    ...lifecycleDates,
  },
  (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })]
)
