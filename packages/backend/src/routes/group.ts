import { Hono } from "hono"
import type { Context } from "../utils/context"
import { signedIn } from "../middleware/signed-in"
import { zValidator } from "@hono/zod-validator"
import { groupSchema } from "database/src/validators/group"
import { createGroup } from "database/src/queries/group"
import type { ApiResponse } from "database/src/types"
import type { Group } from "database/src/drizzle/schema/group"

const groupRoute = new Hono<Context>().post(
  "/",
  signedIn,
  zValidator("json", groupSchema),
  async (c) => {
    const user = c.get("user")
    const inputData = c.req.valid("json")

    const response = await createGroup({ ...inputData, user })
    return c.json<ApiResponse<Group>>(response)
  }
)

export { groupRoute }
