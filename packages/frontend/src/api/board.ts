import type { Board } from "database/src/drizzle/schema/board"
import type { ApiResponse } from "database/src/types"
import type { BoardSchema } from "database/src/validators/board"
import { axios } from "./axios"
import { queryOptions } from "@tanstack/react-query"
import type { ParamIdSchema } from "database/src/validators/param"

export const postBoard = async (inputData: BoardSchema): Promise<Board | null> => {
  const { data: response } = await axios.post<ApiResponse<Board>>("/board", inputData)
  if (!response.success) {
    return null
  }
  const { data: board } = response
  return board
}

export const getBoardList = async (): Promise<Board[] | null> => {
  const { data: response } = await axios.get<ApiResponse<Board[]>>("/board")
  if (!response.success) {
    return null
  }
  const { data: boards } = response
  return boards
}

export const boardListQueryOptions = () =>
  queryOptions({
    queryKey: ["board-list"] as const,
    queryFn: getBoardList,
  })

export const getBoardById = async ({ id }: ParamIdSchema): Promise<Board | null> => {
  const { data: response } = await axios.get<ApiResponse<Board>>(`/board/${id}`)
  if (!response.success) {
    return null
  }
  const { data: board } = response
  return board
}

export const boardQueryOptions = (paramId: ParamIdSchema) =>
  queryOptions({
    queryKey: ["board", paramId.id] as const,
    queryFn: () => getBoardById(paramId),
  })

export const patchBoard = async ({ id, ...inputData }: ParamIdSchema & BoardSchema): Promise<Board | null> => {
  const { data: response } = await axios.patch<ApiResponse<Board>>(`/board/${id}`, inputData)
  if (!response.success) {
    return null
  }
  const { data: board } = response
  return board
}
