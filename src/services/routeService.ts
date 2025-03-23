import axiosInstance from "@/lib/axiosConfig"
import { handleAxiosError } from "@/lib/errorHandler"
import type { Route, CreateRouteRequest, UpdateRouteRequest } from "@/types"

export const getRoutes = async (organizationId?: string, code?: string): Promise<Route[]> => {
  try {
    const params: Record<string, string> = {}
    if (organizationId) params.organizationId = organizationId
    if (code) params.code = code

    const response = await axiosInstance.get<Route[]>("/routes", { params })
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch routes"))
  }
}

export const getRoute = async (id: string): Promise<Route> => {
  try {
    const response = await axiosInstance.get<Route>(`/routes/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch route"))
  }
}

export const createRoute = async (data: CreateRouteRequest): Promise<Route> => {
  try {
    const response = await axiosInstance.post<Route>("/routes", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create route"))
  }
}

export const updateRoute = async (id: string, data: UpdateRouteRequest): Promise<Route> => {
  try {
    const response = await axiosInstance.put<Route>(`/routes/${id}`, data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update route"))
  }
}

export const deleteRoute = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/routes/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete route"))
  }
}

