import axiosInstance from "@/lib/axiosConfig"
import { handleAxiosError } from "@/lib/errorHandler"
import type { User, UpdateUserRequest, UpdateUserOrganizationRequest, UpdatePasswordRequest } from "@/types"

export const getUsers = async (organizationId?: string): Promise<User[]> => {
  try {
    const params = organizationId ? { organizationId } : {}
    const response = await axiosInstance.get<User[]>("/users", { params })
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch users"))
  }
}

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/users/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch user"))
  }
}

export const updateUser = async (id: string, data: UpdateUserRequest): Promise<User> => {
  try {
    const response = await axiosInstance.put<User>(`/users/${id}`, data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update user"))
  }
}

export const updateUserOrganization = async (id: string, data: UpdateUserOrganizationRequest): Promise<User> => {
  try {
    const response = await axiosInstance.put<User>(`/users/${id}/organization`, data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update user organization"))
  }
}

export const updatePassword = async (id: string, data: UpdatePasswordRequest): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.put<{ message: string }>(`/users/${id}/update-password`, data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update password"))
  }
}

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/users/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete user"))
  }
}

