import { eq } from "drizzle-orm"
import { db } from "./drizzle/db"
import {
  permissionTable,
  rolePermissionTable,
  roleTable,
  userRoleTable,
} from "./drizzle/schema/roles"
import argon2 from "argon2"
import { userTable } from "./drizzle/schema/auth"

async function seed() {
  const permissions = [
    "user:create",
    "user:view",
    "user:update",
    "user:delete",

    "role:create",
    "role:view",
    "role:update",
    "role:delete",

    "organization:create",
    "organization:view",
    "organization:update",
    "organization:delete",
  ]

  const roles = ["admin", "user"]

  const users = [
    {
      username: "ibqn",
      passwordHash: await argon2.hash("rootme99"),
    },
  ]

  console.log("⏳ Seeding...")
  const start = Date.now()

  const insertedUsers = await db
    .insert(userTable)
    .values(users)
    .onConflictDoNothing()
    .returning({ id: userTable.id, username: userTable.username })

  console.log(`${insertedUsers.length} user item(s) inserted.`)

  const permissionResult = await db
    .insert(permissionTable)
    .values(permissions.map((name) => ({ name })))
    .onConflictDoNothing()
    .returning({ id: permissionTable.id })

  console.log(`${permissionResult.length} permission item(s) inserted.`)

  const roleResult = await db
    .insert(roleTable)
    .values(roles.map((name) => ({ name })))
    .onConflictDoNothing()
    .returning({ id: roleTable.id, name: roleTable.name })

  console.log(`${roleResult.length} role item(s) inserted.`)

  const [adminRole] = await db
    .select({ id: roleTable.id })
    .from(roleTable)
    .where(eq(roleTable.name, "admin"))
  const allPermissions = await db
    .select({ id: permissionTable.id })
    .from(permissionTable)

  const adminPermissions = allPermissions.map((permission) => ({
    permissionId: permission.id,
    roleId: adminRole.id,
  }))
  const adminPermissionsResult = await db
    .insert(rolePermissionTable)
    .values(adminPermissions)
    .onConflictDoNothing()
    .returning({
      roleId: rolePermissionTable.roleId,
      permissionId: rolePermissionTable.permissionId,
    })
  console.log(`${adminPermissionsResult.length} admin permission(s) inserted.`)

  const [user] = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.username, "ibqn"))

  const userRoleResult = await db
    .insert(userRoleTable)
    .values({
      userId: user.id,
      roleId: adminRole.id,
    })
    .onConflictDoNothing()
    .returning()
  console.log(`${userRoleResult.length} use role item(s) inserted.`)

  const end = Date.now()
  console.log(`Completed in ${end - start}ms.`)
}

seed()
  .then(() => {
    console.log("✅ Seeding successful")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Seeding failed")
    console.error(error)
    process.exit(1)
  })
