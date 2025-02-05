import type { GroupSchema } from "database/src/validators/group"
import { axios } from "./axios"
import type { Group } from "database/src/drizzle/schema/group"
// import type { ApiResponse } from "database/src/types"
// import { queryOptions } from "@tanstack/react-query"

export const postGroup = async (groupInput: GroupSchema): Promise<Group | null> => {
  const { data: response } = await axios.post("/group", groupInput)
  if (!response.success) {
    return null
  }

  const { data: group } = response
  return group
}

// export const getGroupList = async (): Promise<Group[] | null> => {
//   const { data: response } = await axios.get<ApiResponse<Group[]>>("/group")
//   if (!response.success) {
//     return null
//   }
//   const { data: groups } = response
//   return groups
// }

// export const groupListQueryOptions = () =>
//   queryOptions({
//     queryKey: ["group-list"] as const,
//     queryFn: getGroupList,
//   })
