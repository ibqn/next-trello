import type { SigninSchema } from "database/src/validators/signin"
import { axios } from "./axios"
import type { ApiResponse, SuccessResponse } from "database/src/types"
import { queryOptions } from "@tanstack/react-query"
import type { User } from "database/src/drizzle/schema/auth"

export const postSignup = async (formData: SigninSchema) => {
  return axios.post<SuccessResponse<User>>("/auth/signup", formData)
}

export const postSignin = async (formData: SigninSchema) => {
  return axios.post<SuccessResponse<User>>("/auth/signin", formData)
}

export const getSignout = async () => {
  return axios.get("/auth/signout")
}

export const getUser = async (): Promise<User | null> => {
  try {
    const { data: response } = await axios.get<ApiResponse<User>>("/auth/user")
    if (!response.success) {
      return null
    }
    const { data: user } = response
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const userQueryOptions = () => queryOptions({ queryKey: ["user"] as const, queryFn: getUser })
