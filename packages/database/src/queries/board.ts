import type { User } from "src/drizzle/schema/auth"
import { db } from "../drizzle/db"
import { boardTable, type Board } from "../drizzle/schema/board"
import { errorResponse, successResponse } from "../utils/response"
import type { BoardSchema } from "../validators/board"
import { and, desc, eq } from "drizzle-orm"
import type { ParamIdSchema } from "../validators/param"
import { groupTable, type Group } from "../drizzle/schema/group"
import { aggregateOneToMany } from "./one-many"

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

  const rowData = await db
    .select({ board: boardTable, groups: groupTable })
    .from(boardTable)
    .where(eq(boardTable.organizationId, user.organization.id))
    .leftJoin(groupTable, eq(groupTable.boardId, boardTable.id))
    .orderBy(desc(groupTable.order))

  // const boards = Object.values(
  //   rowData.reduce<Record<string, Board>>((acc, row) => {
  //     const board = row.board as Board
  //     const group = row.group as Group
  //     if (!acc[board.id]) {
  //       acc[board.id] = board
  //       acc[board.id].groups = []
  //     }

  //     acc[board.id].groups!.push(group)

  //     return acc
  //   }, {})
  // )
  const boards = aggregateOneToMany(rowData, "board", "groups")

  console.log(rowData)

  return successResponse<Board[]>(
    "Boards fetched",
    boards satisfies Board[] as Board[]
  )
}

type GetBoardByIdOptions = ParamIdSchema & { user: User }

export const getBoardById = async ({ id, user }: GetBoardByIdOptions) => {
  if (!user.organization?.id) {
    return errorResponse("User is not associated with an organization")
  }

  const rowData = await db
    .select({ board: boardTable, groups: groupTable })
    .from(boardTable)
    .where(
      and(
        eq(boardTable.organizationId, user.organization.id),
        eq(boardTable.id, id)
      )
    )
    .leftJoin(groupTable, eq(groupTable.boardId, boardTable.id))

  const [board] = aggregateOneToMany(rowData, "board", "groups")

  if (!board) {
    return errorResponse("Board not found")
  }

  return successResponse<Board>("Board fetched", board satisfies Board as Board)
}

type UpdateBoardOptions = ParamIdSchema & BoardSchema & { user: User }

export const updateBoard = async ({
  id,
  user,
  ...inputData
}: UpdateBoardOptions) => {
  if (!user.organization?.id) {
    return errorResponse("User is not associated with an organization")
  }

  const [updatedBoard] = await db
    .update(boardTable)
    .set(inputData)
    .where(
      and(
        eq(boardTable.organizationId, user.organization.id),
        eq(boardTable.id, id)
      )
    )
    .returning({
      id: boardTable.id,
      title: boardTable.title,
      organizationId: boardTable.organizationId,
      createdAt: boardTable.createdAt,
      updatedAt: boardTable.updatedAt,
    })

  if (!updatedBoard) {
    return errorResponse("Failed to update board")
  }

  return successResponse<Board>(
    "Board updated",
    updatedBoard satisfies Board as Board
  )
}

type DeleteBoardOptions = ParamIdSchema & { user: User }

export const deleteBoard = async ({ id, user }: DeleteBoardOptions) => {
  if (!user.organization?.id) {
    return errorResponse("User is not associated with an organization")
  }

  const [deletedBoard] = await db
    .delete(boardTable)
    .where(
      and(
        eq(boardTable.organizationId, user.organization.id),
        eq(boardTable.id, id)
      )
    )
    .returning({
      id: boardTable.id,
      title: boardTable.title,
      organizationId: boardTable.organizationId,
      createdAt: boardTable.createdAt,
      updatedAt: boardTable.updatedAt,
    })

  if (!deletedBoard) {
    return errorResponse("Failed to delete board")
  }

  return successResponse<Board>(
    "Board deleted",
    deletedBoard satisfies Board as Board
  )
}
