import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getLiveTrackingRecords, getLiveTrackingRecord, createLiveTrackingRecord } from "@/services/liveTrackingService"
import type { CreateLiveTrackingRequest } from "@/types"

export const useGetLiveTrackingRecords = (busId?: string, routeId?: string) => {
  return useQuery({
    queryKey: ["liveTracking", { busId, routeId }],
    queryFn: () => getLiveTrackingRecords(busId, routeId),
  })
}

export const useGetLiveTrackingRecord = (id: string) => {
  return useQuery({
    queryKey: ["liveTracking", id],
    queryFn: () => getLiveTrackingRecord(id),
    enabled: !!id,
  })
}

export const useCreateLiveTrackingRecord = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLiveTrackingRequest) => createLiveTrackingRecord(data),
    onSuccess: (data) => {
      toast.success("Live tracking record created successfully")
      queryClient.invalidateQueries({ queryKey: ["liveTracking"] })
      queryClient.invalidateQueries({ queryKey: ["liveTracking", { busId: data.busId }] })
      queryClient.invalidateQueries({ queryKey: ["liveTracking", { routeId: data.routeId }] })

      // Also invalidate bus queries to update location
      queryClient.invalidateQueries({ queryKey: ["buses", data.busId] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create live tracking record")
    },
  })
}

