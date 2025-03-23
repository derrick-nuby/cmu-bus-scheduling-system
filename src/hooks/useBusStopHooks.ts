import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getBusStops, getBusStop, createBusStop, updateBusStop, deleteBusStop } from "@/services/busStopService"
import type { CreateBusStopRequest, UpdateBusStopRequest } from "@/types"

export const useGetBusStops = (routeId?: string) => {
  return useQuery({
    queryKey: ["busStops", { routeId }],
    queryFn: () => getBusStops(routeId),
  })
}

export const useGetBusStop = (id: string) => {
  return useQuery({
    queryKey: ["busStops", id],
    queryFn: () => getBusStop(id),
    enabled: !!id,
  })
}

export const useCreateBusStop = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBusStopRequest) => createBusStop(data),
    onSuccess: (data) => {
      toast.success("Bus stop created successfully")
      queryClient.invalidateQueries({ queryKey: ["busStops"] })
      queryClient.invalidateQueries({ queryKey: ["busStops", { routeId: data.routeId }] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create bus stop")
    },
  })
}

export const useUpdateBusStop = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBusStopRequest }) => updateBusStop(id, data),
    onSuccess: (_, variables) => {
      toast.success("Bus stop updated successfully")
      queryClient.invalidateQueries({ queryKey: ["busStops"] })
      queryClient.invalidateQueries({ queryKey: ["busStops", variables.id] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update bus stop")
    },
  })
}

export const useDeleteBusStop = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBusStop(id),
    onSuccess: () => {
      toast.success("Bus stop deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["busStops"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete bus stop")
    },
  })
}

