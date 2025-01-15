import {
  organizationTable,
  userOrganizationTable,
  type Organization,
} from "../drizzle/schema/organization"
import { db } from "../drizzle/db"
import { userTable, type User } from "../drizzle/schema/auth"
import type { OrganizationSchema } from "../validators/organization"
import { and, eq } from "drizzle-orm"
import type { ApiResponse } from "../types"
import { errorResponse, successResponse } from "../utils/response"

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

    const [userUpdate] = await trx
      .update(userTable)
      .set({ organizationId: organization.id })
      .where(eq(userTable.id, user.id))
      .returning({
        id: userTable.id,
      })

    return organization satisfies Organization as Organization
  })

  return organization
}

export const getOrganizationBySlug = async (slug: string) => {
  const [{ organization }] = await db
    .select({
      organization: organizationTable,
    })
    .from(organizationTable)
    .where(eq(organizationTable.slug, slug))

  return organization satisfies Organization as Organization
}

type SelectOrganizationOptions = {
  userId: string
  organizationId: string
}

export const selectOrganization = async ({
  userId,
  organizationId,
}: SelectOrganizationOptions): Promise<ApiResponse<Organization>> => {
  const organizationResponse = await db.transaction(async (trx) => {
    const [organizationData] = await trx
      .select({ organization: organizationTable })
      .from(organizationTable)
      .where(eq(organizationTable.id, organizationId))

    if (!organizationData) {
      return errorResponse("Organization not found")
    }

    const { organization } = organizationData

    const [userOrganization] = await trx
      .select({
        userId: userOrganizationTable.userId,
        organizationId: userOrganizationTable.organizationId,
      })
      .from(userOrganizationTable)
      .where(
        and(
          eq(userOrganizationTable.userId, userId),
          eq(userOrganizationTable.organizationId, organizationId)
        )
      )

    if (!userOrganization) {
      return errorResponse("User is not a member of the organization")
    }

    const [userUpdate] = await trx
      .update(userTable)
      .set({ organizationId })
      .where(eq(userTable.id, userId))
      .returning({
        id: userTable.id,
      })

    if (!userUpdate) {
      return errorResponse("Failed to set organization for user")
    }

    return successResponse("Organization selected", organization)
  })

  return organizationResponse
}

export const getOrganizationsByUserId = async (userId: string) => {
  const organizationsData = await db
    .select({
      organization: organizationTable,
    })
    .from(userOrganizationTable)
    .where(eq(userOrganizationTable.userId, userId))
    .innerJoin(
      organizationTable,
      eq(userOrganizationTable.organizationId, organizationTable.id)
    )

  const organizations = organizationsData.map(
    ({ organization }) => organization satisfies Organization as Organization
  )

  return organizations
}
