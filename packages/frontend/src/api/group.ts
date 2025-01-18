import { GroupSchema } from "database/src/validators/group"
import { axios } from "./axios"
import { Group } from "database/src/drizzle/schema/group"

export const postGroup = async (groupInput: GroupSchema): Promise<Group | null> => {
  const { data: response } = await axios.post("/group", groupInput)
  if (!response.success) {
    return null
  }

  const { data: group } = response
  return group
}
