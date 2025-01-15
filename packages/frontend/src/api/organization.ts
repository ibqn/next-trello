import { queryOptions } from "@tanstack/react-query"
import { axios } from "./axios"
import { Organization } from "database/src/drizzle/schema/organization"
import { SuccessResponse } from "database/src/types"
import { OrganizationSchema } from "database/src/validators/organization"

export const postOrganization = async (inputData: OrganizationSchema) => {
  return axios.post<SuccessResponse<Organization>>("/organization", inputData)
}

export const getOrganizations = async () => {
  try {
    const { data: response } = await axios.get<SuccessResponse<Organization[]>>("/organization")
    if (!response.success) {
      return []
    }
    const { data: organizations } = response
    return organizations
  } catch (error) {
    console.error(error)
    return []
  }
}

export const postSelectOrganization = async (organizationId: string): Promise<Organization | null> => {
  const { data: response } = await axios.post<SuccessResponse<Organization>>(`/organization/${organizationId}`)
  if (!response.success) {
    return null
  }
  const { data: organization } = response
  return organization
}

export const organizationListQueryOptions = () =>
  queryOptions({
    queryKey: ["organizations"] as const,
    queryFn: getOrganizations,
  })
