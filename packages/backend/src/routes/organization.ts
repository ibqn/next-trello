import type { Context } from "../utils/context"
import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import type { ApiResponse, SuccessResponse } from "database/src/types"
import { HTTPException } from "hono/http-exception"
import { signedIn } from "../middleware/signed-in"
import { organizationSchema } from "database/src/validators/organization"
import type { User } from "database/src/drizzle/schema/auth"
import {
  createOrganization,
  getOrganizationBySlug,
  getOrganizationsByUserId,
  selectOrganization,
} from "database/src/queries/organization"
import type { Organization } from "database/src/drizzle/schema/organization"
import { paramIdSchema } from "database/src/validators/param"

const organizationRoute = new Hono<Context>()
  .post("/", signedIn, zValidator("json", organizationSchema), async (c) => {
    const orgData = c.req.valid("json")
    const user = c.get("user") as User

    const organization = await createOrganization({ ...orgData, user })

    if (!organization) {
      throw new HTTPException(409, { message: "Failed to create organization" })
    }

    return c.json<SuccessResponse<Organization>>(
      { success: true, message: "Organization created", data: organization },
      201
    )
  })
  .get("/", signedIn, async (c) => {
    const user = c.get("user") as User

    const organizations = await getOrganizationsByUserId(user.id)

    return c.json<SuccessResponse<Organization[]>>({
      success: true,
      message: "Organization list retrieved",
      data: organizations,
    })
  })
  .get("/current", signedIn, async (c) => {
    const user = c.get("user") as User

    return c.json<SuccessResponse<Organization | null>>({
      success: true,
      message: "Current Organization",
      data: user.organization ?? null,
    })
  })
  .get("/:id", signedIn, zValidator("param", paramIdSchema), async (c) => {
    const { id: slug } = c.req.valid("param")

    const organization = await getOrganizationBySlug(slug)

    if (!organization) {
      throw new HTTPException(404, { message: "Organization not found" })
    }

    return c.json<SuccessResponse<Organization>>({
      success: true,
      message: "Organization found",
      data: organization,
    })
  })
  .post("/:id", signedIn, zValidator("param", paramIdSchema), async (c) => {
    const { id: organizationId } = c.req.valid("param")
    const user = c.get("user") as User

    const organizationResponse = await selectOrganization({
      userId: user.id,
      organizationId,
    })

    return c.json<ApiResponse<Organization>>(organizationResponse)
  })

export { organizationRoute }
