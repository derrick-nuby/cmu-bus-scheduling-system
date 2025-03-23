import axiosInstance from "@/lib/axiosConfig"
import { handleAxiosError } from "@/lib/errorHandler"
import type { Organization, CreateOrganizationRequest, UpdateOrganizationRequest } from "@/types"

export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await axiosInstance.get<Organization[]>("/organizations")
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch organizations"))
  }
}

export const getOrganization = async (id: string): Promise<Organization> => {
  try {
    const response = await axiosInstance.get<Organization>(`/organizations/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch organization"))
  }
}

export const createOrganization = async (data: CreateOrganizationRequest): Promise<Organization> => {
  try {
    const response = await axiosInstance.post<Organization>("/organizations", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create organization"))
  }
}

export const updateOrganization = async (id: string, data: UpdateOrganizationRequest): Promise<Organization> => {
  try {
    const response = await axiosInstance.put<Organization>(`/organizations/${id}`, data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update organization"))
  }
}

export const deleteOrganization = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/organizations/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete organization"))
  }
}

