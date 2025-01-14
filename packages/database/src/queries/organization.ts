import {
  organizationTable,
  userOrganizationTable,
  type Organization,
} from "../drizzle/schema/organization"
import { db } from "../drizzle/db"
import type { User } from "../drizzle/schema/auth"
import type { OrganizationSchema } from "../validators/organization"

type CreateOrganizationOptions = OrganizationSchema & {
  user: User
}

export const createOrganization = async ({
  user,
  ...inputData
}: CreateOrganizationOptions) => {
  const organization = await db.transaction(async (trx) => {
    const [organization] = await trx
      .insert(organizationTable)
      .values({
        ...inputData,
      })
      .returning({
        id: organizationTable.id,
        name: organizationTable.name,
        slug: organizationTable.slug,
        createdAt: organizationTable.createdAt,
        updatedAt: organizationTable.updatedAt,
      })

    const [userOrganization] = await trx
      .insert(userOrganizationTable)
      .values({
        organizationId: organization.id,
        userId: user.id,
      })
      .returning({
        organizationId: userOrganizationTable.organizationId,
        userId: userOrganizationTable.userId,
        createdAt: userOrganizationTable.createdAt,
        updatedAt: userOrganizationTable.updatedAt,
      })

    return organization satisfies Organization as Organization
  })

  return organization
}
