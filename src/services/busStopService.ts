import axiosInstance from "@/lib/axiosConfig"
import { handleAxiosError } from "@/lib/errorHandler"
import type { BusStop, CreateBusStopRequest, UpdateBusStopRequest } from "@/types"

export const getBusStops = async (routeId?: string): Promise<BusStop[]> => {
  try {
    const params = routeId ? { routeId } : {}
    const response = await axiosInstance.get<BusStop[]>("/bus-stops", { params })
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch bus stops"))
  }
}

export const getBusStop = async (id: string): Promise<BusStop> => {
  try {
    const response = await axiosInstance.get<BusStop>(`/bus-stops/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch bus stop"))
  }
}

export const createBusStop = async (data: CreateBusStopRequest): Promise<BusStop> => {
  try {
    const response = await axiosInstance.post<BusStop>("/bus-stops", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create bus stop"))
  }
}

export const updateBusStop = async (id: string, data: UpdateBusStopRequest): Promise<BusStop> => {
  try {
    const response = await axiosInstance.put<BusStop>(`/bus-stops/${id}`, data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update bus stop"))
  }
}

export const deleteBusStop = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/bus-stops/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete bus stop"))
  }
}

