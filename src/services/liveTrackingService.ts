import axiosInstance from "@/lib/axiosConfig"
import { handleAxiosError } from "@/lib/errorHandler"
import type { BusLiveTracking, CreateLiveTrackingRequest } from "@/types"

export const getLiveTrackingRecords = async (busId?: string, routeId?: string): Promise<BusLiveTracking[]> => {
  try {
    const params: Record<string, string> = {}
    if (busId) params.busId = busId
    if (routeId) params.routeId = routeId

    const response = await axiosInstance.get<BusLiveTracking[]>("/live-tracking", { params })
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch live tracking records"))
  }
}

export const getLiveTrackingRecord = async (id: string): Promise<BusLiveTracking> => {
  try {
    const response = await axiosInstance.get<BusLiveTracking>(`/live-tracking/${id}`)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch live tracking record"))
  }
}

export const createLiveTrackingRecord = async (data: CreateLiveTrackingRequest): Promise<BusLiveTracking> => {
  try {
    const response = await axiosInstance.post<BusLiveTracking>("/live-tracking", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create live tracking record"))
  }
}

