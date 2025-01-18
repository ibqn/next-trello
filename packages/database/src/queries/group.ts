import { and, desc, eq } from "drizzle-orm"
import { db } from "src/drizzle/db"
import type { User } from "src/drizzle/schema/auth"
import { boardTable } from "src/drizzle/schema/board"
import { groupTable, type Group } from "src/drizzle/schema/group"
import { errorResponse, successResponse } from "src/utils/response"
import type { GroupSchema } from "src/validators/group"

type CreateBoardOptions = GroupSchema & { user: User }

export const createGroup = async ({ user, ...group }: CreateBoardOptions) => {
  if (!user.organization?.id) {
    return errorResponse("User is not associated with an organization")
  }

  const [board] = await db
    .select({ id: boardTable.id })
    .from(boardTable)
    .where(
      and(
        eq(boardTable.id, group.boardId),
        eq(boardTable.organizationId, user.organization.id)
      )
    )

  if (!board) {
    return errorResponse("Board not found")
  }

  const [lastGroup] = await db
    .select({ order: groupTable.order })
    .from(groupTable)
    .where(eq(groupTable.organizationId, user.organization.id))
    .orderBy(desc(groupTable.order))
    .limit(1)

  const [newGroup] = await db
    .insert(groupTable)
    .values({
      ...group,
      organizationId: user.organization.id,
      order: (lastGroup?.order ?? 0) + 1,
    })
    .returning({
      id: groupTable.id,
      title: groupTable.title,
      order: groupTable.order,
      boardId: groupTable.boardId,
      organizationId: groupTable.organizationId,
      createdAt: groupTable.createdAt,
      updatedAt: groupTable.updatedAt,
    })

  if (!newGroup) {
    return errorResponse("Failed to create group")
  }

  return successResponse<Group>(
    "Group created",
    newGroup satisfies Group as Group
  )
}
