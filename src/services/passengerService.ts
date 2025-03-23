import axiosInstance from "@/lib/axiosConfig"
import { handleAxiosError } from "@/lib/errorHandler"
import type { Passenger, CreatePassengerRequest, UpdatePassengerRequest } from "@/types"

export const getPassengers = async (routeId?: string, busId?: string): Promise<Passenger[]> => {
  try {
    const params: Record<string, string> = {}
    if (routeId) params.routeId = routeId
    if (busId) params.busId = busId

    const response = await axiosInstance.get<Passenger[]>("/passengers", { params })
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch passengers"))
  }
}

export const getPassenger = async (id: string): Promise<Passenger> => {
  try {
    const response = await axiosInstance.get<Passenger>(`/passengers/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch passenger"))
  }
}

export const createPassenger = async (data: CreatePassengerRequest): Promise<Passenger> => {
  try {
    const response = await axiosInstance.post<Passenger>("/passengers", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create passenger"))
  }
}

export const updatePassenger = async (id: string, data: UpdatePassengerRequest): Promise<Passenger> => {
  try {
    const response = await axiosInstance.put<Passenger>(`/passengers/${id}`, data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update passenger"))
  }
}

export const deletePassenger = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/passengers/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete passenger"))
  }
}

