import type { User } from "src/drizzle/schema/auth"
import { db } from "../drizzle/db"
import { boardTable, type Board } from "../drizzle/schema/board"
import { errorResponse, successResponse } from "../utils/response"
import type { BoardSchema } from "../validators/board"
import { desc, eq } from "drizzle-orm"

type CreateBoardOptions = BoardSchema & { user: User }

export const createBoard = async ({ user, ...board }: CreateBoardOptions) => {
  if (!user.organization?.id) {
    return errorResponse("User is not associated with an organization")
  }

  const [newBoard] = await db
    .insert(boardTable)
    .values({ ...board, organizationId: user.organization.id })
    .returning({
      id: boardTable.id,
      title: boardTable.title,
      organizationId: boardTable.organizationId,
      createdAt: boardTable.createdAt,
      updatedAt: boardTable.updatedAt,
    })

  if (!newBoard) {
    return errorResponse("Failed to create board")
  }

  return successResponse<Board>(
    "Board created",
    newBoard satisfies Board as Board
  )
}

type GetBoardsOptions = { user: User }

export const getBoards = async ({ user }: GetBoardsOptions) => {
  if (!user.organization?.id) {
    return errorResponse("User is not associated with an organization")
  }

  const boards = await db
    .select()
    .from(boardTable)
    .where(eq(boardTable.organizationId, user.organization.id))
    .orderBy(desc(boardTable.createdAt))

  return successResponse<Board[]>(
    "Boards fetched",
    boards satisfies Board[] as Board[]
  )
}
