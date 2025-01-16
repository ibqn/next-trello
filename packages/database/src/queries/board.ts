import { db } from "../drizzle/db"
import { boardTable, type Board } from "../drizzle/schema/board"
import { errorResponse, successResponse } from "../utils/response"
import type { BoardSchema } from "../validators/board"

export const createBoard = async (board: BoardSchema) => {
  const [newBoard] = await db.insert(boardTable).values(board).returning({
    id: boardTable.id,
    title: boardTable.title,
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
