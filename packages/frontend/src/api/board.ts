import type { Board } from "database/src/drizzle/schema/board"
import type { ApiResponse } from "database/src/types"
import type { BoardSchema } from "database/src/validators/board"
import { axios } from "./axios"

export const postBoard = async (inputData: BoardSchema): Promise<Board | null> => {
  const { data: response } = await axios.post<ApiResponse<Board>>("/board", inputData)
  if (!response.success) {
    return null
  }
  const { data: board } = response
  return board
}
