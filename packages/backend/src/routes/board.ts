import { Hono } from "hono"
import type { Context } from "../utils/context"
import { signedIn } from "src/middleware/signed-in"
import { zValidator } from "@hono/zod-validator"
import { boardSchema } from "database/src/validators/board"
import { createBoard } from "database/src/queries/board"
import type { ApiResponse } from "database/src/types"
import type { Board } from "database/src/drizzle/schema/board"

const boardRoute = new Hono<Context>().post(
  "/",
  signedIn,
  zValidator("json", boardSchema),
  async (c) => {
    const inputData = c.req.valid("json")
    const response = await createBoard(inputData)

    return c.json<ApiResponse<Board>>(response)
  }
)

export { boardRoute }
