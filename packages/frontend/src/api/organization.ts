import { axios } from "./axios"
import { Organization } from "database/src/drizzle/schema/organization"
import { SuccessResponse } from "database/src/types"
import { OrganizationSchema } from "database/src/validators/organization"

export const postOrganization = async (inputData: OrganizationSchema) => {
  return axios.post<SuccessResponse<Organization>>("/organization", inputData)
}
