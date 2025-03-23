import axiosInstance from "@/lib/axiosConfig"
import { handleAxiosError } from "@/lib/errorHandler"
import type { Bus, CreateBusRequest, UpdateBusRequest } from "@/types"

export const getBuses = async (routeId?: string): Promise<Bus[]> => {
  try {
    const params = routeId ? { routeId } : {}
    const response = await axiosInstance.get<Bus[]>("/buses", { params })
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch buses"))
  }
}

export const getBus = async (id: string): Promise<Bus> => {
  try {
    const response = await axiosInstance.get<Bus>(`/buses/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch bus"))
  }
}

export const createBus = async (data: CreateBusRequest): Promise<Bus> => {
  try {
    const response = await axiosInstance.post<Bus>("/buses", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create bus"))
  }
}

export const updateBus = async (id: string, data: UpdateBusRequest): Promise<Bus> => {
  try {
    const response = await axiosInstance.put<Bus>(`/buses/${id}`, data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update bus"))
  }
}

export const deleteBus = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/buses/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete bus"))
  }
}

