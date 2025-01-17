import { Hono } from "hono"
import type { Context } from "../utils/context"
import { signedIn } from "../middleware/signed-in"
import { zValidator } from "@hono/zod-validator"
import { boardSchema } from "database/src/validators/board"
import { createBoard, getBoards } from "database/src/queries/board"
import type { ApiResponse } from "database/src/types"
import type { Board } from "database/src/drizzle/schema/board"
import type { User } from "database/src/drizzle/schema/auth"

const boardRoute = new Hono<Context>()
  .post("/", signedIn, zValidator("json", boardSchema), async (c) => {
    const user = c.get("user") as User
    const inputData = c.req.valid("json")
    const response = await createBoard({ ...inputData, user })

    return c.json<ApiResponse<Board>>(response)
  })
  .get("/", signedIn, async (c) => {
    const user = c.get("user") as User

    const response = await getBoards({ user })
    return c.json<ApiResponse<Board[]>>(response)
  })

export { boardRoute }
